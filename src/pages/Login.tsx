import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const schema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof schema>;

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isResetting, setIsResetting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);

      toast({
        title: "Login Successful 🎉",
        description: `Welcome back, ${data.username}!`,
      });

      setTimeout(() => navigate("/"), 1500);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login Failed 😢",
        description: error.message,
      });
    }
  };

  const handleResetPassword = async () => {
    if (!resetEmail) {
      toast({ variant: "destructive", title: "Please enter your email" });
      return;
    }

    try {
      setIsResetting(true);
      await sendPasswordResetEmail(auth, resetEmail);
      toast({
        title: "Password Reset Email Sent ✅",
        description: "Check your inbox to reset your password.",
      });
      setIsDialogOpen(false);
      setResetEmail("");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error 😢",
        description: error.message,
      });
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black px-4">
      <div className="w-full max-w-md bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-purple-700">
        <h2 className="text-3xl font-bold mb-6 text-center text-white drop-shadow-lg">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Username */}
          <div>
            <input
              type="text"
              placeholder="Username"
              {...register("username")}
              className="w-full border border-gray-600 rounded-lg p-3 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
            {errors.username && (
              <p className="text-red-400 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full border border-gray-600 rounded-lg p-3 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full border border-gray-600 rounded-lg p-3 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 ${
              isSubmitting
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-500 hover:scale-105 shadow-lg"
            }`}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Forgot Password & Footer */}
        <div className="mt-4 flex justify-between items-center text-sm text-gray-300">
          <button
            onClick={() => setIsDialogOpen(true)}
            className="text-purple-400 hover:text-purple-600 font-medium"
          >
            Forgot Password?
          </button>

          <span>
            Don't have an account?{" "}
            <span
              className="text-purple-400 hover:text-purple-600 font-medium cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </span>
        </div>
      </div>

      {/* Dialog for Forgot Password */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md rounded-2xl bg-gray-900 border border-purple-700 p-6">
          <DialogHeader>
            <DialogTitle className="text-white text-xl font-bold">
              Reset Password
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="w-full border border-gray-600 rounded-lg p-3 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button
              variant="ghost"
              onClick={() => setIsDialogOpen(false)}
              disabled={isResetting}
            >
              Cancel
            </Button>
            <Button onClick={handleResetPassword} disabled={isResetting}>
              {isResetting ? "Sending..." : "Send Reset Email"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
