import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Bot, Palette, Search, BarChart, Rocket } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Website Development",
    description: "Modern, responsive websites built with the latest technologies. Perfect for small businesses and startups.",
    price: "From $999",
  },
  {
    icon: Bot,
    title: "AI Agents & Automation",
    description: "Smart AI solutions to automate your business processes, from customer support to lead generation.",
    price: "From $149/mo",
  },
  {
    icon: Palette,
    title: "Web Design & UI/UX",
    description: "Beautiful, user-friendly designs that convert visitors into customers. Affordable packages available.",
    price: "From $499",
  },
  {
    icon: Search,
    title: "SEO & Online Visibility",
    description: "Get found on Google with our beginner-friendly SEO services. We'll help you rank higher organically.",
    price: "From $299/mo",
  },
  {
    icon: BarChart,
    title: "Digital Marketing Setup",
    description: "Set up your social media, email marketing, and analytics. Perfect for businesses just getting started.",
    price: "From $199",
  },
  {
    icon: Rocket,
    title: "Website Hosting & Maintenance",
    description: "Keep your website running smoothly with our affordable hosting and maintenance packages.",
    price: "From $49/mo",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What We Offer</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Affordable web solutions for growing businesses. Transparent pricing, no hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="p-8 hover-elevate transition-all duration-300"
              data-testid={`card-service-${index}`}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center mb-4">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3" data-testid={`text-service-title-${index}`}>
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-4 text-sm" data-testid={`text-service-description-${index}`}>
                {service.description}
              </p>
              <div className="mt-auto">
                <p className="text-lg font-bold text-primary mb-3">{service.price}</p>
                <Button
                  variant="ghost"
                  className="p-0 h-auto hover:bg-transparent"
                  data-testid={`button-learn-more-${index}`}
                  onClick={() => console.log(`Learn more about ${service.title}`)}
                >
                  Learn More →
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
