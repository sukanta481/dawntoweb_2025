import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { AiAgent } from "@shared/schema";

export default function AIAgentsSection() {
  const [aiAgents, setAiAgents] = useState<AiAgent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAiAgents();
  }, []);

  const fetchAiAgents = async () => {
    try {
      const res = await fetch("/api/ai-agents");
      if (res.ok) {
        const data = await res.json();
        // Only show active agents to public
        setAiAgents(data.filter((a: AiAgent) => a.active));
      }
    } catch (error) {
      console.error("Failed to fetch AI agents:", error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const formatPrice = (agent: AiAgent) => {
    if (agent.priceType === "custom") {
      return agent.price;
    }
    return `${agent.price}/${agent.priceType === "monthly" ? "mo" : agent.priceType}`;
  };

  return (
    <section id="ai-agents" className="py-16 md:py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <Badge className="mb-4" data-testid="badge-new-offering">
            🚀 NEW OFFERING
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">AI Agents for Your Business</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Automate your business with intelligent AI agents. Save time, reduce costs, and scale your operations
            with our ready-to-deploy AI solutions.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading AI agents...</p>
          </div>
        ) : aiAgents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No AI agents available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiAgents.map((agent, index) => (
              <Card
                key={agent.id}
                className={`p-6 hover-elevate transition-all duration-300 ${
                  agent.featured ? "border-primary border-2" : ""
                }`}
                data-testid={`card-ai-agent-${index}`}
              >
                {agent.featured && (
                  <Badge className="mb-4" variant="default">
                    POPULAR
                  </Badge>
                )}
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-2xl">
                  {agent.icon}
                </div>
                <h3 className="text-xl font-bold mb-2" data-testid={`text-agent-title-${index}`}>
                  {agent.name}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  {agent.description}
                </p>
                <div className="mb-4">
                  <p className="text-sm font-semibold mb-2">Key Features:</p>
                  <ul className="space-y-1">
                    {agent.features && agent.features.length > 0 ? (
                      agent.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          {feature}
                        </li>
                      ))
                    ) : (
                      <li className="text-sm text-muted-foreground">No features listed</li>
                    )}
                  </ul>
                </div>
                <div className="border-t pt-4 mt-4">
                  <p className="font-bold text-lg mb-3">
                    {agent.priceType === "custom" ? agent.price : `Starting at ${formatPrice(agent)}`}
                  </p>
                  <Button
                    onClick={scrollToContact}
                    variant={agent.featured ? "default" : "outline"}
                    className="w-full"
                    data-testid={`button-agent-${index}`}
                  >
                    Get Started
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <div className="bg-card border rounded-lg p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-3">Not Sure Which AI Agent You Need?</h3>
            <p className="text-muted-foreground mb-6">
              Schedule a free consultation and we'll help you choose the right AI solution for your business.
            </p>
            <Button onClick={scrollToContact} size="lg">
              Book Free Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
