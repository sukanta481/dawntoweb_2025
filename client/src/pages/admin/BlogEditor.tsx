import { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Menu, X, LogOut, LayoutDashboard, Mail, FileText, Save, Eye } from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import type { BlogPost } from "@shared/schema";
import "./editor.css";

export default function AdminBlogEditor() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/admin/blog/edit/:id");
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const isEditMode = !!params?.id;

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    category: "",
    tags: [] as string[],
    status: "draft",
    featuredImage: "",
    metaTitle: "",
    metaDescription: "",
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      Placeholder.configure({
        placeholder: "Start writing your blog post...",
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none min-h-[400px] p-4",
      },
    },
  });

  useEffect(() => {
    if (isEditMode && params?.id) {
      fetchPost(params.id);
    }
  }, [params?.id]);

  const fetchPost = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/blog-posts/${id}`, {
        credentials: "include",
      });
      if (res.ok) {
        const post: BlogPost = await res.json();
        setFormData({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt || "",
          category: post.category || "",
          tags: post.tags || [],
          status: post.status,
          featuredImage: post.featuredImage || "",
          metaTitle: post.metaTitle || "",
          metaDescription: post.metaDescription || "",
        });
        editor?.commands.setContent(post.content);
      } else if (res.status === 401) {
        setLocation("/admin/login");
      }
    } catch (error) {
      console.error("Failed to fetch blog post:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      title: value,
      slug: prev.slug || generateSlug(value),
    }));
  };

  const handleSave = async (status: string) => {
    if (!formData.title || !editor?.getHTML()) {
      toast({
        title: "Validation Error",
        description: "Title and content are required.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      const postData = {
        ...formData,
        content: editor.getHTML(),
        status,
        slug: formData.slug || generateSlug(formData.title),
      };

      const url = isEditMode
        ? `/api/admin/blog-posts/${params?.id}`
        : "/api/admin/blog-posts";
      const method = isEditMode ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(postData),
      });

      if (res.ok) {
        toast({
          title: "Success",
          description: `Blog post ${isEditMode ? "updated" : "created"} successfully.`,
        });
        setLocation("/admin/blog");
      } else {
        const error = await res.json();
        toast({
          title: "Error",
          description: error.message || "Failed to save blog post.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save blog post.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
      setLocation("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: Mail, label: "Leads", path: "/admin/leads" },
    { icon: FileText, label: "Blog Posts", path: "/admin/blog" },
    { icon: FileText, label: "Content", path: "/admin/content" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-card border-r w-64`}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b">
            <div className="flex items-center gap-3 mb-2">
              <img src="/assets/images/logo.png" alt="DawnToWeb Logo" className="h-8 w-auto" />
              <h2 className="text-2xl font-bold">DawnToWeb</h2>
            </div>
            <p className="text-sm text-muted-foreground">Admin Panel</p>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={window.location.pathname.startsWith(item.path) ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setLocation(item.path)}
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.label}
              </Button>
            ))}
          </nav>

          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`${sidebarOpen ? "ml-64" : "ml-0"} transition-all`}>
        <header className="bg-card border-b p-4 flex items-center justify-between sticky top-0 z-30">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          <h1 className="text-xl font-bold">
            {isEditMode ? "Edit Blog Post" : "New Blog Post"}
          </h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => handleSave("draft")}
              disabled={saving}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button onClick={() => handleSave("published")} disabled={saving}>
              {saving ? "Publishing..." : "Publish"}
            </Button>
          </div>
        </header>

        <main className="p-6 max-w-5xl mx-auto">
          <Card className="p-6">
            <div className="space-y-6">
              {/* Title */}
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter blog post title"
                  className="text-2xl font-bold border-0 px-0 focus-visible:ring-0"
                />
              </div>

              {/* Slug */}
              <div>
                <Label htmlFor="slug">URL Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, slug: e.target.value }))
                  }
                  placeholder="url-friendly-slug"
                />
              </div>

              {/* Rich Text Editor */}
              <div>
                <Label>Content *</Label>
                <div className="border rounded-md mt-2">
                  {/* Editor Toolbar */}
                  <div className="border-b p-2 flex gap-2 flex-wrap bg-muted/30">
                    <Button
                      type="button"
                      size="sm"
                      variant={editor?.isActive("bold") ? "default" : "outline"}
                      onClick={() => editor?.chain().focus().toggleBold().run()}
                    >
                      Bold
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant={editor?.isActive("italic") ? "default" : "outline"}
                      onClick={() => editor?.chain().focus().toggleItalic().run()}
                    >
                      Italic
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant={editor?.isActive("heading", { level: 2 }) ? "default" : "outline"}
                      onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                    >
                      H2
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant={editor?.isActive("heading", { level: 3 }) ? "default" : "outline"}
                      onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                    >
                      H3
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant={editor?.isActive("bulletList") ? "default" : "outline"}
                      onClick={() => editor?.chain().focus().toggleBulletList().run()}
                    >
                      List
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant={editor?.isActive("orderedList") ? "default" : "outline"}
                      onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                    >
                      Numbered
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant={editor?.isActive("blockquote") ? "default" : "outline"}
                      onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                    >
                      Quote
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant={editor?.isActive("codeBlock") ? "default" : "outline"}
                      onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
                    >
                      Code
                    </Button>
                  </div>

                  {/* Editor Content */}
                  <EditorContent editor={editor} />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
                  }
                  placeholder="Short summary for previews"
                  rows={3}
                />
              </div>

              {/* Category & Featured Image */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, category: e.target.value }))
                    }
                    placeholder="e.g., AI & Automation"
                  />
                </div>
                <div>
                  <Label htmlFor="featuredImage">Featured Image URL</Label>
                  <Input
                    id="featuredImage"
                    value={formData.featuredImage}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        featuredImage: e.target.value,
                      }))
                    }
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* SEO Section */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">SEO Settings</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="metaTitle">Meta Title</Label>
                    <Input
                      id="metaTitle"
                      value={formData.metaTitle}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          metaTitle: e.target.value,
                        }))
                      }
                      placeholder="SEO title (leave empty to use post title)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="metaDescription">Meta Description</Label>
                    <Textarea
                      id="metaDescription"
                      value={formData.metaDescription}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          metaDescription: e.target.value,
                        }))
                      }
                      placeholder="SEO description (150-160 characters)"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
