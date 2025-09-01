import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sun, Moon, Music, Volume2, Users, Coffee, Cigarette, Calendar } from "lucide-react";

interface RoommateCardProps {
  roommate: {
    id: number;
    name: string;
    age: number;
    avatar: string;
    vibeScore: number;
    lifestyle: {
      sleepSchedule: string;
      partyPreference: string;
      cleanliness: number;
      visitors: string;
      noise: string;
      smoking: boolean;
      pets: boolean;
    };
    interests: string[];
  };
}

const RoommateCard = ({ roommate }: RoommateCardProps) => {
  const getLifestyleIcon = (key: string) => {
    switch (key) {
      case 'earlyBird':
        return <Sun className="w-4 h-4" />;
      case 'nightOwl':
        return <Moon className="w-4 h-4" />;
      case 'party':
        return <Music className="w-4 h-4" />;
      case 'quiet':
        return <Volume2 className="w-4 h-4" />;
      case 'social':
        return <Users className="w-4 h-4" />;
      case 'coffee':
        return <Coffee className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getVibeColor = (score: number) => {
    if (score >= 80) return 'text-accent';
    if (score >= 60) return 'text-primary';
    return 'text-secondary';
  };

  return (
    <Card className="overflow-hidden hover:shadow-medium transition-all duration-300">
      <div className="relative">
        <div className="aspect-square overflow-hidden bg-gradient-subtle">
          <img
            src={roommate.avatar}
            alt={roommate.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
          <span className={`font-bold text-lg ${getVibeColor(roommate.vibeScore)}`}>
            {roommate.vibeScore}%
          </span>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="mb-4">
          <h3 className="font-semibold text-lg">{roommate.name}</h3>
          <p className="text-muted-foreground text-sm">{roommate.age} years old</p>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Vibe Match</span>
            <span className={`text-sm font-bold ${getVibeColor(roommate.vibeScore)}`}>
              {roommate.vibeScore}%
            </span>
          </div>
          <Progress value={roommate.vibeScore} className="h-2" />
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2">
            {roommate.lifestyle.sleepSchedule === 'early' ? (
              <Sun className="w-4 h-4 text-secondary" />
            ) : (
              <Moon className="w-4 h-4 text-primary" />
            )}
            <span className="text-sm">
              {roommate.lifestyle.sleepSchedule === 'early' ? 'Early Bird' : 'Night Owl'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-accent" />
            <span className="text-sm">{roommate.lifestyle.visitors} visitors</span>
          </div>

          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-primary" />
            <span className="text-sm">{roommate.lifestyle.noise} noise level</span>
          </div>

          {roommate.lifestyle.smoking && (
            <div className="flex items-center gap-2">
              <Cigarette className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Smoker</span>
            </div>
          )}
        </div>

        <div className="flex gap-2 flex-wrap mb-4">
          {roommate.interests.slice(0, 3).map((interest, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {interest}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          <Button variant="gradient" className="flex-1">
            Connect
          </Button>
          <Button variant="outline" className="flex-1">
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoommateCard;