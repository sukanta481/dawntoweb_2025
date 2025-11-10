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
    title: "E-Commerce Platform",
    category: "Web Design",
    image: ecommerceImg,
    description: "Complete redesign and optimization resulting in 150% increase in conversions",
  },
  {
    title: "Fitness App Design",
    category: "Branding",
    image: fitnessImg,
    description: "Mobile-first UI/UX design with seamless user experience",
  },
  {
    title: "Corporate Branding",
    category: "Branding",
    image: brandingImg,
    description: "Full brand identity development for Fortune 500 company",
  },
  {
    title: "Social Campaign",
    category: "Social Media",
    image: socialMediaImg,
    description: "Viral social media campaign reaching 2M+ impressions",
  },
  {
    title: "SEO Success Story",
    category: "SEO",
    image: seoImg,
    description: "Achieved top 3 rankings for competitive keywords in 6 months",
  },
  {
    title: "Restaurant Website",
    category: "Web Design",
    image: restaurantImg,
    description: "Modern website with online ordering system and reservations",
  },
];

const categories = ["All", "Web Design", "Branding", "Social Media", "SEO"];

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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Portfolio</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real results from real clients. See how we've helped businesses achieve their digital goals.
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
                <h3 className="text-xl font-bold" data-testid={`text-project-title-${index}`}>
                  {project.title}
                </h3>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
