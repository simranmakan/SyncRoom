import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Wifi, Car, Utensils, Heart } from "lucide-react";

interface PropertyCardProps {
  property: {
    id: number;
    name: string;
    state: string;
    price: string;
    image: string;
    amenities: string[];
    occupancy?: string;
    vibeScore?: number;
    shared?: boolean; // ✅ Added for room sharing
  };
  booked: boolean;
  userBooked: boolean;
  onBook: (property: any) => void;
  onUnbook: (id: number) => void;
  redirectMode?: boolean; // ✅ New prop
}

const PropertyCard = ({
  property,
  booked,
  userBooked,
  onBook,
  onUnbook,
  redirectMode = false,
}: PropertyCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isShared, setIsShared] = useState(false); // ✅ State for Share Room

  // Function to render amenity icons
  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="w-4 h-4" />;
      case "parking":
        return <Car className="w-4 h-4" />;
      case "meals":
        return <Utensils className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-medium transition-all duration-300 group rounded-2xl shadow-md hover:shadow-xl bg-white dark:bg-gray-900">
      
      {/* Image & Favorite */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute top-3 right-3 p-2 
                     bg-white/90 dark:bg-gray-800 
                     backdrop-blur-sm rounded-full 
                     hover:bg-white dark:hover:bg-gray-700 
                     transition-colors"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isFavorited
                ? "fill-primary text-primary"
                : "text-muted-foreground dark:text-white"
            }`}
          />
        </button>

        {/* Vibe Score Badge */}
        {property.vibeScore && (
          <div className="absolute top-3 left-3 bg-gradient-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
            {property.vibeScore}% Vibe Match
          </div>
        )}
      </div>

      {/* Content */}
      <CardContent className="p-4">
        {/* Property Name */}
        <h3 className="font-semibold text-lg mb-2">{property.name}</h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
          <MapPin className="w-4 h-4" />
          <span>{property.state}</span>
        </div>

        {/* Price & Occupancy */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-primary">{property.price}</span>
          {property.occupancy && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {property.occupancy}
            </Badge>
          )}
        </div>

        {/* Amenities */}
        <div className="flex gap-2 flex-wrap mb-3">
          {property.amenities.map((amenity, index) => (
            <Badge
              key={index}
              variant="outline"
              className="flex items-center gap-1"
            >
              {getAmenityIcon(amenity)}
              <span>{amenity}</span>
            </Badge>
          ))}
        </div>

        {/* ✅ Share Room Toggle */}
        {property.shared && (
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id={`share-${property.id}`}
              checked={isShared}
              onChange={() => setIsShared(!isShared)}
              className="w-4 h-4 rounded"
            />
            <label
              htmlFor={`share-${property.id}`}
              className="text-sm font-medium"
            >
              Share Room
            </label>
          </div>
        )}
      </CardContent>

      {/* Booking Buttons */}
      <CardFooter className="p-4 pt-0">
        {redirectMode ? (
          <Link to="/properties" className="w-full">
            <Button className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl hover:scale-105 transition-transform">
              Book Now
            </Button>
          </Link>
        ) : !booked ? (
          <Button
            className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl hover:scale-105 transition-transform"
            onClick={() => onBook({ ...property, isShared })}
          >
            Book Now
          </Button>
        ) : (
          <div className="flex gap-2 w-full">
            {userBooked ? (
              <>
                <Button
                  className="w-1/2 bg-gray-500 text-white cursor-not-allowed"
                  disabled
                >
                  Booked
                </Button>
                <Button
                  className="w-1/2 bg-red-500 text-white hover:scale-105 transition-transform"
                  onClick={() => onUnbook(property.id)}
                >
                  Unbook
                </Button>
              </>
            ) : (
              <Button
                className="w-full bg-gray-500 text-white cursor-not-allowed"
                disabled
              >
                Booked
              </Button>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
