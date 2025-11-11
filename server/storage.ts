import { type User, type InsertUser, type Lead, insertLeadSchema } from "@shared/schema";
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
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private leads: Map<string, Lead>;

  constructor() {
    this.users = new Map();
    this.leads = new Map();
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
}

export const storage = new MemStorage();
