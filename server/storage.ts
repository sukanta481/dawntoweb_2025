import { type User, type InsertUser, type Lead, type BlogPost, type InsertBlogPost } from "@shared/schema";
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
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private leads: Map<string, Lead>;
  private blogPosts: Map<string, BlogPost>;

  constructor() {
    this.users = new Map();
    this.leads = new Map();
    this.blogPosts = new Map();
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
}

export const storage = new MemStorage();
