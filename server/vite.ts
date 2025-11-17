import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { type Server } from "http";

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  // Dynamically import vite and related dependencies only in development
  const { createServer: createViteServer, createLogger } = await import("vite");
  const { default: viteConfig } = await import("../vite.config.js");
  const { nanoid } = await import("nanoid");

  const viteLogger = createLogger();

  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const currentDir = path.dirname(fileURLToPath(import.meta.url));
      const clientTemplate = path.resolve(
        currentDir,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  // In Docker/Cloud Run: working dir is /app, we run "node dist/index.js"
  // So dist/public is at /app/dist/public
  // When running locally from project root: dist/public

  // Strategy: Try multiple paths to find the public directory
  let distPath: string | undefined;

  // Path 1: Relative to the script location (works when bundled)
  try {
    const scriptDir = path.dirname(fileURLToPath(import.meta.url));
    const candidatePath = path.resolve(scriptDir, "public");
    if (fs.existsSync(candidatePath)) {
      distPath = candidatePath;
    }
  } catch (e) {
    // import.meta.url might fail in some environments
  }

  // Path 2: Relative to cwd (works in Docker when running from /app)
  if (!distPath) {
    const candidatePath = path.resolve(process.cwd(), "dist", "public");
    if (fs.existsSync(candidatePath)) {
      distPath = candidatePath;
    }
  }

  // Path 3: Direct path assuming we're already in dist directory
  if (!distPath) {
    const candidatePath = path.resolve(process.cwd(), "public");
    if (fs.existsSync(candidatePath)) {
      distPath = candidatePath;
    }
  }

  if (!distPath) {
    throw new Error(
      `Could not find the build directory. Tried:\n` +
      `  - ${path.resolve(process.cwd(), "dist", "public")}\n` +
      `  - ${path.resolve(process.cwd(), "public")}\n` +
      `Make sure to build the client first with 'npm run build'`,
    );
  }

  console.log(`[serveStatic] Serving static files from: ${distPath}`);

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath!, "index.html"));
  });
}
