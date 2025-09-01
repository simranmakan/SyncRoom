import { useState } from "react";
import Navbar from "@/components/Navbar";
import LifestyleQuiz from "@/components/LifestyleQuiz";
import RoommateCard from "@/components/RoommateCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, RefreshCw } from "lucide-react";

const LifestyleMatch = () => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<any>(null);

  // Mock roommate data
  const potentialRoommates = [
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
      interests: ["Tech", "Gaming", "Cooking", "Fitness"]
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
      interests: ["Music", "Art", "Travel", "Photography"]
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
      interests: ["Reading", "Yoga", "Movies", "Cooking"]
    },
    {
      id: 4,
      name: "Neha Patel",
      age: 24,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      vibeScore: 88,
      lifestyle: {
        sleepSchedule: "moderate",
        partyPreference: "occasional",
        cleanliness: 8,
        visitors: "Weekly",
        noise: "Moderate",
        smoking: false,
        pets: true
      },
      interests: ["Dance", "Fashion", "Food", "Netflix"]
    },
    {
      id: 5,
      name: "Vikram Singh",
      age: 26,
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      vibeScore: 72,
      lifestyle: {
        sleepSchedule: "late",
        partyPreference: "love",
        cleanliness: 6,
        visitors: "Daily",
        noise: "High",
        smoking: true,
        pets: false
      },
      interests: ["Sports", "Music", "Parties", "Travel"]
    },
    {
      id: 6,
      name: "Ananya Reddy",
      age: 22,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
      vibeScore: 95,
      lifestyle: {
        sleepSchedule: "early",
        partyPreference: "small",
        cleanliness: 9,
        visitors: "Monthly",
        noise: "Low",
        smoking: false,
        pets: false
      },
      interests: ["Study", "Meditation", "Nature", "Art"]
    }
  ];

  const handleQuizComplete = (answers: any) => {
    setUserAnswers(answers);
    setQuizCompleted(true);
  };

  const retakeQuiz = () => {
    setQuizCompleted(false);
    setUserAnswers(null);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {!quizCompleted ? (
          <div>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">AI-Powered Matching</span>
              </div>
              <h1 className="text-4xl font-bold mb-4">Find Your Vibe Match</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Answer a few questions about your lifestyle preferences and we'll match you 
                with compatible roommates based on your daily habits and personality.
              </p>
            </div>
            
            <LifestyleQuiz onComplete={handleQuizComplete} />
          </div>
        ) : (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Your Perfect Matches</h1>
              <p className="text-xl text-muted-foreground mb-6">
                Based on your lifestyle preferences, here are your top roommate matches
              </p>
              <Button variant="outline" onClick={retakeQuiz}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Retake Quiz
              </Button>
            </div>

            {/* Lifestyle Summary */}
            <div className="bg-card rounded-2xl border border-border p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Your Lifestyle Profile</h2>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="px-3 py-1">
                  🌅 Early Bird
                </Badge>
                <Badge variant="secondary" className="px-3 py-1">
                  🎉 Occasional Parties
                </Badge>
                <Badge variant="secondary" className="px-3 py-1">
                  🧹 Clean & Organized
                </Badge>
                <Badge variant="secondary" className="px-3 py-1">
                  👥 Weekly Visitors
                </Badge>
                <Badge variant="secondary" className="px-3 py-1">
                  🔇 Moderate Noise
                </Badge>
              </div>
            </div>

            {/* Roommate Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {potentialRoommates.map(roommate => (
                <RoommateCard key={roommate.id} roommate={roommate} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default LifestyleMatch;