import React, { useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import RoommateCard from "@/components/RoommateCard";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import ThemeToggle from "@/components/ThemeToggle";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase";


const FindRoommates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [religionFilter, setReligionFilter] = useState("");
  const [occupationFilter, setOccupationFilter] = useState("");
  const [smokingFilter, setSmokingFilter] = useState("");
  const [petsFilter, setPetsFilter] = useState("");
  const [selectedRoommate, setSelectedRoommate] = useState<any>(null);
  const [loading, setLoading] = useState(false);
const currentUserId = "USER_123"; // Replace with real logged-in user ID later


  // Dummy Roommates Data
  const roommates = [
    {
      id: 1,
      name: "Harry Styles",
      age: 30,
      avatar:
        "https://www.billboard.com/wp-content/uploads/2022/06/harry-styles-hair-evolution-2018-billboard-1240.jpg?w=1240",
      vibeScore: 92,
      lifestyle: {
        sleepSchedule: "Early Bird",
        partyPreference: "Occasional",
        cleanliness: 8,
        visitors: "Weekly",
        noise: "Moderate",
        smoking: false,
        pets: true,
        gender: "Male",
        occupation: "Musician",
        religion: "Christianity",
      },
      interests: ["Being Kind", "Writing", "Cooking"],
    },
    {
      id: 2,
      name: "Simran Makan",
      age: 18,
      avatar:
        "https://i.pinimg.com/1200x/72/e3/4b/72e34b6abb7f5892bfac19dc1a7065e2.jpg",
      vibeScore: 85,
      lifestyle: {
        sleepSchedule: "Night Owl",
        partyPreference: "Love",
        cleanliness: 7,
        visitors: "Monthly",
        noise: "High",
        smoking: false,
        pets: false,
        gender: "Female",
        occupation: "Student",
        religion: "Atheism",
      },
      interests: ["Music", "Calligraphy", "Reading"],
    },
    {
      id: 3,
      name: "Taylor Swift",
      age: 35,
      avatar:
        "https://i.pinimg.com/1200x/60/ef/b4/60efb41131e9cac6ff144d7ced927b99.jpg",
      vibeScore: 78,
      lifestyle: {
        sleepSchedule: "Early Bird",
        partyPreference: "Small Gatherings",
        cleanliness: 9,
        visitors: "Monthly",
        noise: "Low",
        smoking: false,
        pets: true,
        gender: "Female",
        occupation: "Singer-Songwriter",
        religion: "Christianity",
      },
      interests: ["Reading", "Yoga", "Exercising"],
    },
    {
      id: 4,
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
      id: 5,
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
    {
      id: 6,
      name: "Billie Eilish",
      age: 23,
      avatar:
        "https://i.pinimg.com/736x/ac/eb/ea/acebea0c4d047906cbd1f08d2857524f.jpg",
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
    {
      id: 7,
      name: "Olivia Rodrigo",
      age: 24,
      avatar:
        "https://i.pinimg.com/1200x/04/74/10/04741033c6e3881de10a002f1c20bd28.jpg",
      vibeScore: 78,
      lifestyle: {
        sleepSchedule: "late",
        partyPreference: "small",
        cleanliness: 6,
        visitors: "Weekly",
        noise: "Moderate",
        smoking: false,
        pets: true,
      },
      interests: ["Reading", "Yoga", "Movies"],
    },
    {
    id: 8,
    name: "Chris Hemsworth",
    age: 36,
    avatar: "https://i.pinimg.com/1200x/12/bd/68/12bd68422d196305ea4873f978efe002.jpg",
    vibeScore: 85,
    lifestyle: { sleepSchedule: "late", partyPreference: "occasional", cleanliness: 8, visitors: "Weekly", noise: "Moderate", smoking: false, pets: false, gender: "Male", occupation: "Actor", religion: "Hinduism" },
    interests: ["Fitness", "Travel", "Gaming"],
  },
  {
    id: 9,
    name: "Zendaya",
    age: 24,
    avatar: "https://i.pinimg.com/1200x/4d/2f/70/4d2f708103bc0d5cb1b9225611562a83.jpg",
    vibeScore: 92,
    lifestyle: { sleepSchedule: "early", partyPreference: "low", cleanliness: 9, visitors: "Monthly", noise: "Low", smoking: true, pets: false, gender: "Female", occupation: "Actor", religion: "Atheism" },
    interests: ["Fashion", "Music", "Travel"],
  },
  {
    id: 10,
    name: "Tom Holland",
    age: 25,
    avatar: "https://i.pinimg.com/1200x/02/7d/6e/027d6eac237f848ffeadb1a9427e031a.jpg",
    vibeScore: 88,
    lifestyle: { sleepSchedule: "late", partyPreference: "moderate", cleanliness: 8, visitors: "Weekly", noise: "Moderate", smoking: true, pets: false, gender: "Male", occupation: "Actor", religion: "Christianity" },
    interests: ["Sports", "Movies", "Gaming"],
  },
  {
    id: 11,
    name: "Selena Gomez",
    age: 27,
    avatar: "https://i.pinimg.com/1200x/39/8d/3d/398d3d986b1e3055c6e9e27ea7676171.jpg",
    vibeScore: 85,
    lifestyle: { sleepSchedule: "early", partyPreference: "low", cleanliness: 9, visitors: "Monthly", noise: "Low", smoking: false, pets: true, gender: "Female", occupation: "Singer", religion: "Christianity" },
    interests: ["Music", "Art", "Cooking"],
  },
  {
    id: 12,
    name: "Shawn Mendes",
    age: 23,
    avatar: "https://i.pinimg.com/1200x/5b/8e/5d/5b8e5d6868a1fd501d8f8fb3ddc8650c.jpg",
    vibeScore: 90,
    lifestyle: { sleepSchedule: "late", partyPreference: "moderate", cleanliness: 8, visitors: "Weekly", noise: "Moderate", smoking: false, pets: false, gender: "Male", occupation: "Singer", religion: "Hinduism" },
    interests: ["Music", "Gaming", "Fitness"],
  },
  {
    id: 13,
    name: "Miley Cyrus",
    age: 28,
    avatar: "https://i.pinimg.com/1200x/a7/99/13/a79913e3bb91adef28945b5941a21524.jpg",
    vibeScore: 83,
    lifestyle: { sleepSchedule: "late", partyPreference: "high", cleanliness: 7, visitors: "Daily", noise: "High", smoking: true, pets: true, gender: "Female", occupation: "Singer", religion: "Islamic" },
    interests: ["Music", "Travel", "Art"],
  },
  {
    id: 14,
    name: "Chris Pratt",
    age: 38,
    avatar: "https://i.pinimg.com/1200x/f5/72/57/f57257195bc8f81b65360d5deb52614a.jpg",
    vibeScore: 87,
    lifestyle: { sleepSchedule: "early", partyPreference: "moderate", cleanliness: 8, visitors: "Weekly", noise: "Moderate", smoking: false, pets: false, gender: "Male", occupation: "Actor", religion: "Christianity" },
    interests: ["Fitness", "Movies", "Gaming"],
  },
  {
    id: 15,
    name: "Nicole Wallace",
    age: 26,
    avatar: "https://i.pinimg.com/1200x/25/29/9d/25299d91005c8debdb77b57946578b0c.jpg",
    vibeScore: 93,
    lifestyle: { sleepSchedule: "early", partyPreference: "low", cleanliness: 10, visitors: "Monthly", noise: "Low", smoking: false, pets: false, gender: "Female", occupation: "Fitness Trainer", religion: "Christianity" },
    interests: ["Fitness", "Travel", "Yoga"],
  },
  {
    id: 16,
    name: "Ariana Grande",
    age: 27,
    avatar: "https://i.pinimg.com/1200x/1e/57/0d/1e570d9e340cbdfba411b2d1c7d230f5.jpg",
    vibeScore: 89,
    lifestyle: { sleepSchedule: "late", partyPreference: "moderate", cleanliness: 9, visitors: "Weekly", noise: "Moderate", smoking: true, pets: true, gender: "Female", occupation: "Singer", religion: "Hinduism" },
    interests: ["Music", "Travel", "Art"],
  },
  {
    id: 17,
    name: "Leonardo DiCaprio",
    age: 45,
    avatar: "https://i.pinimg.com/1200x/fa/33/cd/fa33cd847dc223455cba305847bf0ad6.jpg",
    vibeScore: 88,
    lifestyle: { sleepSchedule: "early", partyPreference: "low", cleanliness: 9, visitors: "Monthly", noise: "Low", smoking: true, pets: false, gender: "Male", occupation: "Actor", religion: "Christianity" },
    interests: ["Movies", "Travel", "Environment"],
  },
  {
    id: 18,
    name: "Jennifer Lawrence",
    age: 30,
    avatar: "https://i.pinimg.com/1200x/6d/78/99/6d789975333929a322add98fb222405f.jpg",
    vibeScore: 85,
    lifestyle: { sleepSchedule: "late", partyPreference: "moderate", cleanliness: 8, visitors: "Weekly", noise: "Moderate", smoking: true, pets: false, gender: "Female", occupation: "Actor", religion: "Christianity" },
    interests: ["Movies", "Fitness", "Travel"],
  },
  {
    id: 19,
    name: "Will Smith",
    age: 42,
    avatar: "https://i.pinimg.com/1200x/ea/cb/9f/eacb9f9bbd125287ab710244bb83d283.jpg",
    vibeScore: 90,
    lifestyle: { sleepSchedule: "late", partyPreference: "high", cleanliness: 7, visitors: "Daily", noise: "High", smoking: true, pets: true, gender: "Male", occupation: "Actor", religion: "Christianity" },
    interests: ["Movies", "Fitness", "Music"],
  },
  {
    id: 20,
    name: "Sabrina Carpenter",
    age: 26,
    avatar: "https://i.pinimg.com/1200x/5b/cc/fa/5bccfa6db3a4ac97d06be7ab3dd65ccf.jpg",
    vibeScore: 92,
    lifestyle: { sleepSchedule: "early", partyPreference: "low", cleanliness: 9, visitors: "Monthly", noise: "Low", smoking: false, pets: false, gender: "Female", occupation: "Singer", religion: "Hinduism" },
    interests: ["Movies", "Travel", "Art"],
  },
  {
    id: 21,
    name: "Ryan Reynolds",
    age: 38,
    avatar: "https://i.pinimg.com/1200x/05/c1/dd/05c1dd76506eab064292ec3116f0005b.jpg",
    vibeScore: 87,
    lifestyle: { sleepSchedule: "late", partyPreference: "moderate", cleanliness: 8, visitors: "Weekly", noise: "Moderate", smoking: false, pets: true, gender: "Male", occupation: "Actor", religion: "Christianity" },
    interests: ["Fitness", "Gaming", "Travel"],
  },
  {
    id: 22,
    name: "Louis Tomlinson",
    age: 31,
    avatar: "https://i.pinimg.com/1200x/71/ec/e9/71ece93a28e5531331cd954a8e2ec3ca.jpg",
    vibeScore: 90,
    lifestyle: { sleepSchedule: "early", partyPreference: "low", cleanliness: 10, visitors: "Monthly", noise: "Low", smoking: false, pets: false, gender: "Male", occupation: "Singer", religion: "Christianity" },
    interests: ["Yoga", "Travel", "Books"],
  },
  {
    id: 23,
    name: "Liam Payne",
    age: 31,
    avatar: "https://i.pinimg.com/1200x/dd/e2/e6/dde2e688deae84d93be6ddf96b13719f.jpg",
    vibeScore: 85,
    lifestyle: { sleepSchedule: "late", partyPreference: "moderate", cleanliness: 8, visitors: "Weekly", noise: "Moderate", smoking: false, pets: false, gender: "Male", occupation: "Singer", religion: "Christianity" },
    interests: ["Movies", "Gaming", "Travel"],
  },
  {
    id: 24,
    name: "Megan Fox",
    age: 33,
    avatar: "https://i.pinimg.com/1200x/71/b4/a9/71b4a9dfc12c31dce223afce1e4e50e4.jpg",
    vibeScore: 88,
    lifestyle: { sleepSchedule: "late", partyPreference: "high", cleanliness: 7, visitors: "Daily", noise: "High", smoking: false, pets: true, gender: "Female", occupation: "Actor", religion: "Christianity" },
    interests: ["Fitness", "Travel", "Art"],
  },
  {
    id: 25,
    name: "Zayn Malik",
    age: 31,
    avatar: "https://i.pinimg.com/1200x/e9/09/d8/e909d8c1710b5ca4a15e9eeefddd80af.jpg",
    vibeScore: 86,
    lifestyle: { sleepSchedule: "late", partyPreference: "moderate", cleanliness: 8, visitors: "Weekly", noise: "Moderate", smoking: false, pets: false, gender: "Male", occupation: "Singer", religion: "Islamic" },
    interests: ["Farming", "Gaming", "Music"],
  },
  {
    id: 26,
    name: "Anne Hathaway",
    age: 34,
    avatar: "https://i.pinimg.com/1200x/3c/ca/dc/3ccadc038921aa5e540b5e90175215dd.jpg",
    vibeScore: 91,
    lifestyle: { sleepSchedule: "early", partyPreference: "low", cleanliness: 10, visitors: "Monthly", noise: "Low", smoking: false, pets: false, gender: "Female", occupation: "Actor", religion: "Islamic" },
    interests: ["Books", "Travel", "Movies"],
  },
  {
    id: 27,
    name: "Niall Horan",
    age: 31,
    avatar: "https://i.pinimg.com/1200x/e3/e0/f6/e3e0f67a040e7a68650621c73f74f0d2.jpg",
    vibeScore: 87,
    lifestyle: { sleepSchedule: "late", partyPreference: "moderate", cleanliness: 8, visitors: "Weekly", noise: "Moderate", smoking: false, pets: true, gender: "Male", occupation: "Singer", religion: "Atheism" },
    interests: ["Fitness", "Adventure", "Travel"],
  },
  {
    id: 28,
    name: "Alia Bhatt",
    age: 32,
    avatar: "https://i.pinimg.com/1200x/7b/01/c3/7b01c36c06ed8fcf159a8e0fda0db656.jpg",
    vibeScore: 89,
    lifestyle: { sleepSchedule: "early", partyPreference: "moderate", cleanliness: 9, visitors: "Weekly", noise: "Moderate", smoking: false, pets: false, gender: "Female", occupation: "Actor", religion: "Hinduism" },
    interests: ["Acting", "Travel", "Fashion"],
  },
  {
    id: 29,
    name: "Varun Dhawan",
    age: 36,
    avatar: "https://i.pinimg.com/1200x/b3/be/b8/b3beb84208060a6e653f19c15919081e.jpg",
    vibeScore: 94,
    lifestyle: { sleepSchedule: "early", partyPreference: "low", cleanliness: 10, visitors: "Monthly", noise: "Low", smoking: false, pets: false, gender: "Male", occupation: "Actor", religion: "Hinduism" },
    interests: ["Fitness", "Movies", "Motivation"],
  },
  {
    id: 30,
    name: "Kylie Jenner",
    age: 23,
    avatar: "https://i.pinimg.com/1200x/86/02/b6/8602b6e399fc87be9a03cd5d4f2dd136.jpg",
    vibeScore: 88,
    lifestyle: { sleepSchedule: "late", partyPreference: "high", cleanliness: 8, visitors: "Daily", noise: "High", smoking: true, pets: true, gender: "Female", occupation: "Entrepreneur", religion: "Hinduism" },
    interests: ["Fashion", "Business", "Travel"],
  },
    
];
  // Filters + Search
  const filteredRoommates = roommates.filter((rm) => {
    const normalize = (str: any) => str.toString().toLowerCase().trim();
    const matchesSearchTerm =
      rm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      normalize(rm.lifestyle.gender).includes(normalize(searchTerm)) ||
      normalize(rm.lifestyle.occupation).includes(normalize(searchTerm)) ||
      normalize(rm.lifestyle.religion).includes(normalize(searchTerm)) ||
      normalize(rm.lifestyle.partyPreference).includes(normalize(searchTerm)) ||
      normalize(rm.lifestyle.sleepSchedule).includes(normalize(searchTerm)) ||
      normalize(rm.lifestyle.visitors).includes(normalize(searchTerm)) ||
      normalize(rm.lifestyle.noise).includes(normalize(searchTerm));

    const genderMatch = genderFilter ? rm.lifestyle.gender === genderFilter : true;
    const religionMatch = religionFilter ? rm.lifestyle.religion === religionFilter : true;
    const occupationMatch = occupationFilter ? rm.lifestyle.occupation === occupationFilter : true;
    const smokingMatch = smokingFilter
      ? rm.lifestyle.smoking === (smokingFilter === "Yes")
      : true;
    const petsMatch = petsFilter ? rm.lifestyle.pets === (petsFilter === "Yes") : true;

    return matchesSearchTerm && genderMatch && religionMatch && occupationMatch && smokingMatch && petsMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-950 transition-colors duration-500">
      
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-900 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-purple-600 dark:text-purple-400">
            SyncRoom
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-purple-600">
              Home
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 dark:from-blue-800 dark:to-purple-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-10 flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl font-extrabold tracking-tight mb-2">Trusted Roommates</h1>
          <p className="text-lg opacity-90 max-w-2xl">Browse and connect with our highly rated roommates</p>
        </div>
      </div>

      {/* Filters + Search */}
      <div className="container mx-auto px-4 mt-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Search by name, gender, religion, occupation, etc..."
            className="flex-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100" value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <select className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100" value={religionFilter} onChange={(e) => setReligionFilter(e.target.value)}>
            <option value="">All Religions</option>
            <option value="Christianity">Christianity</option>
            <option value="Hinduism">Hinduism</option>
            <option value="Atheism">Atheism</option>
            <option value="Atheism">Islam</option>
            <option value="Other">Other</option>
          </select>
          <select className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100" value={occupationFilter} onChange={(e) => setOccupationFilter(e.target.value)}>
            <option value="">All Occupations</option>
            <option value="Musician">Musician</option>
            <option value="Student">Student</option>
            <option value="Actor">Actor</option>
            <option value="Work Professional">Work Professional</option>
            <option value="Freelancer">Freelancer</option>
            <option value="Singer-Songwriter">Singer-Songwriter</option>
          </select>
          <select className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100" value={smokingFilter} onChange={(e) => setSmokingFilter(e.target.value)}>
            <option value="">Smoking</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <select className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100" value={petsFilter} onChange={(e) => setPetsFilter(e.target.value)}>
            <option value="">Pets</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Roommate Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRoommates.length > 0 ? (
            filteredRoommates.map((rm) => (
              <RoommateCard key={rm.id} roommate={rm} onViewProfile={() => setSelectedRoommate(rm)} />
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">No roommates found with those filters.</p>
          )}
        </div>
      </div>

      {/* Profile Popup */}
      {selectedRoommate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-lg w-full relative">
            <button onClick={() => setSelectedRoommate(null)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300">
              <X className="w-6 h-6" />
            </button>

            <div className="text-center">
              <img src={selectedRoommate.avatar} alt={selectedRoommate.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-md" />
              <h2 className="text-2xl font-bold dark:text-gray-100">{selectedRoommate.name}</h2>
              <p className="text-gray-500 dark:text-gray-400">{selectedRoommate.age} years old</p>
            </div>

            <div className="mt-6 space-y-2 text-gray-700 dark:text-gray-200">
              <p><strong>Gender:</strong> {selectedRoommate.lifestyle.gender}</p>
              <p><strong>Occupation:</strong> {selectedRoommate.lifestyle.occupation}</p>
              <p><strong>Religion:</strong> {selectedRoommate.lifestyle.religion}</p>
              <p><strong>Smoking:</strong> {selectedRoommate.lifestyle.smoking ? "Yes" : "No"}</p>
              <p><strong>Pets:</strong> {selectedRoommate.lifestyle.pets ? "Yes" : "No"}</p>
              <p><strong>Sleep Schedule:</strong> {selectedRoommate.lifestyle.sleepSchedule}</p>
              <p><strong>Party Preference:</strong> {selectedRoommate.lifestyle.partyPreference}</p>
              <p><strong>Cleanliness:</strong> {selectedRoommate.lifestyle.cleanliness}/10</p>
              <p><strong>Visitors:</strong> {selectedRoommate.lifestyle.visitors}</p>
              <p><strong>Noise Level:</strong> {selectedRoommate.lifestyle.noise}</p>
              <p><strong>Interests:</strong> {selectedRoommate.interests.join(", ")}</p>

              <div className="flex gap-2 mt-4">
                <Button
                  className="flex-1 bg-purple-600 text-white hover:bg-purple-700"
                >
                  Connect
                </Button>
                <Button className="flex-1 variant-outline" onClick={() => setSelectedRoommate(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default FindRoommates;