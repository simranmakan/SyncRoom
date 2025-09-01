import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Wifi, Car, Utensils, Heart } from "lucide-react";
import { useState } from "react";

interface PropertyCardProps {
  property: {
    id: number;
    title: string;
    location: string;
    price: string;
    image: string;
    amenities: string[];
    occupancy: string;
    vibeScore?: number;
  };
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="w-4 h-4" />;
      case 'parking':
        return <Car className="w-4 h-4" />;
      case 'meals':
        return <Utensils className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-medium transition-all duration-300 group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isFavorited ? 'fill-primary text-primary' : 'text-muted-foreground'
            }`}
          />
        </button>
        {property.vibeScore && (
          <div className="absolute top-3 left-3 bg-gradient-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
            {property.vibeScore}% Vibe Match
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
        
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
          <MapPin className="w-4 h-4" />
          <span>{property.location}</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-2xl font-bold text-primary">₹{property.price}</span>
            <span className="text-muted-foreground text-sm">/month</span>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {property.occupancy}
          </Badge>
        </div>

        <div className="flex gap-2 flex-wrap">
          {property.amenities.map((amenity, index) => (
            <Badge key={index} variant="outline" className="flex items-center gap-1">
              {getAmenityIcon(amenity)}
              <span>{amenity}</span>
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full" variant="gradient">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;