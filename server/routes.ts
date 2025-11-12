import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertBlogPostSchema, insertProjectSchema, insertAiAgentSchema } from "@shared/schema";
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

  // Auto-seed admin user in development if it doesn't exist
  if (process.env.NODE_ENV !== "production") {
    const existingAdmin = await storage.getUserByUsername("admin");
    if (!existingAdmin) {
      try {
        const hashedPassword = await bcrypt.hash("admin123", 10);
        await storage.createUser({
          username: "admin",
          email: "admin@dawntoweb.com",
          password: hashedPassword,
        });
        console.log("✅ Auto-seeded admin user (username: admin, password: admin123)");
      } catch (error) {
        console.error("Failed to auto-seed admin user:", error);
      }
    }
  }

  // ========== PUBLIC API ROUTES ==========

  // Get published blog posts (public endpoint)
  app.get("/api/blog-posts", async (req, res) => {
    try {
      const posts = await storage.getAllBlogPosts(false); // Only published
      res.json(posts);
    } catch (error) {
      console.error("Get public blog posts error:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  // Get single published blog post by slug (public endpoint)
  app.get("/api/blog-posts/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const allPosts = await storage.getAllBlogPosts(false);
      const post = allPosts.find(p => p.slug === slug);

      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }

      res.json(post);
    } catch (error) {
      console.error("Get public blog post error:", error);
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

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

  // Development only: Seed database endpoint
  if (process.env.NODE_ENV !== "production") {
    app.post("/api/admin/seed", async (req, res) => {
      try {
        const hashedPassword = await bcrypt.hash("admin123", 10);
        const adminUser = await storage.createUser({
          username: "admin",
          email: "admin@dawntoweb.com",
          password: hashedPassword,
        });
        res.json({
          success: true,
          message: "Admin user created",
          user: { username: adminUser.username, email: adminUser.email }
        });
      } catch (error: any) {
        res.status(500).json({ message: error.message || "Seed failed" });
      }
    });

    // Seed projects and AI agents
    app.post("/api/admin/seed-content", async (req, res) => {
      try {
        // Check if content already exists
        const existingProjects = await storage.getAllProjects(true);
        const existingAgents = await storage.getAllAiAgents(true);

        if (existingProjects.length > 0 || existingAgents.length > 0) {
          return res.status(400).json({
            success: false,
            message: "Content already exists. Please delete existing content first.",
            counts: {
              projects: existingProjects.length,
              aiAgents: existingAgents.length,
            }
          });
        }

        // Seed Projects
        const projects = [
          {
            title: "Client Website #1",
            category: "Web Development",
            description: "Modern business website with responsive design and contact forms",
            image: "/assets/generated_images/E-commerce_website_portfolio_project_d8f0875a.png",
            link: "https://example-client1.com",
            technologies: "React, Tailwind CSS, Node.js",
            order: 1,
            featured: false,
            active: true,
          },
          {
            title: "Client Website #2",
            category: "Web Development",
            description: "Portfolio website with beautiful UI and smooth animations",
            image: "/assets/generated_images/Fitness_app_portfolio_project_0616a1ef.png",
            link: "https://example-client2.com",
            technologies: "React, TypeScript, Framer Motion",
            order: 2,
            featured: false,
            active: true,
          },
          {
            title: "Demo: E-Commerce Store",
            category: "E-commerce",
            description: "Full-featured online store with shopping cart and checkout",
            image: "/assets/generated_images/Restaurant_website_portfolio_project_4665e491.png",
            link: "#",
            technologies: "React, Stripe, Database",
            order: 3,
            featured: true,
            active: true,
          },
          {
            title: "Demo: Restaurant Website",
            category: "Web Development",
            description: "Beautiful restaurant site with menu and reservation system",
            image: "/assets/generated_images/Branding_identity_portfolio_project_35974cef.png",
            link: "#",
            technologies: "React, Tailwind, Booking System",
            order: 4,
            featured: false,
            active: true,
          },
          {
            title: "Demo: Agency Portfolio",
            category: "Digital Marketing",
            description: "Creative agency portfolio with stunning animations",
            image: "/assets/generated_images/Social_media_campaign_project_e5ab0dff.png",
            link: "#",
            technologies: "React, GSAP, Parallax Effects",
            order: 5,
            featured: false,
            active: true,
          },
          {
            title: "Demo: SaaS Landing Page",
            category: "Web Development",
            description: "Modern SaaS landing page optimized for conversions",
            image: "/assets/generated_images/SEO_analytics_portfolio_project_3b0b2d4b.png",
            link: "#",
            technologies: "React, Analytics, CRM Integration",
            order: 6,
            featured: false,
            active: true,
          },
        ];

        for (const project of projects) {
          await storage.insertProject(project);
        }

        // Seed AI Agents
        const aiAgents = [
          {
            name: "Customer Support AI Agent",
            description: "24/7 automated customer service chatbot that handles FAQs, support tickets, and customer inquiries",
            icon: "💬",
            features: ["Multi-language support", "CRM integration", "Smart ticket routing"],
            price: "$299",
            priceType: "monthly",
            category: "Customer Service",
            capabilities: "Handles customer inquiries, support tickets, and FAQs with natural language processing",
            integrations: ["Slack", "Email", "Website", "CRM"],
            order: 1,
            featured: true,
            active: true,
          },
          {
            name: "Email Marketing AI",
            description: "Automated email campaigns with AI-powered personalization and optimization",
            icon: "📧",
            features: ["Smart segmentation", "A/B testing", "Performance analytics"],
            price: "$199",
            priceType: "monthly",
            category: "Marketing",
            capabilities: "Creates and optimizes email campaigns with AI-powered personalization",
            integrations: ["Mailchimp", "SendGrid", "HubSpot"],
            order: 2,
            featured: false,
            active: true,
          },
          {
            name: "Appointment Booking Agent",
            description: "Smart scheduling assistant that handles bookings, reminders, and calendar management",
            icon: "📅",
            features: ["Calendar sync", "SMS reminders", "No-show reduction"],
            price: "$149",
            priceType: "monthly",
            category: "Operations",
            capabilities: "Automated appointment scheduling with calendar sync and reminders",
            integrations: ["Google Calendar", "Outlook", "SMS"],
            order: 3,
            featured: false,
            active: true,
          },
          {
            name: "Lead Generation AI",
            description: "Automatically find and qualify leads through intelligent web scraping and analysis",
            icon: "🔍",
            features: ["Lead scoring", "Email finder", "CRM export"],
            price: "$249",
            priceType: "monthly",
            category: "Sales",
            capabilities: "Finds and qualifies leads automatically through web scraping and analysis",
            integrations: ["Salesforce", "HubSpot", "LinkedIn"],
            order: 4,
            featured: false,
            active: true,
          },
          {
            name: "Social Media Manager AI",
            description: "Automate your social media posting, engagement, and analytics across platforms",
            icon: "📈",
            features: ["Auto-posting", "Engagement tracking", "Content suggestions"],
            price: "$179",
            priceType: "monthly",
            category: "Marketing",
            capabilities: "Automates social media posting, engagement tracking, and content creation",
            integrations: ["Facebook", "Twitter", "Instagram", "LinkedIn"],
            order: 5,
            featured: true,
            active: true,
          },
          {
            name: "Custom AI Agent",
            description: "Need something specific? We build custom AI agents tailored to your business needs",
            icon: "🤖",
            features: ["Fully customized", "Your workflows", "Dedicated support"],
            price: "Custom",
            priceType: "custom",
            category: "Custom",
            capabilities: "Fully custom AI agent built specifically for your business requirements",
            integrations: ["Custom integration with your systems"],
            order: 6,
            featured: false,
            active: true,
          },
        ];

        for (const agent of aiAgents) {
          await storage.insertAiAgent(agent);
        }

        res.json({
          success: true,
          message: "Content seeded successfully",
          counts: {
            projects: projects.length,
            aiAgents: aiAgents.length,
          }
        });
      } catch (error: any) {
        console.error("Seed content error:", error);
        res.status(500).json({ message: error.message || "Seed failed" });
      }
    });
  }

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

  // ========== PROJECT ROUTES ==========

  // Get all projects (public can see active, admin can see all)
  app.get("/api/projects", async (req, res) => {
    try {
      const isAdmin = req.session && (req.session as any).userId;
      const projects = await storage.getAllProjects(isAdmin);
      res.json(projects);
    } catch (error) {
      console.error("Get projects error:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  // Get single project
  app.get("/api/projects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      console.error("Get project error:", error);
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  // Create project (admin only)
  app.post("/api/projects", requireAuth, async (req, res) => {
    try {
      const projectData = insertProjectSchema.parse(req.body);
      const project = await storage.insertProject(projectData);
      res.json(project);
    } catch (error: any) {
      console.error("Create project error:", error);
      res.status(400).json({ message: error.message || "Failed to create project" });
    }
  });

  // Update project (admin only)
  app.put("/api/projects/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedProject = await storage.updateProject(id, updates);
      res.json(updatedProject);
    } catch (error) {
      console.error("Update project error:", error);
      res.status(500).json({ message: "Failed to update project" });
    }
  });

  // Delete project (admin only)
  app.delete("/api/projects/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteProject(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Delete project error:", error);
      res.status(500).json({ message: "Failed to delete project" });
    }
  });

  // ========== AI AGENT ROUTES ==========

  // Get all AI agents (public can see active, admin can see all)
  app.get("/api/ai-agents", async (req, res) => {
    try {
      const isAdmin = req.session && (req.session as any).userId;
      const agents = await storage.getAllAiAgents(isAdmin);
      res.json(agents);
    } catch (error) {
      console.error("Get AI agents error:", error);
      res.status(500).json({ message: "Failed to fetch AI agents" });
    }
  });

  // Get single AI agent
  app.get("/api/ai-agents/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const agent = await storage.getAiAgent(id);
      if (!agent) {
        return res.status(404).json({ message: "AI agent not found" });
      }
      res.json(agent);
    } catch (error) {
      console.error("Get AI agent error:", error);
      res.status(500).json({ message: "Failed to fetch AI agent" });
    }
  });

  // Create AI agent (admin only)
  app.post("/api/ai-agents", requireAuth, async (req, res) => {
    try {
      const agentData = insertAiAgentSchema.parse(req.body);
      const agent = await storage.insertAiAgent(agentData);
      res.json(agent);
    } catch (error: any) {
      console.error("Create AI agent error:", error);
      res.status(400).json({ message: error.message || "Failed to create AI agent" });
    }
  });

  // Update AI agent (admin only)
  app.put("/api/ai-agents/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedAgent = await storage.updateAiAgent(id, updates);
      res.json(updatedAgent);
    } catch (error) {
      console.error("Update AI agent error:", error);
      res.status(500).json({ message: "Failed to update AI agent" });
    }
  });

  // Delete AI agent (admin only)
  app.delete("/api/ai-agents/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteAiAgent(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Delete AI agent error:", error);
      res.status(500).json({ message: "Failed to delete AI agent" });
    }
  });

  // ========== SITE SETTINGS ROUTES ==========

  // Get a specific setting (public)
  app.get("/api/settings/:key", async (req, res) => {
    try {
      const { key } = req.params;
      const value = await storage.getSetting(key);
      if (value === undefined) {
        return res.status(404).json({ message: "Setting not found" });
      }
      res.json({ key, value });
    } catch (error) {
      console.error("Get setting error:", error);
      res.status(500).json({ message: "Failed to fetch setting" });
    }
  });

  // Get all settings (public)
  app.get("/api/settings", async (req, res) => {
    try {
      const settings = await storage.getAllSettings();
      // Convert array to object for easier frontend consumption
      const settingsObj = settings.reduce((acc, setting) => {
        acc[setting.key] = setting.value;
        return acc;
      }, {} as Record<string, any>);
      res.json(settingsObj);
    } catch (error) {
      console.error("Get all settings error:", error);
      res.status(500).json({ message: "Failed to fetch settings" });
    }
  });

  // Update a setting (admin only)
  app.put("/api/settings/:key", requireAuth, async (req, res) => {
    try {
      const { key } = req.params;
      const { value } = req.body;
      const setting = await storage.setSetting(key, value);
      res.json(setting);
    } catch (error) {
      console.error("Update setting error:", error);
      res.status(500).json({ message: "Failed to update setting" });
    }
  });

  // Batch update settings (admin only)
  app.post("/api/settings", requireAuth, async (req, res) => {
    try {
      const settings = req.body;
      const updated = [];
      for (const [key, value] of Object.entries(settings)) {
        const setting = await storage.setSetting(key, value);
        updated.push(setting);
      }
      res.json({ success: true, updated: updated.length });
    } catch (error) {
      console.error("Batch update settings error:", error);
      res.status(500).json({ message: "Failed to update settings" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
