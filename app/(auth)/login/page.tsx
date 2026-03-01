"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      toast.error(data.error);
      return;
    }

    toast.success("Registration successful!");
    router.push("/products");
    toast.success("Welcome Back!!!!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.2)] border border-gray-100 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light tracking-tight text-gray-900">
              Welcome back
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              Please enter your details to sign in
            </p>
          </div>

          {/* Form */}
          <form onSubmit={loginUser} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400/20 focus:border-gray-400 transition-all text-gray-900 placeholder:text-gray-400"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400/20 focus:border-gray-400 transition-all text-gray-900 placeholder:text-gray-400"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg shadow-sm transition-colors"
            >
              Sign in
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-gray-900 hover:text-gray-700 underline-offset-4 hover:underline transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
