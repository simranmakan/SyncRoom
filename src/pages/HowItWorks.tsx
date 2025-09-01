import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ClipboardList, Users, Home, Sparkles, CreditCard, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const steps = [
    {
      icon: <ClipboardList className="w-8 h-8" />,
      title: "Take the Lifestyle Quiz",
      description: "Answer questions about your daily habits, sleep schedule, social preferences, and cleanliness standards.",
      color: "bg-gradient-primary"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Get Your Vibe Score",
      description: "Our AI algorithm analyzes your responses and creates a unique lifestyle profile for perfect matching.",
      color: "bg-gradient-secondary"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Find Compatible Roommates",
      description: "Browse through potential roommates ranked by compatibility percentage based on lifestyle preferences.",
      color: "bg-gradient-accent"
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Explore Verified PGs",
      description: "Search through our curated list of verified PGs and hostels with real photos and accurate information.",
      color: "bg-gradient-primary"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Connect & Chat",
      description: "Message potential roommates, schedule visits, and discuss living arrangements before making a decision.",
      color: "bg-gradient-secondary"
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Smart Bill Splitting",
      description: "Once you move in, use our automated bill splitting feature to manage shared expenses effortlessly.",
      color: "bg-gradient-accent"
    }
  ];

  const features = [
    {
      title: "95% Match Accuracy",
      description: "Our algorithm has helped thousands find their perfect roommates"
    },
    {
      title: "Verified Properties",
      description: "All listings are personally verified by our team"
    },
    {
      title: "24/7 Support",
      description: "Get help anytime during your search and after moving in"
    },
    {
      title: "No Hidden Fees",
      description: "Transparent pricing with no broker charges"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            How SyncRoom Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Finding the perfect PG and compatible roommate has never been easier. 
            Our unique lifestyle matching system ensures you live with people who share your vibe.
          </p>
        </div>

        {/* Steps */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Your Journey to Perfect Living</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <Card key={index} className="hover:shadow-medium transition-all">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center text-white mb-4`}>
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="bg-card rounded-3xl border border-border p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose SyncRoom?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-primary rounded-3xl p-12">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Find Your Perfect Match?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of happy residents who found their ideal living situation through SyncRoom
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/lifestyle-match">
              <Button variant="hero" size="xl">
                Start Lifestyle Quiz
              </Button>
            </Link>
            <Link to="/properties">
              <Button variant="hero" size="xl">
                Browse Properties
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HowItWorks;