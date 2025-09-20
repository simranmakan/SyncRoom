import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";

// Firebase imports
import { db, auth } from "@/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";


// ✅ Properties data
const properties = [
  {
    id: 1,
    name: "Sunrise PG for Girls",
    state: "Delhi",
    price: "₹2000 / day",
    image:
      "https://i.pinimg.com/1200x/7c/a9/67/7ca9672f8712ad6d00feca75a53e7731.jpg",
    amenities: ["WiFi", "AC", "Food Included"],
    shared: true,
  },
  {
    id: 2,
    name: "Cozy 2BHK Flat",
    state: "Bengaluru",
    price: "₹5000 / day",
    image:
      "https://i.pinimg.com/1200x/3a/be/47/3abe472af8df77ea6514b401cc4fa3df.jpg",
    amenities: ["Fully Furnished", "Balcony", "Parking"],
    shared: false,
  },
  {
    id: 3,
    name: "Student Hostel",
    state: "Punjab",
    price: "₹7000 / day",
    image:
      "https://i.pinimg.com/1200x/3a/7d/26/3a7d262291dfb806a5e5b3fa0fac4883.jpg",
    amenities: ["Mess", "Laundry", "24x7 Security"],
    shared: true,
  },
   {
      id: 4,
      name: "Cozy Studio in Koramangala",
      state: "Koramangala, Bangalore",
      price: "9,000 / day",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=400&fit=crop",
      amenities: ["WiFi", "Parking", "Meals", "Gym"],
      shared: false,
    },
    {
      id: 5,
      name: "Modern 2BHK Flat",
      state: "Bangalore",
      price: "8,500 / day",
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=400&fit=crop",
      amenities: ["WiFi", "Parking", "Balcony"],
    shared: true,
    },
    {
      id: 6,
      name: "Premium PG with All Amenities",
      state: "Bangalore",
      price: "10,000 / day",
      image:
        "https://i.pinimg.com/736x/fc/21/d3/fc21d30148fb8aa5c6290372e8a2c707.jpg",
      amenities: ["WiFi", "Meals", "Gym", "Ac", "Laundry"],
      shared: false,
    },
  {
    id: 7,
    name: "Harbor View Apartments",
    state: "Mumbai",
    price: "₹3,000 / day",
    image:
      "https://i.pinimg.com/1200x/f7/6b/84/f76b84e47fb8e61796b79e92541303a0.jpg",
    amenities: ["Beach View", "Balcony", "Gym", "24x7 Security"],
    shared: true,
  },
  {
    id: 8,
    name: "Riverside Bungalow",
    state: "Kolkata",
    price: "₹8,000 / day",
    image:
      "https://i.pinimg.com/1200x/20/d9/26/20d926d7faffb0baeed37a84e02687b6.jpg",
    amenities: ["Forest View ", "Parking", "Mess"],
    shared: false,
  },
  {
    id: 9,
    name: "Modern Studio Flat",
    state: "Chennai",
    price: "₹10,000 /day",
    image:
      "https://i.pinimg.com/1200x/98/cf/3f/98cf3f392cbc8447cd174ac6adebf99e.jpg",
    amenities: ["Gym", "WiFi", "Ac", "Parking", "Laundry"],
    shared: true,
  },
  {
    id: 10,
    name: "Heritage Home Stay",
    state: "Jaipur",
    price: "₹9,500 / day",
    image:
      "https://i.pinimg.com/1200x/c6/dc/c2/c6dcc2f4bae3a00b749cb928d3fa3925.jpg",
    amenities: ["Balcony", "Food Included", "Parking"],
    shared: false,
  },
  {
    id: 11,
    name: "Hill View Cottage",
    state: "Manali",
    price: "₹10,000 / day",
    image:
      "https://i.pinimg.com/1200x/6b/d0/53/6bd05313d44d6d138fc884af0cbe2418.jpg",
    amenities: ["Beach View", "Balcony", "Food Included", "Mess"],
    shared: true,
  },
  {
    id: 12,
    name: "Lakefront Villa",
    state: "Kerala",
    price: "₹8,000 / day",
    image:
      "https://i.pinimg.com/1200x/76/79/4a/76794a01ff3b731645931d77ab697ba8.jpg",
    amenities: ["Wifi", "Food Included", "Forest View", "Parking"],
    shared : true ,
  },
  {
    id: 13,
    name: "Beachside Cottage",
    state: "Goa",
    price: "₹8,500 / day",
    image:
      "https://i.pinimg.com/1200x/32/02/74/320274ca9047c6a60c20f02823947645.jpg",
    amenities: ["Beach View", "Balcony", "WiFi","Balcony"],
    shared: true,
  },
  {
    id: 14,
    name: "Snow Peak Cabin",
    state: "Shimla",
    price: "₹4,000 / day",
    image:
      "https://i.pinimg.com/1200x/4f/03/31/4f03316d39477d18b7484165aa824b07.jpg",
    amenities: ["Mountain View", "Balcony", "Food Included", "Parking"],
    shared: true,
  },
  {
    id: 15,
    name: "Urban Loft",
    state: "Pune",
    price: "₹3,000 / day",
    image:
      "https://i.pinimg.com/1200x/44/1b/3c/441b3c22b514c07adbc8c95677260e7b.jpg",
    amenities: ["Mess", "Wifi", "Furnished"],
    shared: true,
  },
  {
    id: 16,
    name: "Desert Villa",
    state: "Rajasthan",
    price: "₹4,000 / day",
    image:
      "https://i.pinimg.com/1200x/3b/fe/a9/3bfea9561a8adef69ad9d9a53d5e3aae.jpg",
    amenities: ["Parking", "Ac", "Laundry"],
    shared: true,
  },
  {
    id: 17,
    name: "Backpacker Hostel",
    state: "Goa",
    price: "₹2,500 / day",
    image:
      "https://i.pinimg.com/1200x/b8/f7/a4/b8f7a4349352eb9ed0ed4bcf1948e4f2.jpg",
    amenities: ["Beach View", "Balcony", "WiFi"],
    shared: true,
  },
  {
    id: 18,
    name: "Countryside Farmhouse",
    state: "Uttar Pradesh",
    price: "₹2,600 / day",
    image:
      "https://i.pinimg.com/1200x/00/a4/49/00a4490e33dcc9d22e6d9d86cf5ac260.jpg",
    amenities: ["Forest view", "Parking", "Food Included"],
    shared: true,
  },
  {
    id: 19,
    name: "Penthouse Suite",
    state: "Hyderabad",
    price: "₹8,000 / day",
    image:
      "https://i.pinimg.com/1200x/43/23/12/43231256a2dbdee4ea25684ed1f8a04d.jpg",
    amenities: ["Ac", "Parking", "Gym", "Laundry"],
    shared: true,
  },
  {
    id: 20,
    name: "Classic Colonial House",
    state: "Kolkata",
    price: "₹8,700 / day",
    image:
      "https://i.pinimg.com/1200x/3b/06/1e/3b061e9e824512135602e6997ecacfe5.jpg",
    amenities: ["Mess", "Balcony", "Food Included", "Gym", "Parking"],
    shared: true,
  },
  {
    id: 21,
    name: "Studio Workspace",
    state: "Bengaluru",
    price: "₹8,000 / day",
    image:
      "https://i.pinimg.com/1200x/6c/e5/0b/6ce50b7305068df9ebc2d3a4da399168.jpg",
    amenities: ["Ac", "Parking", "Wifi", "Gym", "Balcony"],
    shared: false,
  },
  {
    id: 22,
    name: "Historic Mansion",
    state: "Uttar Pradesh",
    price: "₹6,000 / day",
    image:
      "https://i.pinimg.com/1200x/fc/a5/b4/fca5b47a39d9db5b6c3090f4624fc47e.jpg",
    amenities: ["Balcony", "Parking", "Wifi", "Forest View"],
    shared: false,
  },
  {
    id: 23,
    name: "Suburban House",
    state: "Maharashtra",
    price: "₹9,500 / day",
    image:
      "https://i.pinimg.com/1200x/c3/01/e5/c301e569869464f77bdfd92283dd1bd6.jpg",
    amenities: ["Balcony", "Wifi", "Ac", "Parking", "Laundry"],
    shared: false,
  },
  {
    id: 24,
    name: "Mountain Retreat",
    state: "Sikkim",
    price: "₹5,000 / day",
    image:
      "https://i.pinimg.com/1200x/7c/41/a1/7c41a1326daf67656496d17bc16b9b24.jpg",
    amenities: ["Forest View", "Parking", "Wifi", "Food Included", "Laundry"],
    shared: false,
  },
  {
    id: 25,
    name: "Riverbank Cabin",
    state: "Assam",
    price: "₹8,500 / day",
    image:
      "https://i.pinimg.com/1200x/79/38/3f/79383fea96d7dcfe0e9ec0db87fd4606.jpg",
    amenities: ["Balcony", "Laundry", "WiFi", "Ac", "Food Included"],
    shared: false,
  },
  {
    id: 26,
    name: "Gated Community Apartment",
    state: "Chandigarh",
    price: "₹6,000 / day",
    image:
      "https://i.pinimg.com/1200x/81/58/09/8158095e6494c5360c0a1989a1b115d4.jpg",
    amenities: ["Parking", "AC", "Gym", "Mess"],
    shared: false,
  },
  {
    id: 27,
    name: "Luxury Flat Downtown",
    state: "Lucknow",
    price: "₹8,000 / day",
    image:
      "https://i.pinimg.com/1200x/a7/7d/a5/a77da5e2194b932441f2c9a52aade7c9.jpg",
    amenities: ["Balcony", "Ac", "Parking", "Wifi"],
    shared: false,
  },
  {
    id: 28,
    name: "Modern Duplex",
    state: "Ahmedabad",
    price: "₹9,500 / day",
    image:
      "https://i.pinimg.com/1200x/10/4e/ce/104ece2623a890006521d62256f4983b.jpg",
    amenities: ["Balcony", "Ac", "Wifi", "Parking", "Laundry"],
    shared: false,
  },
  {
    id: 29,
    name: "Cozy Cottage",
    state: "Rajasthan",
    price: "₹5,500 / day",
    image:
      "https://i.pinimg.com/1200x/0a/62/6c/0a626c6cf322ba1c2e8a3d52234bffa8.jpg",
    amenities: ["Ac", "Food Included", "Mess", "Wifi"],
    shared: false,
  },
  {
    id: 30,
    name: "Skyscraper Apartment",
    state: "Mumbai",
    price: "₹8,000 / day",
    image:
      "https://i.pinimg.com/1200x/ea/cb/cb/eacbcb879339222a5482abacb534065b.jpg",
    amenities: ["Gym", "Ac", "Parking", "Laundry", "Mess"],
    shared: false,
  },
  {
    id: 31,
    name: "Beachfront Resort",
    state: "Kerala",
    price: "₹5,000 / day",
    image:
      "https://i.pinimg.com/1200x/fd/24/f7/fd24f7618315267be4c3c1f137b07ba5.jpg",
    amenities: ["Forest View", "Ac", "Parking", "Laundry"],
    shared: true,
  },
  {
    id: 32,
    name: "Penthouse Overlooking Hills",
    state: "Dehradun",
    price: "₹3,800 / day",
    image:
      "https://i.pinimg.com/1200x/c7/ca/cd/c7cacd7df4bb0c94783417d495e1c0e9.jpg",
    amenities: ["Balcony", "Laundry", "Mess", "Wifi"],
    shared: true,
  },
  {
    id: 33,
    name: "Rustic Cabin",
    state: "Goa",
    price: "₹6,000 / day",
    image:
      "https://i.pinimg.com/1200x/44/44/c5/4444c5d94b77b9037ac3935ae2fdf498.jpg",
    amenities: ["Beach View", "Parking", "Food Included", "Ac"],
    shared: true,
  },
  {
    id: 34,
    name: "City Center Apartment",
    state: "Delhi",
    price: "₹3,000 / day",
    image:
      "https://i.pinimg.com/1200x/a3/90/4b/a3904b49af88b04fe6d93fbe9f6fbb62.jpg",
    amenities: ["Wifi", "Ac", "Parking"],
    shared: true,
  },
  {
    id: 35,
    name: "Green Farm Stay",
    state: "Uttrakhand",
    price: "₹6,000 / day",
    image:
      "https://i.pinimg.com/1200x/a1/fd/a8/a1fda84e0164af46033f89b3c0c228a3.jpg",
    amenities: ["Forest View", "Balcony", "Parking", "Wifi", "Food Included"],
    shared: true,
  },
  {
    id: 36,
    name: "Shoreline Villa",
    state: "Goa",
    price: "₹4,500 / day",
    image:
      "https://i.pinimg.com/1200x/fd/70/b0/fd70b06d4caa7623bcda02e0bf9d1b78.jpg",
    amenities: ["Balcony", "Parking", "Beach View", "Wifi"],
    shared: true,
  },
  {
    id: 37,
    name: "Ice Mountain Lodge",
    state: "Ladakh",
    price: "₹8,000 / day",
    image:
      "https://i.pinimg.com/1200x/4f/09/6e/4f096e800957b0c9adeba122df1774c0.jpg",
    amenities: ["Mountain View", "Wifi", "Parking", " Food Included"],
    shared: true,
  },
  {
    id: 38,
    name: "Jungle Retreat",
    state: "Uttar Pradesh",
    price: "₹7,200 / day",
    image:
      "https://i.pinimg.com/1200x/5d/90/87/5d90872309cee14caf1f25ed91b72404.jpg",
    amenities: ["Forest View", "Balcony", "Wifi", "Parking", "Food Included"],
    shared: true,
  },
  {
    id: 39,
    name: "Boutique Hotel Room",
    state: "Sikkim",
    price: "₹7,000 / day",
    image:
      "https://i.pinimg.com/1200x/3f/e3/f5/3fe3f507e4f7999029d4e2f94a245e5e.jpg",
    amenities: ["Ac", "Mountain View", "Wifi", "Laundry", "Mess"],
    shared: true,
  },
  {
    id: 40,
    name: "Compact Studio",
    state: "Jammu & Kashmir",
    price: "₹10,000 / day",
    image:
      "https://i.pinimg.com/1200x/e4/c9/0c/e4c90c204f0ed8af4efab30d1cea4a58.jpg",
    amenities: ["Parking", "Mess", "WiFi","Forest View", "Food Included" ],
    shared: true,
  },
  {
    id: 41,
    name: "Luxury High Rise",
    state: "Bengaluru",
    price: "₹5,500 / day",
    image:
      "https://i.pinimg.com/1200x/e6/c0/bd/e6c0bd986fb5161703dcb0beba04c446.jpg",
    amenities: ["Parking", "Gym", "Balcony", "Food Included"],
    shared: false,
  },
  {
    id: 42,
    name: "Heritage Cottage",
    state: "Rajasthan",
    price: "₹5,000 / day",
    image:
      "https://i.pinimg.com/1200x/99/be/38/99be380203bf8ed73e19ccf598d87636.jpg",
    amenities: ["Ac", "Parking", "Food Included", "Laundry"],
    shared: false,
  },
  {
    id: 43,
    name: "Eco Home",
    state: "Kerala",
    price: "₹8,500 / day",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    amenities: ["Food Included", "Ac", "Balcony", "Mess"],
    shared: false,
  },
  {
    id: 44,
    name: "Compact Family Home",
    state: "Punjab",
    price: "₹5,000 / day",
    image:
      "https://i.pinimg.com/1200x/9a/20/c0/9a20c026f1d9eb0363fb845a6ce47dcb.jpg",
    amenities: ["Food Included", "Balcony", "Ac", "Parking"],
    shared: false,
  },
  {
    id: 45,
    name: "Rooftop Penthouse",
    state: "Delhi",
    price: "₹4,900 / day",
    image:
      "https://i.pinimg.com/1200x/af/ab/15/afab157b0700177e317f5393b7928690.jpg",
    amenities: ["Wifi", "Balcony", "Laundry", "Ac"],
    shared: false,
  },
  {
    id: 46,
    name: "Safari Lodge",
    state: "Rajasthan",
    price: "₹3,500 / day",
    image:
      "https://i.pinimg.com/1200x/37/75/d6/3775d607cf9d812101b3db20f0190aa8.jpg",
    amenities: ["Wifi", "Parking", "Ac"],
    shared: false,
  },
  {
    id: 47,
    name: "Studio in Old Town",
    state: "Kolkata",
    price: "₹10,000 / day",
    image:
      "https://i.pinimg.com/1200x/dd/f8/9e/ddf89e41ce5faab554c267a619e3d333.jpg",
    amenities: ["Wifi", "Ac", "Parking", "Gym", "Food Included"],
    shared: true,
  },
  {
    id: 48,
    name: "Hill Side Apartment",
    state: "Uttarakhand",
    price: "₹8,500 / day",
    image:
      "https://i.pinimg.com/1200x/63/2e/11/632e114b64e6db55f86baa291a46463d.jpg",
    amenities: ["Forest View", "Balcony", "Food Included"],
    shared: false,
  },
  {
    id: 49,
    name: "River View Apartment",
    state: "Goa",
    price: "₹9,200 / day",
    image:
      "https://i.pinimg.com/1200x/4e/de/fc/4edefc2a1470c84cda8a5aef5437dbaf.jpg",
    amenities: ["Balcony", "Beach view", "WiFi","Laundry", "Mess" ,"Food Included"],
    shared: true,
  },
  {
    id: 50,
    name: "Loft Studio",
    state: "Gujarat",
    price: "₹10,000 / day",
    image:
      "https://i.pinimg.com/1200x/58/25/e7/5825e75e1b8eba098ab8c5be76445055.jpg",
    amenities: ["Ac", "Parking", "Wifi", "Gym", "Food Included"],
    shared: false,
  },
];

