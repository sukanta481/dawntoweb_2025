import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertBlogPostSchema } from "@shared/schema";
import * as bcrypt from "bcryptjs";

// Middleware to check if user is authenticated
function requireAuth(req: Request, res: Response, next: Function) {
  if (req.session && (req.session as any).userId) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}

export async function registerRoutes(app: Express): Promise<Server> {

  // ========== PUBLIC API ROUTES ==========

  // Contact form submission (saves lead to database)
  app.post("/api/contact", async (req, res) => {
    try {
      const leadData = insertLeadSchema.parse(req.body);
      const lead = await storage.insertLead(leadData);
      res.json({ success: true, message: "Thank you for your message! We'll get back to you soon." });
    } catch (error: any) {
      console.error("Contact form error:", error);
      res.status(400).json({ message: error.message || "Failed to submit form" });
    }
  });

  // ========== ADMIN AUTH ROUTES ==========

  // Admin login
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
      }

      const user = await storage.getUserByUsername(username);

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Set session
      (req.session as any).userId = user.id;
      (req.session as any).username = user.username;

      res.json({
        success: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      });
    } catch (error: any) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Admin logout
  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ success: true });
    });
  });

  // ========== PROTECTED ADMIN ROUTES ==========

  // Get dashboard stats
  app.get("/api/admin/stats", requireAuth, async (req, res) => {
    try {
      const leads = await storage.getAllLeads();

      const stats = {
        totalLeads: leads.length,
        newLeads: leads.filter(l => l.status === "new").length,
        contactedLeads: leads.filter(l => l.status === "contacted").length,
        convertedLeads: leads.filter(l => l.status === "converted").length,
      };

      res.json(stats);
    } catch (error) {
      console.error("Stats error:", error);
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  // Get all leads
  app.get("/api/admin/leads", requireAuth, async (req, res) => {
    try {
      const leads = await storage.getAllLeads();
      res.json(leads);
    } catch (error) {
      console.error("Get leads error:", error);
      res.status(500).json({ message: "Failed to fetch leads" });
    }
  });

  // Update lead
  app.patch("/api/admin/leads/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      const updatedLead = await storage.updateLead(id, updates);
      res.json(updatedLead);
    } catch (error) {
      console.error("Update lead error:", error);
      res.status(500).json({ message: "Failed to update lead" });
    }
  });

  // Delete lead
  app.delete("/api/admin/leads/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteLead(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Delete lead error:", error);
      res.status(500).json({ message: "Failed to delete lead" });
    }
  });

  // ========== BLOG POST ROUTES ==========

  // Get all blog posts (admin can see unpublished)
  app.get("/api/admin/blog-posts", requireAuth, async (req, res) => {
    try {
      const posts = await storage.getAllBlogPosts(true); // Include unpublished
      res.json(posts);
    } catch (error) {
      console.error("Get blog posts error:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  // Get single blog post
  app.get("/api/admin/blog-posts/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const post = await storage.getBlogPost(id);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Get blog post error:", error);
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  // Create blog post
  app.post("/api/admin/blog-posts", requireAuth, async (req, res) => {
    try {
      const userId = (req.session as any).userId;
      const postData = insertBlogPostSchema.parse({
        ...req.body,
        authorId: userId,
      });

      const post = await storage.insertBlogPost(postData);
      res.json(post);
    } catch (error: any) {
      console.error("Create blog post error:", error);
      res.status(400).json({ message: error.message || "Failed to create blog post" });
    }
  });

  // Update blog post
  app.patch("/api/admin/blog-posts/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      const updatedPost = await storage.updateBlogPost(id, updates);
      res.json(updatedPost);
    } catch (error) {
      console.error("Update blog post error:", error);
      res.status(500).json({ message: "Failed to update blog post" });
    }
  });

  // Delete blog post
  app.delete("/api/admin/blog-posts/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteBlogPost(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Delete blog post error:", error);
      res.status(500).json({ message: "Failed to delete blog post" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
