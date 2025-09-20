import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Sun, Moon, Volume2, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Firebase
import { db } from "@/firebase"; 
import { doc, getDoc, setDoc } from "firebase/firestore";

interface RoommateCardProps {
  roommate: {
    id: string;
    name: string;
    age: number;
    avatar: string;
    lifestyle: {
      sleepSchedule: string;
      partyPreference: string;
      cleanliness: number;
      visitors: string;
      noise: string;
      smoking: boolean;
      pets: boolean;
      gender: string;
      occupation: string;
      religion: string;
    };
    interests: string[];
  };
  compatibility: number;
  currentUserId: string;
}

const RoommateCard = ({ roommate, compatibility, currentUserId }: RoommateCardProps) => {
  const [openProfile, setOpenProfile] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [openLetsBeRoommates, setOpenLetsBeRoommates] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [isRoommateSelected, setIsRoommateSelected] = useState(false);
  const [bookedRoommateId, setBookedRoommateId] = useState(null);


  const [messages, setMessages] = useState<{ text: string; self: boolean; delivered?: boolean }[]>([]);
  const [chatMessage, setChatMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const checkBooked = async () => {
      const docRef = doc(db, "roommates", roommate.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.booked) console.log("Already booked!");
      }
    };
    checkBooked();
  }, [roommate.id]);

  const getVibeColor = (score: number) => {
    if (score >= 80) return "text-accent";
    if (score >= 60) return "text-primary";
    return "text-secondary";
  };

  const sendMessage = () => {
    if (!chatMessage.trim()) return;

    setMessages(prev => [...prev, { text: chatMessage, self: true, delivered: true }]);
    setChatMessage("");

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { text: `Hey! ${roommate.name} here, got your message!`, self: false }
      ]);
    }, 700);
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-medium transition-all duration-300 min-h-[450px] flex flex-col justify-between bg-white dark:bg-gray-800">
        <div className="relative">
          <div className="aspect-square overflow-hidden bg-gradient-subtle">
            <img src={roommate.avatar} alt={roommate.name} className="w-full h-full object-cover" />
          </div>
          <div className="absolute top-3 right-3 bg-white/90 dark:bg-purple-200/90 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="font-bold text-lg text-purple-700">
              {Math.round(compatibility)}%
            </span>
          </div>
        </div>

        <CardContent className="p-4 flex flex-col justify-between h-full">
          <div>
            <div className="mb-3">
              <h3 className="font-semibold text-lg">{roommate.name}</h3>
              <p className="text-muted-foreground text-sm">{roommate.age} years old</p>
            </div>

            {/* Vibe Match */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Vibe Match</span>
                <span className={`text-sm font-bold ${getVibeColor(compatibility)}`}>
                  {Math.round(compatibility)}%
                </span>
              </div>
              <Progress value={compatibility} className="h-2" />
            </div>

            {/* Lifestyle Info */}
            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-2">
                {roommate.lifestyle.sleepSchedule === "early" ? (
                  <Sun className="w-4 h-4 text-secondary" />
                ) : (
                  <Moon className="w-4 h-4 text-primary" />
                )}
                <span className="text-sm">
                  {roommate.lifestyle.sleepSchedule === "early" ? "Early Bird" : "Night Owl"}
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
            </div>

            {/* Interests */}
            <div className="flex gap-2 flex-wrap mb-3">
              {roommate.interests.slice(0, 3).map((interest, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 mb-3">
            <Button
              className="flex-1 bg-purple-600 text-white hover:bg-purple-700"
              onClick={() => setOpenChat(true)}
            >
              Connect
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setOpenProfile(true)}
            >
              View Profile
            </Button>
          </div>

          {/* Let's Be Roommates Button */}
         <div className="flex gap-2">
  {/* Main Roommate Button */}
  <Button
    disabled={isRoommateSelected}
    className={`flex-1 ${
      isRoommateSelected
        ? "bg-gray-500 cursor-not-allowed"
        : "bg-green-500 hover:bg-green-600"
    } text-white`}
    onClick={() => {
      if (!isRoommateSelected) {
        setOpenLetsBeRoommates(true);
      }
    }}
  >
    {isRoommateSelected ? "Oops! Already found my vibe" : "Be My Roommate"}
  </Button>

  {/* Remove Roommate Button - only show when booked */}
  {isRoommateSelected && (
    <Button
      className="flex-1 bg-red-500 text-white hover:bg-red-600"
      onClick={() => setIsRoommateSelected(false)}
    >
      Remove
    </Button>
  )}
</div>
        </CardContent>
      </Card>

      {/* View Profile Modal */}
      <Dialog open={openProfile} onOpenChange={setOpenProfile}>
        <DialogContent className="max-w-xl p-5">
          <DialogHeader>
            <DialogTitle>{roommate.name}'s Profile</DialogTitle>
          </DialogHeader>
          <div className="flex gap-4">
            <div className="w-1/3 rounded-full overflow-hidden">
              <img
                src={roommate.avatar}
                alt={roommate.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-2 text-sm">
              <p><strong>Age:</strong> {roommate.age}</p>
              <p><strong>Gender:</strong> {roommate.lifestyle.gender}</p>
              <p><strong>Occupation:</strong> {roommate.lifestyle.occupation}</p>
              <p><strong>Religion:</strong> {roommate.lifestyle.religion}</p>
              <p>
                <strong>Sleep Schedule:</strong>{" "}
                {roommate.lifestyle.sleepSchedule === "early" ? "Early Bird" : "Night Owl"}
              </p>
              <p><strong>Party Preference:</strong> {roommate.lifestyle.partyPreference}</p>
              <p><strong>Cleanliness:</strong> {roommate.lifestyle.cleanliness}/10</p>
              <p><strong>Visitors:</strong> {roommate.lifestyle.visitors}</p>
              <p><strong>Noise Level:</strong> {roommate.lifestyle.noise}</p>
              <p><strong>Smoking:</strong> {roommate.lifestyle.smoking ? "Yes" : "No"}</p>
              <p><strong>Pets:</strong> {roommate.lifestyle.pets ? "Yes" : "No"}</p>
              <div>
                <strong>Interests:</strong>{" "}
                {roommate.interests.map((i, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs mr-1">
                    {i}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

    {/* Let's Be Roommates Modal */}
<Dialog open={openLetsBeRoommates} onOpenChange={setOpenLetsBeRoommates}>
  <DialogContent className="max-w-sm p-6 text-center bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 rounded-2xl shadow-2xl border border-purple-200">
    <DialogHeader className="flex flex-col items-center">
      {/* Avatar */}
      <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-purple-300 shadow-lg">
        <img
          src={roommate.avatar}
          alt={roommate.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title */}
      <DialogTitle className="text-2xl font-bold text-purple-700 mb-2 animate-pulse">
        Wanna be my roommate?
      </DialogTitle>

      {/* Subtitle */}
      <p className="text-gray-700 text-sm mb-6">
        {roommate.name} thinks you might vibe well together!
      </p>
    </DialogHeader>

    {/* Action Button */}
    <DialogFooter className="flex justify-center">
      <Button
        className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-full shadow-lg hover:bg-purple-700 hover:scale-105 transform transition-all duration-300"
        onClick={() => {
          setOpenLetsBeRoommates(false);
          setOpenSuccessDialog(true);
          setIsRoommateSelected(true);
        }}
      >
        Yesss
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>



      {/* Success Dialog */}
<Dialog open={openSuccessDialog} onOpenChange={setOpenSuccessDialog}>
  <DialogContent className="max-w-sm p-6 text-center bg-gradient-to-tr from-green-200 via-yellow-200 to-pink-200 rounded-2xl shadow-2xl border border-green-300 animate-fadeIn">
    <DialogHeader className="flex flex-col items-center">
      {/* Avatar */}
      <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg">
        <img
          src={roommate.avatar}
          alt={roommate.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Celebration Title */}
      <h2 className="text-2xl font-bold text-green-700 mb-2 animate-pulse">
        Yayy!! Vibe Partners Now..
      </h2>

      {/* Subtitle */}
      <p className="text-gray-700 text-sm mb-6">
        You found the vibe with <strong>{roommate.name}</strong>! 
      </p>
    </DialogHeader>

    {/* Close Button */}
    <DialogFooter className="flex justify-center">
      <Button
        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow-lg hover:bg-green-700 hover:scale-105 transform transition-all duration-300"
        onClick={() => setOpenSuccessDialog(false)}
      >
        Close
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

      {/* Chat Modal */}
      <Dialog open={openChat} onOpenChange={setOpenChat}>
        <DialogContent className="max-w-md p-4">
          <DialogHeader>
            <DialogTitle>{roommate.name} Chat</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2 h-80 overflow-y-auto border rounded-lg p-3 bg-gray-50 dark:bg-gray-900">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.self ? "justify-end" : "justify-start"} items-end`}
              >
                {!msg.self && (
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                    <img
                      src={roommate.avatar}
                      alt={roommate.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div
                  className={`px-3 py-2 rounded-lg shadow-md max-w-[70%] break-words ${
                    msg.self ? "bg-purple-600 text-white" : "bg-gray-300 text-black"
                  }`}
                >
                  {msg.text}
                  {msg.delivered && msg.self && (
                    <span className="ml-1 text-xs text-gray-300">✔✔</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              className="flex-1 border rounded-lg px-2 py-1 focus:outline-none"
              placeholder="Type a message"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button onClick={sendMessage}>Send</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RoommateCard;