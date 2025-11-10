import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-muted/50 border-t">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">D</span>
              </div>
              <span className="font-bold text-xl">DigiMarket</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Transforming brands through data-driven digital marketing strategies.
            </p>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => console.log("Facebook clicked")}
                data-testid="button-footer-facebook"
              >
                <Facebook className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => console.log("Twitter clicked")}
                data-testid="button-footer-twitter"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => console.log("Instagram clicked")}
                data-testid="button-footer-instagram"
              >
                <Instagram className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => console.log("LinkedIn clicked")}
                data-testid="button-footer-linkedin"
              >
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => console.log("YouTube clicked")}
                data-testid="button-footer-youtube"
              >
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection("#services")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-seo"
                >
                  SEO Optimization
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("#services")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-social"
                >
                  Social Media Marketing
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("#services")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-ppc"
                >
                  PPC Advertising
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("#services")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-content"
                >
                  Content Marketing
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection("#team")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-about"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("#portfolio")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-portfolio"
                >
                  Portfolio
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("#team")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-team"
                >
                  Our Team
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("#contact")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-contact"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => console.log("Blog clicked")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-blog"
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => console.log("Case Studies clicked")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-case-studies"
                >
                  Case Studies
                </button>
              </li>
              <li>
                <button
                  onClick={() => console.log("Guides clicked")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-guides"
                >
                  Marketing Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("#tools")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-tools"
                >
                  Free Tools
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p data-testid="text-copyright">&copy; 2024 DigiMarket. All rights reserved.</p>
          <div className="flex gap-6">
            <button
              onClick={() => console.log("Privacy Policy clicked")}
              className="hover:text-foreground transition-colors"
              data-testid="link-privacy"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => console.log("Terms clicked")}
              className="hover:text-foreground transition-colors"
              data-testid="link-terms"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
