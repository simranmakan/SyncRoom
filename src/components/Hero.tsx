import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Home, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-subtle">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-8">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Lifestyle-Based Roommate Matching</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Find Your Perfect
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              PG & Vibe Match
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Discover PGs and roommates that match your lifestyle. From early birds to night owls, 
            party lovers to peace seekers - find your perfect living companion with our unique vibe matching algorithm.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/lifestyle-match">
              <Button variant="gradient" size="xl" className="group">
                Take Lifestyle Quiz
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/properties">
              <Button variant="outline" size="xl">
                Browse PG Listings
              </Button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:shadow-medium transition-all">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Vibe Matching</h3>
              <p className="text-muted-foreground text-sm">
                AI-powered algorithm matches you with compatible roommates based on lifestyle preferences
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:shadow-medium transition-all">
              <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Home className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Verified PGs</h3>
              <p className="text-muted-foreground text-sm">
                All properties are verified with real photos and accurate amenity information
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:shadow-medium transition-all">
              <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Smart Split</h3>
              <p className="text-muted-foreground text-sm">
                Automated bill splitting and expense tracking with your roommates
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;