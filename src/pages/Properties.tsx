import { useState } from "react";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin } from "lucide-react";

const Properties = () => {
  const [priceRange, setPriceRange] = useState([5000, 20000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  // Mock data
  const properties = [
    {
      id: 1,
      title: "Cozy Studio in Koramangala",
      location: "Koramangala, Bangalore",
      price: "12,000",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=400&fit=crop",
      amenities: ["WiFi", "Parking", "Meals"],
      occupancy: "Single",
      vibeScore: 85
    },
    {
      id: 2,
      title: "Modern 2BHK Flat",
      location: "Indiranagar, Bangalore",
      price: "8,500",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=400&fit=crop",
      amenities: ["WiFi", "Parking"],
      occupancy: "Twin Sharing",
      vibeScore: 92
    },
    {
      id: 3,
      title: "Premium PG with All Amenities",
      location: "HSR Layout, Bangalore",
      price: "15,000",
      image: "https://images.unsplash.com/photo-1505691723518-36a5ac3965ae?w=500&h=400&fit=crop",
      amenities: ["WiFi", "Meals", "Gym"],
      occupancy: "Single",
      vibeScore: 78
    },
    {
      id: 4,
      title: "Budget-Friendly Hostel",
      location: "Electronic City, Bangalore",
      price: "6,000",
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500&h=400&fit=crop",
      amenities: ["WiFi", "Meals"],
      occupancy: "Triple Sharing",
      vibeScore: 70
    },
    {
      id: 5,
      title: "Luxury PG Near IT Park",
      location: "Whitefield, Bangalore",
      price: "18,000",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=400&fit=crop",
      amenities: ["WiFi", "Parking", "Meals", "Gym"],
      occupancy: "Single",
      vibeScore: 88
    },
    {
      id: 6,
      title: "Student Accommodation",
      location: "Marathahalli, Bangalore",
      price: "7,500",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop",
      amenities: ["WiFi", "Meals"],
      occupancy: "Twin Sharing",
      vibeScore: 75
    }
  ];

  const amenityOptions = ["WiFi", "Parking", "Meals", "Gym", "AC", "Laundry"];

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect PG</h1>
          <p className="text-xl text-muted-foreground">
            Browse verified PGs with lifestyle-matched roommates
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card rounded-2xl border border-border p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by location or property name..."
                  className="pl-10"
                />
              </div>
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Occupancy Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="twin">Twin Sharing</SelectItem>
                <SelectItem value="triple">Triple Sharing</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="gradient" className="w-full">
              <Filter className="w-4 h-4 mr-2" />
              Apply Filters
            </Button>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <label className="text-sm font-medium mb-3 block">
              Price Range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
            </label>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              min={3000}
              max={30000}
              step={1000}
              className="w-full"
            />
          </div>

          {/* Amenities */}
          <div>
            <label className="text-sm font-medium mb-3 block">Amenities</label>
            <div className="flex flex-wrap gap-2">
              {amenityOptions.map(amenity => (
                <Badge
                  key={amenity}
                  variant={selectedAmenities.includes(amenity) ? "default" : "outline"}
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => toggleAmenity(amenity)}
                >
                  {amenity}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Properties;