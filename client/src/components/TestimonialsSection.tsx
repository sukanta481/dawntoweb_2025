import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import client1 from "@assets/generated_images/Female_client_testimonial_photo_f4eda68e.png";
import client2 from "@assets/generated_images/Male_CEO_testimonial_photo_7906917c.png";
import client3 from "@assets/generated_images/Startup_founder_testimonial_photo_8adc01bf.png";

const testimonials = [
  {
    name: "Jennifer Williams",
    role: "CEO, TechVenture Inc.",
    image: client1,
    quote: "DigiMarket transformed our online presence completely. Within 6 months, we saw a 300% increase in qualified leads. Their team is professional, creative, and delivers real results.",
  },
  {
    name: "Robert Anderson",
    role: "Founder, Anderson & Co.",
    image: client2,
    quote: "The ROI we've achieved through their PPC campaigns has exceeded all expectations. They're not just a vendor, they're a true partner in our growth strategy.",
  },
  {
    name: "Lisa Chen",
    role: "Marketing Director, StartupHub",
    image: client3,
    quote: "Working with DigiMarket has been a game-changer. Their strategic approach and attention to detail helped us stand out in a crowded market. Highly recommended!",
  },
];

const companyLogos = [
  "TechVenture",
  "Anderson & Co",
  "StartupHub",
  "GlobalCorp",
  "InnovateLabs",
  "FutureScale",
  "NextGen",
  "PrimeDigital",
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Client Success Stories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Hear from businesses we've helped grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-8" data-testid={`card-testimonial-${index}`}>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic" data-testid={`text-testimonial-quote-${index}`}>
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold" data-testid={`text-testimonial-name-${index}`}>
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground" data-testid={`text-testimonial-role-${index}`}>
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="border-t pt-12">
          <p className="text-center text-sm text-muted-foreground mb-8">Trusted by leading brands</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {companyLogos.map((logo, index) => (
              <div
                key={index}
                className="text-2xl font-bold text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors"
                data-testid={`text-company-logo-${index}`}
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
