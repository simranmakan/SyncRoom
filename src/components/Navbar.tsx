import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";

function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light"); // Track theme
  const navigate = useNavigate();
  const { toast } = useToast();

  // Track user login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Persistent theme handling
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark" || storedTheme === "light") {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    } else {
      // Default theme
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged Out ✅",
        description: "You have been successfully logged out.",
      });
      navigate("/"); // Redirect to homepage
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Logout Failed 😢",
        description: error.message,
      });
    }
  };

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-gray-50 dark:bg-gray-900 shadow-md transition-colors duration-300">
      {/* Logo */}
      <h1 className="font-bold text-xl text-gray-800 dark:text-gray-100">
        SyncRoom
      </h1>

      {/* Right Side Buttons */}
      <div className="flex items-center space-x-4">
        {!user ? (
          <>
            {/* Login Button */}
            <Link to="/login">
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 dark:hover:bg-green-700 transition">
                Login
              </button>
            </Link>

            {/* Register Button */}
            <Link to="/register">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition">
                Register
              </button>
            </Link>
          </>
        ) : (
          /* Logout Button */
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 dark:hover:bg-red-700 transition"
          >
            Logout
          </button>
        )}

        {/* Theme Toggle Button */}
        <button onClick={toggleTheme} className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 transition hover:bg-gray-200 dark:hover:bg-gray-800">
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;