const amenitiesList = [
    "WiFi",
    "AC",
    "Gym",
    "Parking",
    "Balcony",
    "Laundry",
    "Mess",
    "Meals",
    "Furnished",
    "24x7 Security",
    "Sea View",
    "Garden",
    "Pets Allowed",
    "Mountain View",
    "Beach View",
    "Forest View",
    "Elevator",
    "Snowy View",
  ];

const Properties = () => {
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  // Add at the top with other states
  const [shareRoom, setShareRoom] = useState(false); 
  const [numRoommates, setNumRoommates] = useState<number>(1);
const [roommateFound, setRoommateFound] = useState(false); // add this

  const [openBookingDialog, setOpenBookingDialog] = useState(false);
  const [openReceiptDialog, setOpenReceiptDialog] = useState(false);
  const [openPaymentMethodDialog, setOpenPaymentMethodDialog] = useState(false);
  const [openUPIPinDialog, setOpenUPIPinDialog] = useState(false);
  const [openProcessing, setOpenProcessing] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [upiPin, setUpiPin] = useState("");

  const [bookedProperties, setBookedProperties] = useState<number[]>([]);
  const [userBookedProperties, setUserBookedProperties] = useState<number[]>([]);
  const [user, setUser] = useState<any>(null);

  const [duration, setDuration] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Track logged in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      const snapshot = await getDocs(collection(db, "bookings"));
      const bookedIds: number[] = [];
      const userBookedIds: number[] = [];

      snapshot.docs.forEach((docSnap) => {
        const data = docSnap.data();
        bookedIds.push(data.propertyId);
        if (user && data.userId === user.uid) userBookedIds.push(data.propertyId);
      });

      setBookedProperties(bookedIds);
      setUserBookedProperties(userBookedIds);
    };
    fetchBookings();
  }, [user]);

  const filteredProperties = properties.filter((p) => {
  const stateMatch = selectedState
    ? p.state.toLowerCase().includes(selectedState.toLowerCase())
    : true;

  const amenityMatch =
    selectedAmenities.length > 0
      ? selectedAmenities.every((amenity) => p.amenities.includes(amenity))
      : true;

  // ✅ Add this line if using global shareRoom filter
  const shareRoomMatch = shareRoom ? p.shared === true : true;

  return stateMatch && amenityMatch && shareRoomMatch; // include shareRoomMatch
});



  const getPriceNumber = (priceStr: string) => {
    const match = priceStr.match(/\d+/g);
    return match ? Number(match.join("")) : 0;
  };

  const handleBookNow = (property: any) => {
  setSelectedProperty(property);

  const dailyPrice = getPriceNumber(property.price);
  
  // ✅ If shared room, divide price by number of roommates
  const finalPrice = property.shareable
    ? Math.ceil(dailyPrice * duration / numRoommates)
    : Math.ceil(dailyPrice * duration);

  setTotalPrice(finalPrice);
  setOpenBookingDialog(true);
};


  const handleMakePayment = () => {
    if (selectedProperty) {
      const dailyPrice = getPriceNumber(selectedProperty.price);
      setTotalPrice(Math.ceil(dailyPrice * duration));
    }
    setOpenBookingDialog(false);
    setOpenReceiptDialog(true);
  };

  const handlePayNowReceipt = () => {
    setOpenReceiptDialog(false);
    setOpenPaymentMethodDialog(true);
  };

  const handlePaymentMethodProceed = () => {
    setOpenPaymentMethodDialog(false);
    setOpenUPIPinDialog(true);
  };

  const handleUPIPinSubmit = async () => {
    setOpenUPIPinDialog(false);
    setOpenProcessing(true);

    setTimeout(async () => {
      setOpenProcessing(false);

      if (selectedProperty && user) {
        setBookedProperties((prev) => [...prev, selectedProperty.id]);
        setUserBookedProperties((prev) => [...prev, selectedProperty.id]);

        try {
          await addDoc(collection(db, "bookings"), {
            userId: user.uid,
            propertyId: selectedProperty.id,
            propertyName: selectedProperty.name,
            startDate: new Date(),
            endDate: new Date(new Date().setDate(new Date().getDate() + duration)),
            totalPrice,
            status: "booked",
          });
        } catch (err) {
          console.error("Firestore booking failed:", err);
        }
      }

      setOpenSuccessDialog(true);
      setUpiPin("");
    }, 2000);
  };

  const handleCloseSuccess = () => {
    setOpenSuccessDialog(false);
    setSelectedProperty(null);
    setSelectedPaymentMethod(null);
    setDuration(1);
    setTotalPrice(0);
  };

  const handleUnbook = async (id: number) => {
    if (!user) return;

    try {
      setBookedProperties((prev) => prev.filter((pid) => pid !== id));
      setUserBookedProperties((prev) => prev.filter((pid) => pid !== id));

      const q = query(
        collection(db, "bookings"),
        where("propertyId", "==", id),
        where("userId", "==", user.uid)
      );

      const snapshot = await getDocs(q);
      for (const docSnap of snapshot.docs) {
        await deleteDoc(doc(db, "bookings", docSnap.id));
      }
    } catch (error) {
      console.error("Error deleting booking: ", error);
    }
  };

