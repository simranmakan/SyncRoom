import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PropertyCard from "@/components/PropertyCard";
import RoommateCard from "@/components/RoommateCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";



const Index = () => {
  const featuredProperties = [
    {
      id: 1,
      title: "Cozy Studio in Koramangala",
      location: "Koramangala, Bangalore",
      price: "12,000",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=400&fit=crop",
      amenities: ["WiFi", "Parking", "Meals"],
      occupancy: "Single",
    },
    {
      id: 2,
      title: "Modern 2BHK Flat",
      location: "Indiranagar, Bangalore",
      price: "8,500",
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=400&fit=crop",
      amenities: ["WiFi", "Parking"],
      occupancy: "Twin Sharing",
    },
    {
      id: 3,
      title: "Premium PG with All Amenities",
      location: "HSR Layout, Bangalore",
      price: "15,000",
      image:
        "https://i.pinimg.com/736x/fc/21/d3/fc21d30148fb8aa5c6290372e8a2c707.jpg",
      amenities: ["WiFi", "Meals", "Gym"],
      occupancy: "Single",
    },
  ];

  const featuredRoommates = [
    {
      id: 1,
      name: "Hansuja Arya",
      age: 18,
      avatar:
        "https://i.pinimg.com/1200x/57/5a/ef/575aef799c2566bb41f4fb96047f4713.jpg",
      vibeScore: 92,
      lifestyle: {
        sleepSchedule: "early",
        partyPreference: "occasional",
        cleanliness: 8,
        visitors: "Weekly",
        noise: "Moderate",
        smoking: false,
        pets: false,
      },
      interests: ["Tech", "Gaming", "Cooking"],
    },
    {
      id: 2,
      name: "Simran Makan",
      age: 19,
      avatar:
        "https://i.pinimg.com/1200x/72/e3/4b/72e34b6abb7f5892bfac19dc1a7065e2.jpg",
      vibeScore: 85,
      lifestyle: {
        sleepSchedule: "late",
        partyPreference: "love",
        cleanliness: 7,
        visitors: "Daily",
        noise: "High",
        smoking: false,
        pets: true,
      },
      interests: ["Music", "Art", "Travel"],
    },
    {
      id: 3,
      name: "Ridhima",
      age: 20,
      avatar:
        "https://i.pinimg.com/1200x/1a/a2/e6/1aa2e6f77a6a4d7827021a11c7b2fef3.jpg",
      vibeScore: 78,
      lifestyle: {
        sleepSchedule: "early",
        partyPreference: "small",
        cleanliness: 9,
        visitors: "Monthly",
        noise: "Low",
        smoking: false,
        pets: false,
      },
      interests: ["Reading", "Yoga", "Movies"],
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-500">
      <Navbar />
      <Hero />

      {/* Featured Properties */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-1 text-gray-900 dark:text-gray-100">
                Featured Properties
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Hand-picked PGs with the best amenities
              </p>
            </div>
            <Link to="/properties">
              <Button
                variant="outline"
                className="bg-pink-500 text-white hover:bg-pink-600 dark:bg-blue-700 dark:text-gray-100 dark:hover:bg-blue-800 transition-colors duration-300"
              >
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
            {featuredProperties.map((property, index) => (
              <div
                key={property.id}
                className={`p-1 rounded-xl transition-shadow hover:shadow-lg ${
                  index % 2 === 0
                    ? "bg-gradient-to-r from-pink-400 to-purple-500 dark:from-blue-800 dark:to-gray-700"
                    : "bg-gradient-to-r from-purple-400 to-pink-500 dark:from-gray-700 dark:to-blue-800"
                }`}
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Roommates */}
      <section className="py-10 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-1 text-gray-900 dark:text-gray-100">
                Top Vibe Matches
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Roommates with the highest compatibility scores
              </p>
            </div>
            <Link to="/roommates">
              <Button
                variant="gradient"
                className="bg-purple-500 text-white hover:bg-purple-600 dark:bg-blue-700 dark:text-gray-100 dark:hover:bg-blue-800 transition-colors duration-300"
              >
                Find Your Roommate
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredRoommates.map((roommate, index) => (
              <div
                key={roommate.id}
                className={`p-1 rounded-xl transition-shadow hover:shadow-lg ${
                  index % 2 === 0
                    ? "bg-gradient-to-r from-pink-400 to-purple-500 dark:from-blue-800 dark:to-gray-700"
                    : "bg-gradient-to-r from-purple-400 to-pink-500 dark:from-gray-700 dark:to-blue-800"
                }`}
              >
                <RoommateCard roommate={roommate} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Split Card Section */}
<section className="py-10">
  <div className="container mx-auto px-4">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-3xl font-bold mb-1 text-gray-900 dark:text-gray-100">
        Smart Split
      </h2>
      <Link to="/smart-split">
        <Button
          variant="gradient"
          className="bg-green-500 text-white hover:bg-green-600 dark:bg-green-700 dark:text-gray-100 dark:hover:bg-green-800 transition-colors duration-300"
        >
          Open Smart Split
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </Link>
    </div>
    <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
      Easily manage shared expenses with your roommates.
    </p>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <Link key={i} to="/smart-split">
          <div className="relative p-6 bg-gradient-to-r from-green-400 to-teal-500 dark:from-green-700 dark:to-green-800 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform cursor-pointer overflow-hidden">
            
            {/* Decorative Circle */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
            
            {/* Badge */}
            <div className="w-16 h-16 rounded-full bg-white/20 mb-4 flex items-center justify-center text-white font-bold text-xl backdrop-blur-md shadow-lg">
              S{i}
            </div>

            {/* Card Content */}
            <h3 className="text-xl font-semibold text-white mb-2">Split {i}</h3>
            <p className="text-white/90 text-sm">
              Quick overview of shared expenses and transactions
            </p>

            {/* Optional Icon */}
            <div className="absolute bottom-4 right-4 text-white/20 text-6xl font-bold select-none">
              💰
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
</section>

{/* About Us Section */}
<section className="py-12 bg-gray-100 dark:bg-gray-900">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
      About Us
    </h2>
    <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 mb-6">
      SyncRoom is your one-stop solution for finding the perfect PGs, roommates,
      and managing shared expenses. We simplify the whole process by bringing
      everything you need into one platform — from searching properties to
      splitting bills. Our mission is to make shared living stress-free,
      transparent, and fun!
    </p>
    <div className="flex justify-center gap-4">
      <Link to="/about">
        <Button className="bg-pink-500 text-white hover:bg-pink-600 dark:bg-pink-700 dark:hover:bg-pink-800 transition-colors">
          Learn More
        </Button>
      </Link>
      <Link to="/contact">
        <Button
          variant="outline"
          className="border-pink-500 text-pink-500 hover:bg-pink-100 dark:text-pink-400 dark:border-pink-400 dark:hover:bg-pink-800 transition-colors"
        >
          Contact Us
        </Button>
      </Link>
    </div>
  </div>
</section>


    </div>
  );
};

export default Index;