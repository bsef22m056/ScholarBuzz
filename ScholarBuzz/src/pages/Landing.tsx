import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Target,
  Bell,
  Bot,
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  Star,
} from "lucide-react";
import heroImage from "@/assets/hero-landing.jpg";

const features = [
  {
    icon: Target,
    title: "Smart Matching",
    description:
      "Our hybrid algorithm combines rule-based filtering with AI analysis to find scholarships that truly fit your profile.",
  },
  {
    icon: Bell,
    title: "Deadline Alerts",
    description:
      "Never miss an opportunity with timely reminders at 7, 3, and 1 day before each deadline.",
  },
  {
    icon: Bot,
    title: "AI Assistant",
    description:
      "Get personalized guidance and answers to your scholarship questions 24/7.",
  },
  {
    icon: GraduationCap,
    title: "Track Applications",
    description:
      "Monitor your application progress from draft to acceptance in one place.",
  },
];

const stats = [
  { value: "100+", label: "Scholarships" },
  { value: "73%", label: "Match Accuracy" },
  { value: "500+", label: "Students Helped" },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                ScholarBuzz
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/auth">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/auth">
                <Button className="gap-2">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Students celebrating graduation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <div className="max-w-2xl">
            <Badge variant="secondary" className="mb-6 gap-2">
              <Star className="h-3 w-3 fill-current" />
              AI-Powered Matching
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Never Miss an Opportunity{" "}
              <span className="text-primary">That's Meant for You</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              ScholarBuzz uses smart matching to connect you with scholarships
              that fit your unique profile. From STEM to arts & Research,
              international scholarships – find funding for your dreams.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/auth">
                <Button
                  size="lg"
                  className="gap-2 text-lg px-8 w-full sm:w-auto"
                >
                  Start Finding Scholarships
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From discovery to application, ScholarBuzz guides you every step
              of the way.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-card rounded-xl p-6 border border-border shadow-card hover:shadow-lg transition-shadow"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Get matched in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Create Your Profile",
                description:
                  "Tell us about your academic background, interests, and goals.",
              },
              {
                step: "2",
                title: "Get Matched",
                description:
                  "Our AI analyzes thousands of scholarships to find your best fits.",
              },
              {
                step: "3",
                title: "Apply & Track",
                description:
                  "Apply with confidence and track your applications in one place.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full gradient-primary text-primary-foreground text-2xl font-bold mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Find Your Scholarship?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8">
            Join thousands of students who've already found their perfect match.
          </p>
          <Link to="/auth">
            <Button
              size="lg"
              variant="secondary"
              className="gap-2 text-lg px-8"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">
                ScholarBuzz - Buzz into global opurtunities
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} ScholarBuzz. Made in PUCIT
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
