import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function BlogSection() {
  const [, setLocation] = useLocation();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const res = await fetch("/api/blog-posts");
      if (res.ok) {
        const posts = await res.json();
        // Show only the 3 most recent posts
        setBlogPosts(posts.slice(0, 3));
      }
    } catch (error) {
      console.error("Failed to fetch blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const textContent = content.replace(/<[^>]*>/g, ""); // Strip HTML tags
    const words = textContent.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };
  return (
    <section id="blog" className="py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Latest Insights</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tips, guides, and insights on web development, AI, and digital marketing.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading blog posts...</p>
          </div>
        ) : blogPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No blog posts available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden group hover-elevate transition-all duration-300 cursor-pointer"
                onClick={() => setLocation(`/blog/${post.slug}`)}
                data-testid={`card-blog-${post.id}`}
              >
                <div className="relative overflow-hidden aspect-[16/9]">
                  <img
                    src={post.featuredImage || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop"}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  {post.category && (
                    <Badge variant="secondary" className="mb-3">
                      {post.category}
                    </Badge>
                  )}
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.publishedAt ? formatDate(post.publishedAt) : "Recently"}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {calculateReadTime(post.content)}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="p-0 h-auto hover:bg-transparent">
                    Read More <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" onClick={() => console.log("View all posts")}>
            View All Posts
          </Button>
        </div>
      </div>
    </section>
  );
}
