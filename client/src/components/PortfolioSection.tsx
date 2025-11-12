import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@shared/schema";

const categories = ["All", "Web Development", "E-commerce", "Mobile App", "AI Solution", "Digital Marketing"];

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        // Only show active projects to public
        setProjects(data.filter((p: Project) => p.active));
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section id="portfolio" className="py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Work</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Check out our completed client projects and explore demo websites available for purchase or customization.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={activeCategory === category ? "default" : "secondary"}
              className="cursor-pointer px-6 py-2 text-sm hover-elevate active-elevate-2"
              onClick={() => setActiveCategory(category)}
              data-testid={`button-filter-${category.toLowerCase().replace(" ", "-")}`}
            >
              {category}
            </Badge>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card
                key={project.id}
                className="overflow-hidden group hover-elevate transition-all duration-300 cursor-pointer"
                onClick={() => project.link && project.link !== "#" && window.open(project.link, "_blank")}
                data-testid={`card-project-${index}`}
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-sm text-foreground">{project.description}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" data-testid={`badge-category-${index}`}>
                      {project.category}
                    </Badge>
                    {project.featured && (
                      <Badge variant="default">Featured</Badge>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2" data-testid={`text-project-title-${index}`}>
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{project.technologies}</p>
                  {project.link && project.link !== "#" && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Live Site →
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
