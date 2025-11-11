import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, MessageSquare, Mail, Calendar, Search, TrendingUp } from "lucide-react";

const aiAgents = [
  {
    icon: MessageSquare,
    title: "Customer Support AI Agent",
    description: "24/7 automated customer service chatbot that handles FAQs, support tickets, and customer inquiries",
    features: ["Multi-language support", "CRM integration", "Smart ticket routing"],
    price: "Starting at $299/mo",
    popular: true,
  },
  {
    icon: Mail,
    title: "Email Marketing AI",
    description: "Automated email campaigns with AI-powered personalization and optimization",
    features: ["Smart segmentation", "A/B testing", "Performance analytics"],
    price: "Starting at $199/mo",
    popular: false,
  },
  {
    icon: Calendar,
    title: "Appointment Booking Agent",
    description: "Smart scheduling assistant that handles bookings, reminders, and calendar management",
    features: ["Calendar sync", "SMS reminders", "No-show reduction"],
    price: "Starting at $149/mo",
    popular: false,
  },
  {
    icon: Search,
    title: "Lead Generation AI",
    description: "Automatically find and qualify leads through intelligent web scraping and analysis",
    features: ["Lead scoring", "Email finder", "CRM export"],
    price: "Starting at $249/mo",
    popular: false,
  },
  {
    icon: TrendingUp,
    title: "Social Media Manager AI",
    description: "Automate your social media posting, engagement, and analytics across platforms",
    features: ["Auto-posting", "Engagement tracking", "Content suggestions"],
    price: "Starting at $179/mo",
    popular: true,
  },
  {
    icon: Bot,
    title: "Custom AI Agent",
    description: "Need something specific? We build custom AI agents tailored to your business needs",
    features: ["Fully customized", "Your workflows", "Dedicated support"],
    price: "Custom pricing",
    popular: false,
  },
];

export default function AIAgentsSection() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aiAgents.map((agent, index) => (
            <Card
              key={index}
              className={`p-6 hover-elevate transition-all duration-300 ${
                agent.popular ? "border-primary border-2" : ""
              }`}
              data-testid={`card-ai-agent-${index}`}
            >
              {agent.popular && (
                <Badge className="mb-4" variant="default">
                  POPULAR
                </Badge>
              )}
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <agent.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2" data-testid={`text-agent-title-${index}`}>
                {agent.title}
              </h3>
              <p className="text-muted-foreground mb-4 text-sm">
                {agent.description}
              </p>
              <div className="mb-4">
                <p className="text-sm font-semibold mb-2">Key Features:</p>
                <ul className="space-y-1">
                  {agent.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t pt-4 mt-4">
                <p className="font-bold text-lg mb-3">{agent.price}</p>
                <Button
                  onClick={scrollToContact}
                  variant={agent.popular ? "default" : "outline"}
                  className="w-full"
                  data-testid={`button-agent-${index}`}
                >
                  Get Started
                </Button>
              </div>
            </Card>
          ))}
        </div>

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
