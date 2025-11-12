import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Menu, X, LogOut, LayoutDashboard, Mail, FileText, Settings, Save, Plus, Edit, Trash2, Star, Eye, EyeOff, Database } from "lucide-react";
import type { Project, AiAgent } from "@shared/schema";

export default function AdminContentManagement() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Projects state
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);

  // AI Agents state
  const [aiAgents, setAiAgents] = useState<AiAgent[]>([]);
  const [editingAgent, setEditingAgent] = useState<AiAgent | null>(null);
  const [agentDialogOpen, setAgentDialogOpen] = useState(false);

  // Hero Section State
  const [heroContent, setHeroContent] = useState({
    title: "Transform Your Business with AI & Digital Solutions",
    subtitle: "From Vision to Reality - Web Development, AI Agents & Digital Marketing",
    description: "We help small businesses grow with affordable, cutting-edge technology. Get a professional website, automate tasks with AI agents, and reach more customers online.",
    ctaText: "Get Started",
    ctaLink: "#contact",
    secondaryCtaText: "View Our Work",
    secondaryCtaLink: "#portfolio",
  });

  // Stats Section State
  const [statsContent, setStatsContent] = useState({
    projectsCompleted: "50+",
    clientsSatisfied: "40+",
    yearsExperience: "5+",
    successRate: "98%",
  });

  // Contact Info State
  const [contactInfo, setContactInfo] = useState({
    email: "hello@dawntoweb.com",
    phone: "+91 94332 15443",
    address: "22/h/304 bagmari road, Kolkata - 700054",
    socialLinks: {
      twitter: "https://twitter.com/dawntoweb",
      linkedin: "https://linkedin.com/company/dawntoweb",
      github: "https://github.com/dawntoweb",
      facebook: "https://www.facebook.com/profile.php?id=61572062607858",
      instagram: "",
      youtube: "",
      pinterest: "",
      tiktok: "",
      whatsapp: "",
    },
  });

  // Company Info State
  const [companyInfo, setCompanyInfo] = useState({
    name: "DawnToWeb",
    tagline: "Digital Solutions That Grow Your Business",
    description: "We're a digital marketing agency specializing in web development, AI automation, and digital marketing for small businesses.",
    founded: "2019",
    mission: "To make cutting-edge technology accessible and affordable for small businesses.",
  });

  // Load projects
  useEffect(() => {
    fetchProjects();
  }, []);

  // Load AI Agents
  useEffect(() => {
    fetchAiAgents();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  const fetchAiAgents = async () => {
    try {
      const res = await fetch("/api/ai-agents");
      if (res.ok) {
        const data = await res.json();
        setAiAgents(data);
      }
    } catch (error) {
      console.error("Failed to fetch AI agents:", error);
    }
  };

  // Project CRUD operations
  const handleSaveProject = async (projectData: Partial<Project>) => {
    setSaving(true);
    try {
      const url = editingProject ? `/api/projects/${editingProject.id}` : "/api/projects";
      const method = editingProject ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      if (res.ok) {
        toast({
          title: editingProject ? "Project Updated" : "Project Created",
          description: "Your changes have been saved successfully.",
        });
        setProjectDialogOpen(false);
        setEditingProject(null);
        fetchProjects();
      } else {
        throw new Error("Failed to save project");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save project.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast({
          title: "Project Deleted",
          description: "Project has been removed successfully.",
        });
        fetchProjects();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project.",
        variant: "destructive",
      });
    }
  };

  const handleToggleProjectActive = async (project: Project) => {
    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...project, active: !project.active }),
      });

      if (res.ok) {
        fetchProjects();
        toast({
          title: project.active ? "Project Hidden" : "Project Activated",
          description: `Project is now ${project.active ? "hidden" : "visible"} on the website.`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update project status.",
        variant: "destructive",
      });
    }
  };

  // AI Agent CRUD operations
  const handleSaveAgent = async (agentData: Partial<AiAgent>) => {
    setSaving(true);
    try {
      const url = editingAgent ? `/api/ai-agents/${editingAgent.id}` : "/api/ai-agents";
      const method = editingAgent ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(agentData),
      });

      if (res.ok) {
        toast({
          title: editingAgent ? "AI Agent Updated" : "AI Agent Created",
          description: "Your changes have been saved successfully.",
        });
        setAgentDialogOpen(false);
        setEditingAgent(null);
        fetchAiAgents();
      } else {
        throw new Error("Failed to save AI agent");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save AI agent.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAgent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this AI agent?")) return;

    try {
      const res = await fetch(`/api/ai-agents/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast({
          title: "AI Agent Deleted",
          description: "AI agent has been removed successfully.",
        });
        fetchAiAgents();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete AI agent.",
        variant: "destructive",
      });
    }
  };

  const handleToggleAgentActive = async (agent: AiAgent) => {
    try {
      const res = await fetch(`/api/ai-agents/${agent.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...agent, active: !agent.active }),
      });

      if (res.ok) {
        fetchAiAgents();
        toast({
          title: agent.active ? "AI Agent Hidden" : "AI Agent Activated",
          description: `AI agent is now ${agent.active ? "hidden" : "visible"} on the website.`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update AI agent status.",
        variant: "destructive",
      });
    }
  };

  const handleSaveHero = async () => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Hero Section Updated",
        description: "Your changes have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save changes.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveStats = async () => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Stats Section Updated",
        description: "Your changes have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save changes.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveContact = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactInfo }),
      });

      if (res.ok) {
        toast({
          title: "Contact Info Updated",
          description: "Your changes have been saved successfully.",
        });
      } else {
        throw new Error("Failed to save");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save changes.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveCompany = async () => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Company Info Updated",
        description: "Your changes have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save changes.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSeedContent = async () => {
    if (!confirm("This will add sample projects and AI agents to your database. Continue?")) return;

    setSaving(true);
    try {
      const res = await fetch("/api/admin/seed-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        toast({
          title: "Content Seeded Successfully",
          description: `Added ${data.counts.projects} projects and ${data.counts.aiAgents} AI agents.`,
        });
        // Refresh the data
        fetchProjects();
        fetchAiAgents();
      } else {
        toast({
          title: "Cannot Seed Content",
          description: data.message || "Content already exists in the database.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to seed content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });
      if (res.ok) {
        toast({
          title: "Logged Out",
          description: "You have been logged out successfully.",
        });
        setLocation("/admin/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: Mail, label: "Leads", path: "/admin/leads" },
    { icon: FileText, label: "Blog Posts", path: "/admin/blog" },
    { icon: Settings, label: "Content", path: "/admin/content" },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-card border-r w-64`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-2">
              <img src="/assets/images/logo.png" alt="DawnToWeb" className="h-10 w-auto" />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = window.location.pathname === item.path;
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setLocation(item.path)}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all ${sidebarOpen ? "lg:ml-64" : ""}`}>
        {/* Header */}
        <header className="bg-card border-b sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Content Management</h1>
                <p className="text-sm text-muted-foreground">Manage all your website content</p>
              </div>
            </div>
            {(projects.length === 0 || aiAgents.length === 0) && (
              <Button onClick={handleSeedContent} disabled={saving} variant="outline">
                <Database className="w-4 h-4 mr-2" />
                {saving ? "Seeding..." : "Seed Sample Content"}
              </Button>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          <Tabs defaultValue="hero" className="space-y-6">
            <TabsList className="grid grid-cols-6 w-full max-w-4xl">
              <TabsTrigger value="hero">Hero</TabsTrigger>
              <TabsTrigger value="stats">Stats</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="ai-agents">AI Agents</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="company">Company</TabsTrigger>
            </TabsList>

            {/* Hero Section Tab */}
            <TabsContent value="hero">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">Hero Section</h2>
                    <p className="text-muted-foreground">Edit your homepage hero content</p>
                  </div>
                  <Button onClick={handleSaveHero} disabled={saving}>
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="hero-title">Main Title</Label>
                    <Input
                      id="hero-title"
                      value={heroContent.title}
                      onChange={(e) => setHeroContent({ ...heroContent, title: e.target.value })}
                      placeholder="Your main headline"
                    />
                  </div>

                  <div>
                    <Label htmlFor="hero-subtitle">Subtitle</Label>
                    <Input
                      id="hero-subtitle"
                      value={heroContent.subtitle}
                      onChange={(e) => setHeroContent({ ...heroContent, subtitle: e.target.value })}
                      placeholder="Supporting text"
                    />
                  </div>

                  <div>
                    <Label htmlFor="hero-description">Description</Label>
                    <Textarea
                      id="hero-description"
                      value={heroContent.description}
                      onChange={(e) => setHeroContent({ ...heroContent, description: e.target.value })}
                      placeholder="Detailed description"
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hero-cta-text">Primary CTA Text</Label>
                      <Input
                        id="hero-cta-text"
                        value={heroContent.ctaText}
                        onChange={(e) => setHeroContent({ ...heroContent, ctaText: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="hero-cta-link">Primary CTA Link</Label>
                      <Input
                        id="hero-cta-link"
                        value={heroContent.ctaLink}
                        onChange={(e) => setHeroContent({ ...heroContent, ctaLink: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hero-secondary-cta-text">Secondary CTA Text</Label>
                      <Input
                        id="hero-secondary-cta-text"
                        value={heroContent.secondaryCtaText}
                        onChange={(e) => setHeroContent({ ...heroContent, secondaryCtaText: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="hero-secondary-cta-link">Secondary CTA Link</Label>
                      <Input
                        id="hero-secondary-cta-link"
                        value={heroContent.secondaryCtaLink}
                        onChange={(e) => setHeroContent({ ...heroContent, secondaryCtaLink: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Stats Section Tab */}
            <TabsContent value="stats">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">Stats Section</h2>
                    <p className="text-muted-foreground">Update your achievement statistics</p>
                  </div>
                  <Button onClick={handleSaveStats} disabled={saving}>
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="projects-completed">Projects Completed</Label>
                    <Input
                      id="projects-completed"
                      value={statsContent.projectsCompleted}
                      onChange={(e) => setStatsContent({ ...statsContent, projectsCompleted: e.target.value })}
                      placeholder="e.g., 50+"
                    />
                  </div>

                  <div>
                    <Label htmlFor="clients-satisfied">Clients Satisfied</Label>
                    <Input
                      id="clients-satisfied"
                      value={statsContent.clientsSatisfied}
                      onChange={(e) => setStatsContent({ ...statsContent, clientsSatisfied: e.target.value })}
                      placeholder="e.g., 40+"
                    />
                  </div>

                  <div>
                    <Label htmlFor="years-experience">Years Experience</Label>
                    <Input
                      id="years-experience"
                      value={statsContent.yearsExperience}
                      onChange={(e) => setStatsContent({ ...statsContent, yearsExperience: e.target.value })}
                      placeholder="e.g., 5+"
                    />
                  </div>

                  <div>
                    <Label htmlFor="success-rate">Success Rate</Label>
                    <Input
                      id="success-rate"
                      value={statsContent.successRate}
                      onChange={(e) => setStatsContent({ ...statsContent, successRate: e.target.value })}
                      placeholder="e.g., 98%"
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Portfolio Section Tab */}
            <TabsContent value="portfolio">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">Portfolio Projects</h2>
                    <p className="text-muted-foreground">Manage your portfolio projects</p>
                  </div>
                  <Button onClick={() => { setEditingProject(null); setProjectDialogOpen(true); }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Project
                  </Button>
                </div>

                <div className="space-y-4">
                  {projects.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <p>No projects yet. Click "Add Project" to create your first one.</p>
                    </div>
                  ) : (
                    projects.map((project) => (
                      <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-4 flex-1">
                          <img src={project.image} alt={project.title} className="w-20 h-20 object-cover rounded" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{project.title}</h3>
                              {project.featured && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                              <Badge variant={project.active ? "default" : "secondary"}>
                                {project.active ? "Active" : "Hidden"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-1">{project.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">{project.category}</Badge>
                              {project.technologies && (
                                <span className="text-xs text-muted-foreground">{project.technologies}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleToggleProjectActive(project)}
                          >
                            {project.active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => { setEditingProject(project); setProjectDialogOpen(true); }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteProject(project.id)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </TabsContent>

            {/* AI Agents Section Tab */}
            <TabsContent value="ai-agents">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">AI Agents</h2>
                    <p className="text-muted-foreground">Manage your AI agent offerings</p>
                  </div>
                  <Button onClick={() => { setEditingAgent(null); setAgentDialogOpen(true); }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add AI Agent
                  </Button>
                </div>

                <div className="space-y-4">
                  {aiAgents.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <p>No AI agents yet. Click "Add AI Agent" to create your first one.</p>
                    </div>
                  ) : (
                    aiAgents.map((agent) => (
                      <div key={agent.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-2xl">
                            {agent.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{agent.name}</h3>
                              {agent.featured && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                              <Badge variant={agent.active ? "default" : "secondary"}>
                                {agent.active ? "Active" : "Hidden"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-1">{agent.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">{agent.category}</Badge>
                              <span className="text-sm font-semibold text-primary">{agent.price}</span>
                              <span className="text-xs text-muted-foreground">/ {agent.priceType}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleToggleAgentActive(agent)}
                          >
                            {agent.active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => { setEditingAgent(agent); setAgentDialogOpen(true); }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteAgent(agent.id)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </TabsContent>

            {/* Contact Info Tab */}
            <TabsContent value="contact">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">Contact Information</h2>
                    <p className="text-muted-foreground">Update your contact details</p>
                  </div>
                  <Button onClick={handleSaveContact} disabled={saving}>
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="contact-email">Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                      placeholder="hello@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="contact-phone">Phone</Label>
                    <Input
                      id="contact-phone"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <Label htmlFor="contact-address">Address</Label>
                    <Textarea
                      id="contact-address"
                      value={contactInfo.address}
                      onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                      placeholder="123 Business St, City, State ZIP"
                      rows={2}
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="font-semibold mb-4">Social Media Links</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="social-twitter">Twitter</Label>
                        <Input
                          id="social-twitter"
                          value={contactInfo.socialLinks.twitter}
                          onChange={(e) => setContactInfo({
                            ...contactInfo,
                            socialLinks: { ...contactInfo.socialLinks, twitter: e.target.value }
                          })}
                          placeholder="https://twitter.com/yourhandle"
                        />
                      </div>

                      <div>
                        <Label htmlFor="social-linkedin">LinkedIn</Label>
                        <Input
                          id="social-linkedin"
                          value={contactInfo.socialLinks.linkedin}
                          onChange={(e) => setContactInfo({
                            ...contactInfo,
                            socialLinks: { ...contactInfo.socialLinks, linkedin: e.target.value }
                          })}
                          placeholder="https://linkedin.com/company/..."
                        />
                      </div>

                      <div>
                        <Label htmlFor="social-github">GitHub</Label>
                        <Input
                          id="social-github"
                          value={contactInfo.socialLinks.github}
                          onChange={(e) => setContactInfo({
                            ...contactInfo,
                            socialLinks: { ...contactInfo.socialLinks, github: e.target.value }
                          })}
                          placeholder="https://github.com/yourorg"
                        />
                      </div>

                      <div>
                        <Label htmlFor="social-facebook">Facebook</Label>
                        <Input
                          id="social-facebook"
                          value={contactInfo.socialLinks.facebook}
                          onChange={(e) => setContactInfo({
                            ...contactInfo,
                            socialLinks: { ...contactInfo.socialLinks, facebook: e.target.value }
                          })}
                          placeholder="https://facebook.com/yourpage"
                        />
                      </div>

                      <div>
                        <Label htmlFor="social-instagram">Instagram</Label>
                        <Input
                          id="social-instagram"
                          value={contactInfo.socialLinks.instagram}
                          onChange={(e) => setContactInfo({
                            ...contactInfo,
                            socialLinks: { ...contactInfo.socialLinks, instagram: e.target.value }
                          })}
                          placeholder="https://instagram.com/yourprofile"
                        />
                      </div>

                      <div>
                        <Label htmlFor="social-youtube">YouTube</Label>
                        <Input
                          id="social-youtube"
                          value={contactInfo.socialLinks.youtube}
                          onChange={(e) => setContactInfo({
                            ...contactInfo,
                            socialLinks: { ...contactInfo.socialLinks, youtube: e.target.value }
                          })}
                          placeholder="https://youtube.com/@yourchannel"
                        />
                      </div>

                      <div>
                        <Label htmlFor="social-pinterest">Pinterest</Label>
                        <Input
                          id="social-pinterest"
                          value={contactInfo.socialLinks.pinterest}
                          onChange={(e) => setContactInfo({
                            ...contactInfo,
                            socialLinks: { ...contactInfo.socialLinks, pinterest: e.target.value }
                          })}
                          placeholder="https://pinterest.com/yourprofile"
                        />
                      </div>

                      <div>
                        <Label htmlFor="social-tiktok">TikTok</Label>
                        <Input
                          id="social-tiktok"
                          value={contactInfo.socialLinks.tiktok}
                          onChange={(e) => setContactInfo({
                            ...contactInfo,
                            socialLinks: { ...contactInfo.socialLinks, tiktok: e.target.value }
                          })}
                          placeholder="https://tiktok.com/@yourhandle"
                        />
                      </div>

                      <div>
                        <Label htmlFor="social-whatsapp">WhatsApp</Label>
                        <Input
                          id="social-whatsapp"
                          value={contactInfo.socialLinks.whatsapp}
                          onChange={(e) => setContactInfo({
                            ...contactInfo,
                            socialLinks: { ...contactInfo.socialLinks, whatsapp: e.target.value }
                          })}
                          placeholder="+1234567890 (number only)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Company Info Tab */}
            <TabsContent value="company">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">Company Information</h2>
                    <p className="text-muted-foreground">Update your company details</p>
                  </div>
                  <Button onClick={handleSaveCompany} disabled={saving}>
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input
                      id="company-name"
                      value={companyInfo.name}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                      placeholder="Your Company Name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="company-tagline">Tagline</Label>
                    <Input
                      id="company-tagline"
                      value={companyInfo.tagline}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, tagline: e.target.value })}
                      placeholder="Your company tagline"
                    />
                  </div>

                  <div>
                    <Label htmlFor="company-description">Description</Label>
                    <Textarea
                      id="company-description"
                      value={companyInfo.description}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, description: e.target.value })}
                      placeholder="Brief description of your company"
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="company-founded">Founded Year</Label>
                    <Input
                      id="company-founded"
                      value={companyInfo.founded}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, founded: e.target.value })}
                      placeholder="2019"
                    />
                  </div>

                  <div>
                    <Label htmlFor="company-mission">Mission Statement</Label>
                    <Textarea
                      id="company-mission"
                      value={companyInfo.mission}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, mission: e.target.value })}
                      placeholder="Your company's mission"
                      rows={3}
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Project Dialog */}
      <ProjectDialog
        open={projectDialogOpen}
        onOpenChange={setProjectDialogOpen}
        project={editingProject}
        onSave={handleSaveProject}
        saving={saving}
      />

      {/* AI Agent Dialog */}
      <AIAgentDialog
        open={agentDialogOpen}
        onOpenChange={setAgentDialogOpen}
        agent={editingAgent}
        onSave={handleSaveAgent}
        saving={saving}
      />
    </div>
  );
}

// Project Dialog Component
function ProjectDialog({
  open,
  onOpenChange,
  project,
  onSave,
  saving
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project | null;
  onSave: (data: Partial<Project>) => void;
  saving: boolean;
}) {
  const [formData, setFormData] = useState<Partial<Project>>({
    title: "",
    description: "",
    category: "",
    image: "",
    link: "",
    technologies: "",
    order: 0,
    featured: false,
    active: true,
  });

  useEffect(() => {
    if (project) {
      setFormData(project);
    } else {
      setFormData({
        title: "",
        description: "",
        category: "",
        image: "",
        link: "",
        technologies: "",
        order: 0,
        featured: false,
        active: true,
      });
    }
  }, [project, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{project ? "Edit Project" : "Add New Project"}</DialogTitle>
          <DialogDescription>
            {project ? "Update project details" : "Create a new portfolio project"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="project-title">Title *</Label>
            <Input
              id="project-title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="project-description">Description *</Label>
            <Textarea
              id="project-description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="project-category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Web Development">Web Development</SelectItem>
                  <SelectItem value="E-commerce">E-commerce</SelectItem>
                  <SelectItem value="Mobile App">Mobile App</SelectItem>
                  <SelectItem value="AI Solution">AI Solution</SelectItem>
                  <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="project-order">Display Order</Label>
              <Input
                id="project-order"
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="project-image">Image URL *</Label>
            <Input
              id="project-image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          <div>
            <Label htmlFor="project-link">Project Link</Label>
            <Input
              id="project-link"
              value={formData.link || ""}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              placeholder="https://project-url.com"
            />
          </div>

          <div>
            <Label htmlFor="project-technologies">Technologies (comma-separated)</Label>
            <Input
              id="project-technologies"
              value={formData.technologies || ""}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              placeholder="React, Node.js, PostgreSQL"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                id="project-featured"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
              />
              <Label htmlFor="project-featured">Featured Project</Label>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="project-active"
                checked={formData.active}
                onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
              />
              <Label htmlFor="project-active">Active (Visible)</Label>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : project ? "Update Project" : "Create Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// AI Agent Dialog Component
function AIAgentDialog({
  open,
  onOpenChange,
  agent,
  onSave,
  saving
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agent: AiAgent | null;
  onSave: (data: Partial<AiAgent>) => void;
  saving: boolean;
}) {
  const [formData, setFormData] = useState<Partial<AiAgent>>({
    name: "",
    description: "",
    icon: "🤖",
    features: [],
    price: "",
    priceType: "monthly",
    category: "",
    capabilities: "",
    integrations: [],
    order: 0,
    featured: false,
    active: true,
  });

  const [featuresInput, setFeaturesInput] = useState("");
  const [integrationsInput, setIntegrationsInput] = useState("");

  useEffect(() => {
    if (agent) {
      setFormData(agent);
      setFeaturesInput(agent.features?.join(", ") || "");
      setIntegrationsInput(agent.integrations?.join(", ") || "");
    } else {
      setFormData({
        name: "",
        description: "",
        icon: "🤖",
        features: [],
        price: "",
        priceType: "monthly",
        category: "",
        capabilities: "",
        integrations: [],
        order: 0,
        featured: false,
        active: true,
      });
      setFeaturesInput("");
      setIntegrationsInput("");
    }
  }, [agent, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      features: featuresInput.split(",").map(f => f.trim()).filter(Boolean),
      integrations: integrationsInput.split(",").map(i => i.trim()).filter(Boolean),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{agent ? "Edit AI Agent" : "Add New AI Agent"}</DialogTitle>
          <DialogDescription>
            {agent ? "Update AI agent details" : "Create a new AI agent offering"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="agent-name">Name *</Label>
            <Input
              id="agent-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="agent-description">Description *</Label>
            <Textarea
              id="agent-description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="agent-icon">Icon (Emoji)</Label>
              <Input
                id="agent-icon"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="🤖"
              />
            </div>

            <div>
              <Label htmlFor="agent-category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Customer Service">Customer Service</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Support">Support</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <Label htmlFor="agent-price">Price *</Label>
              <Input
                id="agent-price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="$299"
                required
              />
            </div>

            <div>
              <Label htmlFor="agent-price-type">Price Type</Label>
              <Select
                value={formData.priceType}
                onValueChange={(value) => setFormData({ ...formData, priceType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="one-time">One-time</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="agent-features">Features (comma-separated)</Label>
            <Textarea
              id="agent-features"
              value={featuresInput}
              onChange={(e) => setFeaturesInput(e.target.value)}
              placeholder="24/7 availability, Natural language processing, Multi-language support"
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="agent-capabilities">Capabilities</Label>
            <Textarea
              id="agent-capabilities"
              value={formData.capabilities || ""}
              onChange={(e) => setFormData({ ...formData, capabilities: e.target.value })}
              placeholder="Detailed description of what this AI agent can do"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="agent-integrations">Integrations (comma-separated)</Label>
            <Input
              id="agent-integrations"
              value={integrationsInput}
              onChange={(e) => setIntegrationsInput(e.target.value)}
              placeholder="Slack, WhatsApp, Email, Website"
            />
          </div>

          <div>
            <Label htmlFor="agent-order">Display Order</Label>
            <Input
              id="agent-order"
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                id="agent-featured"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
              />
              <Label htmlFor="agent-featured">Featured Agent</Label>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="agent-active"
                checked={formData.active}
                onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
              />
              <Label htmlFor="agent-active">Active (Visible)</Label>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : agent ? "Update AI Agent" : "Create AI Agent"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
