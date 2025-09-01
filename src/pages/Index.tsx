import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PropertyCard from "@/components/PropertyCard";
import RoommateCard from "@/components/RoommateCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  // Sample featured properties
  const featuredProperties = [
    {
      id: 1,
      title: "Cozy Studio in Koramangala",
      location: "Koramangala, Bangalore",
      price: "12,000",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=400&fit=crop",
      amenities: ["WiFi", "Parking", "Meals"],
      occupancy: "Single"
    },
    {
      id: 2,
      title: "Modern 2BHK Flat",
      location: "Indiranagar, Bangalore",
      price: "8,500",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=400&fit=crop",
      amenities: ["WiFi", "Parking"],
      occupancy: "Twin Sharing"
    },
    {
      id: 3,
      title: "Premium PG with All Amenities",
      location: "HSR Layout, Bangalore",
      price: "15,000",
      image: "https://images.unsplash.com/photo-1505691723518-36a5ac3965ae?w=500&h=400&fit=crop",
      amenities: ["WiFi", "Meals", "Gym"],
      occupancy: "Single"
    }
  ];

  // Sample featured roommates
  const featuredRoommates = [
    {
      id: 1,
      name: "Arjun Kumar",
      age: 25,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      vibeScore: 92,
      lifestyle: {
        sleepSchedule: "early",
        partyPreference: "occasional",
        cleanliness: 8,
        visitors: "Weekly",
        noise: "Moderate",
        smoking: false,
        pets: false
      },
      interests: ["Tech", "Gaming", "Cooking"]
    },
    {
      id: 2,
      name: "Priya Sharma",
      age: 23,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      vibeScore: 85,
      lifestyle: {
        sleepSchedule: "late",
        partyPreference: "love",
        cleanliness: 7,
        visitors: "Daily",
        noise: "High",
        smoking: false,
        pets: true
      },
      interests: ["Music", "Art", "Travel"]
    },
    {
      id: 3,
      name: "Rahul Verma",
      age: 27,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      vibeScore: 78,
      lifestyle: {
        sleepSchedule: "early",
        partyPreference: "small",
        cleanliness: 9,
        visitors: "Monthly",
        noise: "Low",
        smoking: false,
        pets: false
      },
      interests: ["Reading", "Yoga", "Movies"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      
      {/* Featured Properties Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Properties</h2>
              <p className="text-muted-foreground">Hand-picked PGs with the best amenities</p>
            </div>
            <Link to="/properties">
              <Button variant="outline">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Roommates Section */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Top Vibe Matches</h2>
              <p className="text-muted-foreground">Roommates with the highest compatibility scores</p>
            </div>
            <Link to="/lifestyle-match">
              <Button variant="gradient">
                Find Your Match
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRoommates.map(roommate => (
              <RoommateCard key={roommate.id} roommate={roommate} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
