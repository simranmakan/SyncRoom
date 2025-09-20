import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, DollarSign, RefreshCw } from "lucide-react";

interface Participant {
  id: number;
  name: string;
  avatar: string;
  amount: number;
  paid: boolean;
}

const SmartSplit = () => {
  const [participants, setParticipants] = useState<Participant[]>([
    { id: 1, name: "Zayn Malik", avatar: "https://i.pinimg.com/1200x/e9/09/d8/e909d8c1710b5ca4a15e9eeefddd80af.jpg", amount: 1200, paid: false },
    { id: 2, name: "Sabrina Carpenter", avatar: "https://i.pinimg.com/1200x/5b/cc/fa/5bccfa6db3a4ac97d06be7ab3dd65ccf.jpg", amount: 950, paid: true },
    { id: 3, name: "Nicole Wallace", avatar: "https://i.pinimg.com/1200x/25/29/9d/25299d91005c8debdb77b57946578b0c.jpg", amount: 1100, paid: false },
    { id: 4, name: "Simran Makan", avatar: "https://i.pinimg.com/1200x/72/e3/4b/72e34b6abb7f5892bfac19dc1a7065e2.jpg", amount: 1100, paid: true },

  ]);

  const togglePaid = (id: number) => {
    setParticipants(prev => prev.map(p => (p.id === id ? { ...p, paid: !p.paid } : p)));
  };

  const resetAll = () => {
    if (confirm("Are you sure you want to reset all payments?")) {
      setParticipants(prev => prev.map(p => ({ ...p, paid: false })));
    }
  };

  const totalAmount = useMemo(() => participants.reduce((sum, p) => sum + p.amount, 0), [participants]);
  const totalPaid = useMemo(() => participants.filter(p => p.paid).reduce((sum, p) => sum + p.amount, 0), [participants]);
  const totalRemaining = totalAmount - totalPaid;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-900 shadow-md transition-colors duration-500">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-purple-600 dark:text-purple-400 transition-colors duration-500">SyncRoom</Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">Home</Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-8 pb-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2 text-purple-800 dark:text-purple-300 transition-colors duration-500">Smart Split</h1>
          <p className="text-lg text-purple-700 dark:text-purple-200 transition-colors duration-500">Track shared expenses and settle bills with your roommates easily.</p>

          {/* Total Summary */}
          <div className="mt-6 flex justify-center items-center gap-4 flex-wrap">
            <Badge variant="outline" className="px-4 py-2 text-lg font-semibold text-purple-800 dark:text-purple-300 border-purple-400 dark:border-purple-500 transition-colors duration-500">
              Total: ₹{totalAmount}
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-lg font-semibold text-green-700 dark:text-green-400 border-green-400 dark:border-green-500 transition-colors duration-500">
              Paid: ₹{totalPaid}
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-lg font-semibold text-red-700 dark:text-red-400 border-red-400 dark:border-red-500 transition-colors duration-500">
              Remaining: ₹{totalRemaining}
            </Badge>

            <Button variant="default" className="ml-2 flex items-center gap-2" onClick={resetAll}>
              <RefreshCw className="w-4 h-4" /> Reset All
            </Button>
          </div>
        </div>

        {/* Participants Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {participants.map(p => (
            <div key={p.id} className="relative p-6 bg-white/30 dark:bg-gray-900/50 rounded-3xl shadow-lg backdrop-blur-md hover:scale-105 hover:shadow-2xl transition-transform duration-300 overflow-hidden">
              {/* Decorative Gradient */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-3xl opacity-20"></div>

              <img src={p.avatar} alt={p.name} className="w-24 h-24 rounded-full mb-4 object-cover border-2 border-purple-300 dark:border-purple-600" />
              <h2 className="text-xl font-semibold mb-2 text-purple-800 dark:text-purple-200">{p.name}</h2>
              <p className="text-lg text-purple-600 dark:text-purple-300 mb-2 flex items-center gap-1">
                <DollarSign className="w-4 h-4" /> ₹{p.amount}
              </p>

              {/* Payment Status */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4 overflow-hidden">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${p.paid ? "bg-green-500" : "bg-purple-500"}`}
                  style={{ width: p.paid ? "100%" : "0%" }}
                ></div>
              </div>

              <Button
                variant={p.paid ? "gradient" : "outline"}
                className={`w-full flex items-center justify-center gap-2 ${
                  p.paid
                    ? "bg-gradient-to-r from-green-400 to-green-600 text-white hover:from-green-500 hover:to-green-700"
                    : "text-purple-700 dark:text-purple-200 hover:bg-purple-100 dark:hover:bg-gray-700"
                } transition-colors duration-300`}
                onClick={() => togglePaid(p.id)}
              >
                {p.paid ? <><Check className="w-4 h-4" /> Paid</> : "Mark Paid"}
              </Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SmartSplit;
