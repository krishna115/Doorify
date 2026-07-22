"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { AuthService } from "@/features/auth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

 const handleSignIn = async () => {
  try {
    setLoading(true);

    const { profile } =
      await AuthService.login(
        email,
        password
      );

    router.replace(
      AuthService.getDashboard(profile.role)
    );

    router.refresh();
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("Something went wrong.");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/20">
      <div className="w-full max-w-md rounded-xl border bg-card p-8 shadow-sm">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            Doorify
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to continue
          </p>
        </div>

        <div className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border px-4 py-3"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border px-4 py-3"
          />

          <button
            onClick={handleSignIn}
            disabled={loading}
            className="w-full rounded-md bg-primary py-3 font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </div>

      </div>
    </main>
  );
}