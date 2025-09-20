import Navbar from "@/components/Navbar";
import LifestyleQuiz from "@/components/LifestyleQuiz";
import RoommateCard from "@/components/RoommateCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, RefreshCw } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface UserAnswers {
  sleepSchedule: "early" | "late" | "moderate" | "flexible";
  partyPreference: "love" | "occasional" | "small" | "avoid" | "low" | "high" | "moderate";
  cleanliness: number;
  visitors: string;
  noise: string;
  smoking: boolean;
  pets: boolean;
  gender: "Male" | "Female" | "Other";
  religion: string;
  occupation: string;
}

interface Roommate {
  id: number;
  name: string;
  age: number;
  avatar: string;
  lifestyle: UserAnswers; 
  interests: string[];
}

const LifestyleMatch = () => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<UserAnswers | null>(null);
  const [availableRoommates, setAvailableRoommates] = useState<any[]>([]);
  const [selectedRoommates, setSelectedRoommates] = useState<any[]>([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const propertyId = Number(searchParams.get("propertyId")); // ✅ propertyId from URL
  const duration = Number(searchParams.get("duration")) || 1; // optional, if you need duration
  const navigate = useNavigate();

  const saveUserToFirestore = async (userData: {
  name: string;
  age?: number;
  vibeScore?: number;
  available?: boolean;
}) => {
  try {
    await addDoc(collection(db, "roommates"), {
      ...userData,
      available: userData.available ?? true, // default true
      createdAt: new Date(),
    });
    console.log("User saved to Firestore!");
  } catch (err) {
    console.error("Error saving user:", err);
  }
};

const sampleUser = {
  name: "Rahul",
  age: 22,
  vibeScore: 85,
  available: true,
};

<Button onClick={() => saveUserToFirestore(sampleUser)}>
  Save User
</Button>

  const potentialRoommates: Roommate[] = [
    {
      id: 1,
      name: "Harry Styles",
      age: 30,
      avatar: "https://www.billboard.com/wp-content/uploads/2022/06/harry-styles-hair-evolution-2018-billboard-1240.jpg?w=1240",
      lifestyle: {
        sleepSchedule: "early",
        partyPreference: "occasional",
        cleanliness: 8,
        visitors: "weekly",
        noise: "moderate",
        smoking: false,
        pets: false,
        gender: "Male",
        religion: "other",
        occupation: "working",
      },
      interests: ["Tech", "Gaming", "Cooking"],
    },
    {
      id: 2,
      name: "Simran Makan",
      age: 18,
      avatar: "https://i.pinimg.com/1200x/72/e3/4b/72e34b6abb7f5892bfac19dc1a7065e2.jpg",
      lifestyle: {
        sleepSchedule: "late",
        partyPreference: "love",
        cleanliness: 7,
        visitors: "daily",
        noise: "high",
        smoking: false,
        pets: true,
        gender: "Female",
        religion: "hindu",
        occupation: "student",
      },
      interests: ["Music", "Art", "Travel"],
    },
    {
      id: 3,
      name: "Taylor Swift",
      age: 35,
      avatar: "https://i.pinimg.com/1200x/60/ef/b4/60efb41131e9cac6ff144d7ced927b99.jpg",
      lifestyle: {
        sleepSchedule: "early",
        partyPreference: "small",
        cleanliness: 9,
        visitors: "monthly",
        noise: "low",
        smoking: false,
        pets: false,
        gender: "Female",
        religion: "christian",
        occupation: "working",
      },
      interests: ["Reading", "Yoga", "Movies"],
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

  const handleQuizComplete = (answers: UserAnswers) => {
    setUserAnswers(answers);
    setQuizCompleted(true);
  };

  const retakeQuiz = () => {
    setQuizCompleted(false);
    setUserAnswers(null);
  };

    useEffect(() => {
  const fetchRoommates = async () => {
    const q = query(collection(db, "roommates"), where("propertyId", "==", propertyId), where("status", "==", "available"));
    const snapshot = await getDocs(q);
    setAvailableRoommates(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };
  fetchRoommates();
}, [propertyId]);

const handleConfirmRoommates = async () => {
  for (const r of selectedRoommates) {
    await updateDoc(doc(db, "roommates", r.id), { status: "matched" });
  }
  navigate(`/properties?propertyId=${propertyId}&roommates=${selectedRoommates.length}`);
};

  // Compatibility scoring function
  const calculateCompatibility = (user: UserAnswers, roommate: Roommate) => {
    let score = 0;
    if (roommate.lifestyle.sleepSchedule === user.sleepSchedule) score += 10;
    if (roommate.lifestyle.partyPreference === user.partyPreference) score += 10;
    const cleanlinessDiff = Math.abs(roommate.lifestyle.cleanliness - user.cleanliness);
    score += Math.max(0, 10 - cleanlinessDiff * 2);
    if (roommate.lifestyle.visitors === user.visitors) score += 5;
    if (roommate.lifestyle.noise === user.noise) score += 5;
    if (roommate.lifestyle.smoking === user.smoking) score += 10;
    if (roommate.lifestyle.pets === user.pets) score += 10;
    if (roommate.lifestyle.gender === user.gender) score += 5;
    if (roommate.lifestyle.religion === user.religion) score += 5;
    if (roommate.lifestyle.occupation === user.occupation) score += 5;

    // Combine static vibeScore (70%) with lifestyle match (30%)
    return score * 0.3 + 70 * 0.7; // You can adjust 70 with any default or roomate-specific vibeScore if needed
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      
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

      <main className="container mx-auto px-4 pt-8 pb-12">
        {!quizCompleted ? (
          <div>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">AI-Powered Matching</span>
              </div>
              <h1 className="text-4xl font-bold mb-4">Find Your Vibe Match</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Answer a few questions about your lifestyle preferences and we'll match you with compatible roommates.
              </p>
            </div>
            <LifestyleQuiz onComplete={handleQuizComplete} />
          </div>
        ) : (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-sky-500">
                Your Perfect Matches
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Based on your lifestyle preferences, here are your top roommate matches
              </p>
              <Button
                className="bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center justify-center mx-auto"
                onClick={retakeQuiz}
              >
                <RefreshCw className="w-4 h-4 mr-2 animate-spin-slow" />
                Retake Quiz
              </Button>
            </div>

            {/* Lifestyle Summary */}
            {userAnswers && (
              <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-sky-50 rounded-2xl border border-border p-6 mb-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">Your Lifestyle Profile</h2>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Badge className="bg-yellow-200 text-yellow-800">{userAnswers.sleepSchedule === "early" ? "🌅 Early Bird" : "🌙 Night Owl"}</Badge>
                  <Badge className="bg-pink-200 text-pink-800">🎉 {userAnswers.partyPreference}</Badge>
                  <Badge className="bg-green-200 text-green-800">🧹 Cleanliness: {userAnswers.cleanliness}/10</Badge>
                  <Badge className="bg-blue-200 text-blue-800">👥 Visitors: {userAnswers.visitors}</Badge>
                  <Badge className="bg-orange-200 text-orange-800">🔊 Noise: {userAnswers.noise}</Badge>
                  <Badge className="bg-gray-200 text-gray-800">🚬 {userAnswers.smoking ? "Smoker" : "Non-Smoker"}</Badge>
                  <Badge className="bg-pink-100 text-pink-800">🐾 {userAnswers.pets ? "Pet Friendly" : "No Pets"}</Badge>
                  <Badge className="bg-indigo-200 text-indigo-800">🧑 {userAnswers.gender}</Badge>
                  <Badge className="bg-teal-200 text-teal-800">✝️ {userAnswers.religion}</Badge>
                  <Badge className="bg-lime-200 text-lime-800">💼 {userAnswers.occupation}</Badge>
                </div>
              </div>
            )}

            {/* Roommate Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {potentialRoommates
                .map((roommate) => {
                  if (!userAnswers) return { roommate, finalScore: 70 };
                  return { roommate, finalScore: calculateCompatibility(userAnswers, roommate) };
                })
                .sort((a, b) => b.finalScore - a.finalScore)
                .map(({ roommate, finalScore }) => (
                  <RoommateCard key={roommate.id} roommate={roommate} compatibility={finalScore} />
                ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default LifestyleMatch;
