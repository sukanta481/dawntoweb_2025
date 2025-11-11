import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ecommerceImg from "@assets/generated_images/E-commerce_website_portfolio_project_d8f0875a.png";
import fitnessImg from "@assets/generated_images/Fitness_app_portfolio_project_0616a1ef.png";
import brandingImg from "@assets/generated_images/Branding_identity_portfolio_project_35974cef.png";
import socialMediaImg from "@assets/generated_images/Social_media_campaign_project_e5ab0dff.png";
import seoImg from "@assets/generated_images/SEO_analytics_portfolio_project_3b0b2d4b.png";
import restaurantImg from "@assets/generated_images/Restaurant_website_portfolio_project_4665e491.png";

const projects = [
  {
    title: "Client Website #1",
    category: "Completed",
    image: ecommerceImg,
    description: "Modern business website with responsive design and contact forms",
    link: "https://example-client1.com", // Replace with your actual client URL
    technologies: "React, Tailwind CSS, Node.js",
  },
  {
    title: "Client Website #2",
    category: "Completed",
    image: fitnessImg,
    description: "Portfolio website with beautiful UI and smooth animations",
    link: "https://example-client2.com", // Replace with your actual client URL
    technologies: "React, TypeScript, Framer Motion",
  },
  {
    title: "Demo: E-Commerce Store",
    category: "Demo",
    image: restaurantImg,
    description: "Full-featured online store with shopping cart and checkout",
    link: "#", // Replace with demo URL
    technologies: "React, Stripe, Database",
  },
  {
    title: "Demo: Restaurant Website",
    category: "Demo",
    image: brandingImg,
    description: "Beautiful restaurant site with menu and reservation system",
    link: "#", // Replace with demo URL
    technologies: "React, Tailwind, Booking System",
  },
  {
    title: "Demo: Agency Portfolio",
    category: "Demo",
    image: socialMediaImg,
    description: "Creative agency portfolio with stunning animations",
    link: "#", // Replace with demo URL
    technologies: "React, GSAP, Parallax Effects",
  },
  {
    title: "Demo: SaaS Landing Page",
    category: "Demo",
    image: seoImg,
    description: "Modern SaaS landing page optimized for conversions",
    link: "#", // Replace with demo URL
    technologies: "React, Analytics, CRM Integration",
  },
];

const categories = ["All", "Completed", "Demo"];

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("All");

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Card
              key={index}
              className="overflow-hidden group hover-elevate transition-all duration-300 cursor-pointer"
              onClick={() => console.log(`View project: ${project.title}`)}
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
                <Badge variant="secondary" className="mb-3" data-testid={`badge-category-${index}`}>
                  {project.category}
                </Badge>
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
      </div>
    </section>
  );
}
