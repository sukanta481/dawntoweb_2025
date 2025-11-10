import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Share2, TrendingUp, PenTool, Mail, Megaphone } from "lucide-react";

const services = [
  {
    icon: Search,
    title: "SEO Optimization",
    description: "Boost your search rankings with data-driven SEO strategies that drive organic traffic and increase visibility.",
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    description: "Build engaged communities and amplify your brand across all major social platforms with targeted campaigns.",
  },
  {
    icon: TrendingUp,
    title: "PPC Advertising",
    description: "Maximize ROI with strategic paid advertising campaigns across Google, Facebook, and other platforms.",
  },
  {
    icon: PenTool,
    title: "Content Marketing",
    description: "Engage your audience with compelling content that tells your brand story and drives conversions.",
  },
  {
    icon: Mail,
    title: "Email Marketing",
    description: "Nurture leads and retain customers with personalized email campaigns that deliver results.",
  },
  {
    icon: Megaphone,
    title: "Brand Strategy",
    description: "Develop a powerful brand identity that resonates with your target audience and stands out from competitors.",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital marketing solutions tailored to your business needs
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
              <p className="text-muted-foreground mb-4" data-testid={`text-service-description-${index}`}>
                {service.description}
              </p>
              <Button
                variant="ghost"
                className="p-0 h-auto hover:bg-transparent"
                data-testid={`button-learn-more-${index}`}
                onClick={() => console.log(`Learn more about ${service.title}`)}
              >
                Learn More →
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