// ✅ Toggle Amenity
  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity) // remove
        : [...prev, amenity] // add
    );
  };

  // ✅ Reset Filters
  const handleReset = () => {
    setSelectedState("");
    setSelectedAmenities([]);
  };

 const searchParams = new URLSearchParams(location.search);
const roommatesFromQuery = Number(searchParams.get("roommates"));

if (roommatesFromQuery > 0 && selectedProperty?.id === Number(searchParams.get("propertyId"))) {
  setNumRoommates(roommatesFromQuery); // ✅ use existing state setter
  setRoommateFound(true); // ✅ mark roommate as found
}


  return (
    <div className="min-h-screen bg-gradient-subtle dark:bg-black transition-colors duration-300">
      
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

      <main className="container mx-auto px-4 pt-8 pb-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Hot Listings</span>
          </div>
          <h1 className="text-4xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-sky-500">
            Find Your Dream Stay
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Filter by state or amenities to find the perfect property.
          </p>
        </div>

        {/* Filters */}
        {/* ✅ Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {/* ✅ State Search Box */}
          <Input
            placeholder="Search Location"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-48"
          />

          {/* ✅ Amenities Multi-Select */}
          <Popover>
  <PopoverTrigger asChild>
    <Button variant="outline" className="w-48 h-10 justify-between">
      {selectedAmenities.length > 0
        ? selectedAmenities.join(", ")
        : "Select Amenities"}
    </Button>
  </PopoverTrigger>
  <PopoverContent
    className="w-48 p-2 bg-white dark:bg-black"
    style={{ maxHeight: "200px", overflowY: "auto" }} // ✅ Added scroll
  >
    <div className="space-y-2">
      {amenitiesList.map((amenity) => (
        <div key={amenity} className="flex items-center space-x-2">
          <Checkbox
            id={amenity}
            checked={selectedAmenities.includes(amenity)}
            onCheckedChange={() => toggleAmenity(amenity)}
          />
          <label htmlFor={amenity} className="text-sm">
            {amenity}
          </label>
        </div>
      ))}
    </div>
  </PopoverContent>
</Popover>

{/* ✅ Share Room Button */}
<Button
  variant={shareRoom ? "default" : "outline"}
  className="w-48 h-10 transition-transform hover:scale-105"
  onClick={() => setShareRoom(!shareRoom)}
>
  {shareRoom ? "Shared Rooms" : "Shared Rooms"}
</Button>


  {/* ✅ Reset Button */}
  <Button
    variant="outline"
    className="w-48 h-10 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    onClick={handleReset}
  >
    Reset Filters
  </Button>
</div>


        {/* Property Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => {
            const booked = bookedProperties.includes(property.id);
            const userBooked = userBookedProperties.includes(property.id);

            return (
              <PropertyCard
                key={property.id}
                property={property}
                booked={booked}
                userBooked={userBooked}
                onBook={handleBookNow}
                onUnbook={handleUnbook}
              />
            );
          })}
        </div>
      </main>
      {/* Booking Dialog */}
<Dialog open={openBookingDialog} onOpenChange={setOpenBookingDialog}>
  <DialogContent className="max-w-lg rounded-2xl bg-white dark:bg-black">
    {selectedProperty && (
      <>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{selectedProperty.name}</DialogTitle>
          <DialogDescription>Located in {selectedProperty.state}</DialogDescription>
        </DialogHeader>

        <img
          src={selectedProperty.image}
          alt={selectedProperty.name}
          className="w-full h-48 object-cover rounded-xl mb-4"
        />

        <p className="text-lg font-semibold text-green-600 mb-2">{selectedProperty.price}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {selectedProperty.amenities.map((amenity, i) => (
            <Badge key={i} variant="secondary">{amenity}</Badge>
          ))}
        </div>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setOpenBookingDialog(false)}>Close</Button>
          <Button
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white"
            onClick={handleMakePayment}
          >
            Make Payment
          </Button>
        </DialogFooter>
      </>
    )}
  </DialogContent>
