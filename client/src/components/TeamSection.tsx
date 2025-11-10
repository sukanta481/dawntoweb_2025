import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter } from "lucide-react";
import team1 from "@assets/generated_images/Male_team_member_headshot_fdb9b8e3.png";
import team2 from "@assets/generated_images/Female_creative_director_headshot_66f6fe9f.png";
import team3 from "@assets/generated_images/Male_SEO_specialist_headshot_13be4584.png";
import team4 from "@assets/generated_images/Female_social_media_manager_headshot_bdf5c6ee.png";

const teamMembers = [
  {
    name: "Michael Chen",
    role: "Marketing Director",
    specialization: "Strategic Planning & ROI Optimization",
    image: team1,
    bio: "15+ years driving digital transformation for Fortune 500 companies.",
  },
  {
    name: "Sarah Johnson",
    role: "Creative Director",
    specialization: "Brand Identity & Visual Design",
    image: team2,
    bio: "Award-winning designer with a passion for creating memorable brand experiences.",
  },
  {
    name: "David Martinez",
    role: "SEO Specialist",
    specialization: "Technical SEO & Content Strategy",
    image: team3,
    bio: "Proven track record of ranking clients on page one for competitive keywords.",
  },
  {
    name: "Emily Thompson",
    role: "Social Media Manager",
    specialization: "Community Building & Engagement",
    image: team4,
    bio: "Expert in creating viral campaigns and building engaged online communities.",
  },
];

export default function TeamSection() {
  return (
    <section id="team" className="py-16 md:py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Talented professionals dedicated to your digital success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="text-center overflow-hidden" data-testid={`card-team-${index}`}>
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1" data-testid={`text-team-name-${index}`}>
                  {member.name}
                </h3>
                <p className="text-sm text-primary font-medium mb-2" data-testid={`text-team-role-${index}`}>
                  {member.role}
                </p>
                <p className="text-xs text-muted-foreground mb-3">{member.specialization}</p>
                <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                <div className="flex items-center justify-center gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => console.log(`LinkedIn: ${member.name}`)}
                    data-testid={`button-linkedin-${index}`}
                  >
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => console.log(`Twitter: ${member.name}`)}
                    data-testid={`button-twitter-${index}`}
                  >
                    <Twitter className="w-4 h-4" />
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
