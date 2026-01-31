"use client";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

export default function Social() {
  const handleClick = async (provider: "google" | "github") => {
    await signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex items-center justify-center space-x-1.5">
      <Button
        onClick={() => handleClick("google")}
        variant="outline"
        className="w-full"
      >
        Google
      </Button>
      <Button
        onClick={() => handleClick("github")}
        variant="outline"
        className="w-full"
      >
        Github
      </Button>
    </div>
  );
}
