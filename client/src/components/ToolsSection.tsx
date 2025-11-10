import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, ArrowRight } from "lucide-react";
import tool1 from "@assets/generated_images/Marketing_analytics_dashboard_tool_92df6b77.png";
import tool2 from "@assets/generated_images/SEO_keyword_research_tool_e804a170.png";

const tools = [
  {
    name: "MarketingHub Analytics",
    description: "Comprehensive analytics platform for tracking campaign performance across all channels",
    image: tool1,
    features: [
      "Real-time campaign tracking",
      "ROI calculation and forecasting",
      "Multi-channel attribution",
      "Custom reporting dashboards",
      "Competitor analysis",
    ],
  },
  {
    name: "SEO Keyword Finder Pro",
    description: "Advanced keyword research tool powered by AI to discover high-value opportunities",
    image: tool2,
    features: [
      "AI-powered keyword suggestions",
      "Search volume and difficulty metrics",
      "Competitor keyword gaps",
      "Content optimization recommendations",
      "Rank tracking automation",
    ],
  },
];

export default function ToolsSection() {
  return (
    <section id="tools" className="py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Digital Marketing Tools</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Proprietary tools designed to give you a competitive edge in the digital landscape
          </p>
        </div>

        <div className="space-y-16">
          {tools.map((tool, index) => (
            <Card
              key={index}
              className="overflow-hidden"
              data-testid={`card-tool-${index}`}
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <img
                    src={tool.image}
                    alt={tool.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className={`p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <h3 className="text-3xl font-bold mb-4" data-testid={`text-tool-name-${index}`}>
                    {tool.name}
                  </h3>
                  <p className="text-muted-foreground mb-6" data-testid={`text-tool-description-${index}`}>
                    {tool.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {tool.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start gap-3"
                        data-testid={`text-tool-feature-${index}-${featureIndex}`}
                      >
                        <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    size="lg"
                    onClick={() => console.log(`Start free trial: ${tool.name}`)}
                    data-testid={`button-trial-${index}`}
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
