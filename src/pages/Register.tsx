import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterForm = z.infer<typeof schema>;

export default function Register() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);

      toast({
        title: "Account Created 🎉",
        description: "Welcome aboard! Your account is ready.",
      });

      setTimeout(() => navigate("/login"), 1500);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Registration Failed 😢",
        description: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black px-4">
      <div className="w-full max-w-md bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-purple-700">
        <h2 className="text-3xl font-bold mb-6 text-center text-white drop-shadow-lg">
          Create Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
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

          {/* Password Field */}
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
            {isSubmitting ? "Creating..." : "Register"}
          </button>
        </form>

        {/* Footer link */}
        <p className="mt-6 text-center text-gray-300">
          Already have an account?{" "}
          <span
            className="text-purple-400 hover:text-purple-600 font-medium cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
