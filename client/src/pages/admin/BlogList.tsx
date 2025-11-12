import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Menu, X, LogOut, LayoutDashboard, Mail, FileText, Plus, Edit2, Trash2, Eye } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function AdminBlogList() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/admin/blog-posts", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      } else if (res.status === 401) {
        setLocation("/admin/login");
      }
    } catch (error) {
      console.error("Failed to fetch blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const res = await fetch(`/api/admin/blog-posts/${postId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        toast({
          title: "Blog Post Deleted",
          description: "Blog post has been deleted successfully.",
        });
        fetchPosts();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete blog post.",
        variant: "destructive",
      });
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500";
      case "draft":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: Mail, label: "Leads", path: "/admin/leads" },
    { icon: FileText, label: "Blog Posts", path: "/admin/blog" },
    { icon: FileText, label: "Content", path: "/admin/content" },
  ];

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
                variant={window.location.pathname === item.path ? "default" : "ghost"}
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
          <h1 className="text-xl font-bold">Blog Posts</h1>
          <div className="w-10"></div>
        </header>

        <main className="p-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">All Blog Posts ({posts.length})</h2>
              <Button onClick={() => setLocation("/admin/blog/new")}>
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </div>

            {loading ? (
              <p>Loading blog posts...</p>
            ) : posts.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">No blog posts yet. Create your first one!</p>
                <Button onClick={() => setLocation("/admin/blog/new")}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Post
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-semibold">Title</th>
                      <th className="text-left p-4 font-semibold">Category</th>
                      <th className="text-left p-4 font-semibold">Status</th>
                      <th className="text-left p-4 font-semibold">Published</th>
                      <th className="text-left p-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={post.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">
                          <div>
                            <p className="font-medium">{post.title}</p>
                            {post.excerpt && (
                              <p className="text-sm text-muted-foreground line-clamp-1">
                                {post.excerpt}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          {post.category && (
                            <Badge variant="outline">{post.category}</Badge>
                          )}
                        </td>
                        <td className="p-4">
                          <Badge className={getStatusColor(post.status)}>
                            {post.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {post.publishedAt
                            ? new Date(post.publishedAt).toLocaleDateString()
                            : "—"}
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setLocation(`/admin/blog/edit/${post.id}`)}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-destructive"
                              onClick={() => deletePost(post.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </main>
      </div>
    </div>
  );
}
