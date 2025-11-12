import { type User, type InsertUser, type Lead, type BlogPost, type InsertBlogPost, type Project, type InsertProject, type AiAgent, type InsertAiAgent, type SiteSetting } from "@shared/schema";
import { randomUUID } from "crypto";

// Storage interface with CRUD methods
export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Lead methods
  getAllLeads(): Promise<Lead[]>;
  getLead(id: string): Promise<Lead | undefined>;
  insertLead(lead: any): Promise<Lead>;
  updateLead(id: string, updates: Partial<Lead>): Promise<Lead>;
  deleteLead(id: string): Promise<void>;

  // Blog post methods
  getAllBlogPosts(includeUnpublished?: boolean): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  insertBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: string): Promise<void>;

  // Project methods
  getAllProjects(includeInactive?: boolean): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  insertProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, updates: Partial<Project>): Promise<Project>;
  deleteProject(id: string): Promise<void>;

  // AI Agent methods
  getAllAiAgents(includeInactive?: boolean): Promise<AiAgent[]>;
  getAiAgent(id: string): Promise<AiAgent | undefined>;
  insertAiAgent(agent: InsertAiAgent): Promise<AiAgent>;
  updateAiAgent(id: string, updates: Partial<AiAgent>): Promise<AiAgent>;
  deleteAiAgent(id: string): Promise<void>;

  // Site Settings methods
  getSetting(key: string): Promise<any | undefined>;
  setSetting(key: string, value: any): Promise<SiteSetting>;
  getAllSettings(): Promise<SiteSetting[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private leads: Map<string, Lead>;
  private blogPosts: Map<string, BlogPost>;
  private projects: Map<string, Project>;
  private aiAgents: Map<string, AiAgent>;
  private siteSettings: Map<string, SiteSetting>;

  constructor() {
    this.users = new Map();
    this.leads = new Map();
    this.blogPosts = new Map();
    this.projects = new Map();
    this.aiAgents = new Map();
    this.siteSettings = new Map();
  }

  // ========== USER METHODS ==========

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      ...insertUser,
      id,
      role: "admin",
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  // ========== LEAD METHODS ==========

  async getAllLeads(): Promise<Lead[]> {
    return Array.from(this.leads.values()).sort((a, b) => {
      return new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime();
    });
  }

  async getLead(id: string): Promise<Lead | undefined> {
    return this.leads.get(id);
  }

  async insertLead(leadData: any): Promise<Lead> {
    const id = randomUUID();
    const lead: Lead = {
      id,
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone || null,
      company: leadData.company || null,
      message: leadData.message,
      source: leadData.source || "contact_form",
      status: "new",
      priority: "medium",
      notes: null,
      assignedTo: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.leads.set(id, lead);
    return lead;
  }

  async updateLead(id: string, updates: Partial<Lead>): Promise<Lead> {
    const lead = this.leads.get(id);
    if (!lead) {
      throw new Error("Lead not found");
    }

    const updatedLead: Lead = {
      ...lead,
      ...updates,
      updatedAt: new Date(),
    };

    this.leads.set(id, updatedLead);
    return updatedLead;
  }

  async deleteLead(id: string): Promise<void> {
    this.leads.delete(id);
  }

  // ========== BLOG POST METHODS ==========

  async getAllBlogPosts(includeUnpublished: boolean = false): Promise<BlogPost[]> {
    let posts = Array.from(this.blogPosts.values());

    if (!includeUnpublished) {
      posts = posts.filter(post => post.status === "published");
    }

    return posts.sort((a, b) => {
      return new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime();
    });
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async insertBlogPost(postData: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const now = new Date();

    const post: BlogPost = {
      id,
      title: postData.title,
      slug: postData.slug,
      excerpt: postData.excerpt || null,
      content: postData.content,
      featuredImage: postData.featuredImage || null,
      category: postData.category || null,
      tags: postData.tags || [],
      status: postData.status || "draft",
      authorId: postData.authorId,
      metaTitle: postData.metaTitle || null,
      metaDescription: postData.metaDescription || null,
      publishedAt: postData.status === "published" ? now : null,
      createdAt: now,
      updatedAt: now,
    };

    this.blogPosts.set(id, post);
    return post;
  }

  async updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost> {
    const post = this.blogPosts.get(id);
    if (!post) {
      throw new Error("Blog post not found");
    }

    const updatedPost: BlogPost = {
      ...post,
      ...updates,
      updatedAt: new Date(),
    };

    // If status changed to published and no publishedAt date, set it now
    if (updates.status === "published" && !post.publishedAt) {
      updatedPost.publishedAt = new Date();
    }

    this.blogPosts.set(id, updatedPost);
    return updatedPost;
  }

  async deleteBlogPost(id: string): Promise<void> {
    this.blogPosts.delete(id);
  }

  // ========== PROJECT METHODS ==========

  async getAllProjects(includeInactive: boolean = true): Promise<Project[]> {
    let projects = Array.from(this.projects.values());

    if (!includeInactive) {
      projects = projects.filter(project => project.active);
    }

    return projects.sort((a, b) => a.order - b.order);
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async insertProject(projectData: InsertProject): Promise<Project> {
    const id = randomUUID();
    const now = new Date();

    const project: Project = {
      id,
      title: projectData.title,
      description: projectData.description,
      category: projectData.category,
      image: projectData.image,
      link: projectData.link || null,
      technologies: projectData.technologies || null,
      order: projectData.order || 0,
      featured: projectData.featured || false,
      active: projectData.active !== undefined ? projectData.active : true,
      createdAt: now,
      updatedAt: now,
    };

    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    const project = this.projects.get(id);
    if (!project) {
      throw new Error("Project not found");
    }

    const updatedProject: Project = {
      ...project,
      ...updates,
      updatedAt: new Date(),
    };

    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: string): Promise<void> {
    this.projects.delete(id);
  }

  // ========== AI AGENT METHODS ==========

  async getAllAiAgents(includeInactive: boolean = true): Promise<AiAgent[]> {
    let agents = Array.from(this.aiAgents.values());

    if (!includeInactive) {
      agents = agents.filter(agent => agent.active);
    }

    return agents.sort((a, b) => a.order - b.order);
  }

  async getAiAgent(id: string): Promise<AiAgent | undefined> {
    return this.aiAgents.get(id);
  }

  async insertAiAgent(agentData: InsertAiAgent): Promise<AiAgent> {
    const id = randomUUID();
    const now = new Date();

    const agent: AiAgent = {
      id,
      name: agentData.name,
      description: agentData.description,
      icon: agentData.icon,
      features: agentData.features || [],
      price: agentData.price,
      priceType: agentData.priceType || "monthly",
      category: agentData.category,
      capabilities: agentData.capabilities || null,
      integrations: agentData.integrations || [],
      order: agentData.order || 0,
      featured: agentData.featured || false,
      active: agentData.active !== undefined ? agentData.active : true,
      createdAt: now,
      updatedAt: now,
    };

    this.aiAgents.set(id, agent);
    return agent;
  }

  async updateAiAgent(id: string, updates: Partial<AiAgent>): Promise<AiAgent> {
    const agent = this.aiAgents.get(id);
    if (!agent) {
      throw new Error("AI Agent not found");
    }

    const updatedAgent: AiAgent = {
      ...agent,
      ...updates,
      updatedAt: new Date(),
    };

    this.aiAgents.set(id, updatedAgent);
    return updatedAgent;
  }

  async deleteAiAgent(id: string): Promise<void> {
    this.aiAgents.delete(id);
  }

  // ========== SITE SETTINGS METHODS ==========

  async getSetting(key: string): Promise<any | undefined> {
    const setting = this.siteSettings.get(key);
    return setting ? setting.value : undefined;
  }

  async setSetting(key: string, value: any): Promise<SiteSetting> {
    const existing = this.siteSettings.get(key);
    const now = new Date();

    const setting: SiteSetting = {
      id: existing?.id || randomUUID(),
      key,
      value,
      updatedAt: now,
    };

    this.siteSettings.set(key, setting);
    return setting;
  }

  async getAllSettings(): Promise<SiteSetting[]> {
    return Array.from(this.siteSettings.values());
  }
}

export const storage = new MemStorage();
