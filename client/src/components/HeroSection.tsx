import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star } from "lucide-react";
import heroImage from "@assets/generated_images/Hero_office_collaboration_scene_8a593bd2.png";

export default function HeroSection() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToPortfolio = () => {
    const element = document.querySelector("#portfolio");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Modern digital marketing workspace"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-background/60"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Badge variant="secondary" className="px-4 py-1" data-testid="badge-rating">
            <Star className="w-3 h-3 fill-yellow-500 text-yellow-500 mr-1" />
            5.0 Rating from 200+ Clients
          </Badge>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
          Transform Your Brand with{" "}
          <span className="text-primary">Digital Excellence</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Data-driven marketing strategies that deliver measurable results. We help businesses grow
          their online presence and achieve their digital goals.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button
            size="lg"
            onClick={scrollToContact}
            className="min-w-[200px]"
            data-testid="button-hero-start"
          >
            Start Your Project
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={scrollToPortfolio}
            className="min-w-[200px] bg-background/50 backdrop-blur-sm"
            data-testid="button-hero-portfolio"
          >
            View Our Work
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>500+ Projects Delivered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>98% Client Satisfaction</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Award-Winning Team</span>
          </div>
        </div>
      </div>
    </section>
  );
}
