import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast({
          title: "Message sent!",
          description: data.message || "We'll get back to you within 24 hours.",
        });
        setFormData({ name: "", email: "", service: "", message: "" });
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("newsletter-email") as HTMLInputElement).value;
    console.log("Newsletter signup:", email);
    toast({
      title: "Subscribed!",
      description: "You'll receive our latest insights and updates.",
    });
    form.reset();
  };

  return (
    <section id="contact" className="py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your digital presence? Let's start a conversation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card className="p-8">
            <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  required
                  data-testid="input-name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                  data-testid="input-email"
                />
              </div>
              <div>
                <Label htmlFor="service">Service Interest</Label>
                <Select
                  value={formData.service}
                  onValueChange={(value) => setFormData({ ...formData, service: value })}
                >
                  <SelectTrigger id="service" data-testid="select-service">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seo">SEO Optimization</SelectItem>
                    <SelectItem value="social">Social Media Marketing</SelectItem>
                    <SelectItem value="ppc">PPC Advertising</SelectItem>
                    <SelectItem value="content">Content Marketing</SelectItem>
                    <SelectItem value="email">Email Marketing</SelectItem>
                    <SelectItem value="branding">Brand Strategy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your project..."
                  rows={5}
                  required
                  data-testid="input-message"
                />
              </div>
              <Button type="submit" size="lg" className="w-full" data-testid="button-submit-contact">
                Send Message
              </Button>
            </form>
          </Card>

          <div className="space-y-8">
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Email</div>
                    <a
                      href="mailto:hello@digimarket.com"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      data-testid="link-email"
                    >
                      hello@digimarket.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Phone</div>
                    <a
                      href="tel:+15551234567"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      data-testid="link-phone"
                    >
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Office</div>
                    <p className="text-muted-foreground" data-testid="text-address">
                      123 Marketing Street<br />
                      San Francisco, CA 94102
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-primary text-primary-foreground">
              <h3 className="text-2xl font-bold mb-2">Newsletter</h3>
              <p className="text-primary-foreground/80 mb-6">
                Subscribe to get the latest digital marketing insights and tips delivered to your inbox.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  type="email"
                  name="newsletter-email"
                  placeholder="Enter your email"
                  required
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                  data-testid="input-newsletter"
                />
                <Button
                  type="submit"
                  variant="secondary"
                  data-testid="button-subscribe"
                >
                  Subscribe
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
