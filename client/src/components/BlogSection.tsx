import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    title: "How AI Agents Can Transform Your Small Business",
    excerpt: "Discover how AI automation can save you time and money while improving customer satisfaction.",
    category: "AI & Automation",
    date: "Nov 10, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
  },
  {
    title: "5 Essential Features Every Modern Website Needs",
    excerpt: "Learn what makes a website successful in 2024 and how to implement these features affordably.",
    category: "Web Development",
    date: "Nov 8, 2024",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
  },
  {
    title: "Social Media Marketing Tools That Actually Work",
    excerpt: "Free and affordable tools to boost your social media presence without breaking the bank.",
    category: "Digital Marketing",
    date: "Nov 5, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop",
  },
];

export default function BlogSection() {
  return (
    <section id="blog" className="py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Latest Insights</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tips, guides, and insights on web development, AI, and digital marketing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card
              key={index}
              className="overflow-hidden group hover-elevate transition-all duration-300 cursor-pointer"
              onClick={() => console.log(`Read post: ${post.title}`)}
              data-testid={`card-blog-${index}`}
            >
              <div className="relative overflow-hidden aspect-[16/9]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <Badge variant="secondary" className="mb-3">
                  {post.category}
                </Badge>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="p-0 h-auto hover:bg-transparent">
                  Read More <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" onClick={() => console.log("View all posts")}>
            View All Posts
          </Button>
        </div>
      </div>
    </section>
  );
}
