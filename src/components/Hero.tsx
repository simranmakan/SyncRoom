import { Link } from "react-router-dom";
import { Users, Home, Sparkles, Heart } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&h=900&fit=crop"
          alt="Background"
          className="w-full h-full object-cover opacity-30 dark:opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white/80 dark:from-gray-900/70 dark:via-gray-900/60 dark:to-gray-900/80"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Find Your Perfect{" "}
          <span className="text-purple-600 dark:text-blue-400">Roommate</span> & Ideal
          <span className="text-pink-500 dark:text-gray-300"> PG</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Discover PGs and roommates that match your lifestyle. From early birds to night owls,
          party lovers to peace seekers – find your perfect living companion effortlessly.
        </p>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Card 1 - Find Roommates */}
          <Link
            to="/lifestyle-match"
            className="bg-gradient-to-br from-purple-400 to-pink-500 dark:from-blue-800 dark:to-gray-700 
                       rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform duration-300"
          >
            <div className="flex flex-col items-center text-white">
              <div className="bg-white/20 rounded-full p-4 mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Roommates</h3>
              <p className="text-sm text-white/90">
                Get matched with roommates who share your vibe and lifestyle.
              </p>
            </div>
          </Link>

          {/* Card 2 - Browse PGs */}
          <Link
            to="/properties"
            className="bg-gradient-to-br from-pink-400 to-purple-500 dark:from-gray-800 dark:to-blue-700 
                       rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform duration-300"
          >
            <div className="flex flex-col items-center text-white">
              <div className="bg-white/20 rounded-full p-4 mb-4">
                <Home className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse PG Listings</h3>
              <p className="text-sm text-white/90">
                Explore verified PGs with the best amenities and fair prices.
              </p>
            </div>
          </Link>

          {/* Card 3 - Smart Split */}
          <Link
            to="/smart-split"
            className="bg-gradient-to-br from-blue-400 to-purple-500 dark:from-gray-700 dark:to-gray-600 
                       rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform duration-300"
          >
            <div className="flex flex-col items-center text-white">
              <div className="bg-white/20 rounded-full p-4 mb-4">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Split</h3>
              <p className="text-sm text-white/90">
                Easily split bills and track expenses with your roommates.
              </p>
            </div>
          </Link>

          {/* Card 4 - Trusted Match */}
          <Link
            to="/roommates"
            className="bg-gradient-to-br from-purple-500 to-blue-400 dark:from-gray-800 dark:to-gray-700 
                       rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform duration-300"
          >
            <div className="flex flex-col items-center text-white">
              <div className="bg-white/20 rounded-full p-4 mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trusted Match</h3>
              <p className="text-sm text-white/90">
                Verified users ensure a safe and trustworthy roommate search.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