</Dialog>



{/* Receipt Dialog */}
<Dialog
  open={openReceiptDialog}
  onOpenChange={(isOpen) => {
    setOpenReceiptDialog(isOpen);
    if (!isOpen) {
      setDuration(1); // Reset days
      setNumRoommates(1); // Reset roommates
      setTotalPrice(0); // Reset price
    }
  }}
>
  <DialogContent className="w-[550px] rounded-2xl bg-white dark:bg-black p-4">
    {selectedProperty && (
      <>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Payment Receipt</DialogTitle>
          <DialogDescription>Review booking before payment</DialogDescription>
        </DialogHeader>

        {/* Image */}
        <img
          src={selectedProperty.image}
          alt={selectedProperty.name}
          className="w-full h-40 object-cover rounded-xl mb-4"
        />

        {/* Details + Input Row */}
        <div className="flex justify-between items-start gap-4 mb-5">
          {/* Left Side: Property Details */}
          <div className="space-y-1 text-md">
            <p className="font-semibold text-base">{selectedProperty.name}</p>
            <p className="text-muted-foreground">{selectedProperty.state}</p>
            <p className="text-green-600 font-bold">{selectedProperty.price}</p>
            <p className="text-muted-foreground">
              Booking Date: {new Date().toLocaleDateString()}
            </p>
            <p className="text-purple-600 font-semibold">
              Total: ₹{totalPrice.toLocaleString()} {selectedProperty.shareable ? "(per person)" : ""}
            </p>
            {selectedProperty.shareable && (
              <p className="text-muted-foreground text-sm">
                Duration: {duration} days | Roommates: {numRoommates}
              </p>
            )}
          </div>

          {/* Right Side: Inputs */}
          <div className="flex flex-col gap-3 w-36">
            {/* Duration */}
            <div>
              <label className="block text-sm font-medium mb-1">Duration (In Days)</label>
              <input
                type="number"
                min={1}
                value={duration}
                onChange={(e) => {
                  const days = Number(e.target.value);
                  setDuration(days);
                  const dailyPrice = getPriceNumber(selectedProperty.price);
                  const price = selectedProperty.shareable
                    ? Math.ceil(dailyPrice * days / numRoommates)
                    : Math.ceil(dailyPrice * days);
                  setTotalPrice(price);
                }}
                className="w-full border rounded-md p-2 text-md dark:bg-gray-800 dark:text-white"
              />
            </div>

            {/* Number of Roommates */}
            {selectedProperty.shared && (
              <div>
                <label className="block text-sm font-medium mb-1">Number of Roommates</label>
                <input
                  type="number"
                  min={1}
                  value={numRoommates}
                  onChange={(e) => {
                    const roommates = Number(e.target.value);
                    setNumRoommates(roommates);
                    const dailyPrice = getPriceNumber(selectedProperty.price);
                    const price = Math.ceil(dailyPrice * duration / roommates);
                    setTotalPrice(price);
                  }}
                  className="w-full border rounded-md p-2 text-md dark:bg-gray-800 dark:text-white"
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setOpenReceiptDialog(false)}>
            Cancel
          </Button>
          <Button
            className="bg-gradient-to-r from-green-500 to-green-700 text-white"
            onClick={handlePayNowReceipt}
          >
            Pay Now
          </Button>
        </DialogFooter>
      </>
    )}
  </DialogContent>
</Dialog>




      {/* Payment Method Dialog */}
      <Dialog open={openPaymentMethodDialog} onOpenChange={setOpenPaymentMethodDialog}>
        <DialogContent className="max-w-sm rounded-2xl bg-white dark:bg-black">
          <DialogHeader>
            <DialogTitle>Select Payment Method</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2 my-4">
            {["UPI", "Credit Card", "Debit Card", "Net Banking"].map((method) => (
              <Button
                key={method}
                variant={selectedPaymentMethod===method?"default":"outline"}
                onClick={() => setSelectedPaymentMethod(method)}
              >
                {method}
              </Button>
            ))}
          </div>
          <DialogFooter>
            <Button
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white w-full"
              onClick={handlePaymentMethodProceed}
              disabled={!selectedPaymentMethod}
            >
              Proceed
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* UPI PIN Dialog */}
      <Dialog open={openUPIPinDialog} onOpenChange={setOpenUPIPinDialog}>
        <DialogContent className="max-w-sm rounded-2xl bg-white dark:bg-black">
          <DialogHeader>
            <DialogTitle>Enter YOUR PIN</DialogTitle>
            <DialogDescription>Enter your 6-digit PIN</DialogDescription>
          </DialogHeader>
          <input
            type="password"
            maxLength={6}
            value={upiPin}
            onChange={(e) => setUpiPin(e.target.value)}
            className="w-full border rounded-xl p-2 mt-4 text-center text-black dark:text-black placeholder-gray-400"
            placeholder="******"
          />
          <DialogFooter>
            <Button
              className="bg-gradient-to-r from-green-500 to-green-700 text-white w-full"
              onClick={handleUPIPinSubmit}
              disabled={upiPin.length<4}
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Processing Dialog */}
      <Dialog open={openProcessing} onOpenChange={setOpenProcessing}>
        <DialogContent className="max-w-sm rounded-2xl bg-white dark:bg-black flex flex-col items-center justify-center py-8">
          <p className="text-lg mb-4">Processing Payment via {selectedPaymentMethod}...</p>
          <div className="border-4 border-blue-300 border-t-blue-600 rounded-full w-12 h-12 animate-spin"></div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={openSuccessDialog} onOpenChange={setOpenSuccessDialog}>
        <DialogContent className="max-w-sm rounded-2xl bg-white dark:bg-black text-center py-8">
          <p className="text-2xl font-bold text-green-600 mb-4">Payment Successful! </p>
          <Button className="bg-gradient-to-r from-green-500 to-green-700 text-white w-full" onClick={handleCloseSuccess}>
            OK
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Properties;
