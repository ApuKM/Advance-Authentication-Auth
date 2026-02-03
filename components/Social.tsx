"use client";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { SocialProps } from "@/types/types";
// import { useSearchParams } from "next/navigation";
// import { useEffect } from "react";

export default function Social({page}: SocialProps) {
  const handleClick = async (provider: "google" | "github") => {
    await signIn(provider, {
      callbackUrl: `${DEFAULT_LOGIN_REDIRECT}?oauth=linked`,
    });
  };

  // const searchParams = useSearchParams();
  // useEffect(() => {
  //   if(searchParams.get("oauth") === "linked"){
  //      alert("OAuth account linked successfully!");
  //   }
  // }, [searchParams])

  return (
    <div className="flex items-center justify-center space-x-1.5">
      <Button
        onClick={() => handleClick("google")}
        variant="outline"
        className="w-full"
      >
        {page === "protected" ? "Link Google" : "Google"}
      </Button>
      <Button
        onClick={() => handleClick("github")}
        variant="outline"
        className="w-full"
      >
        {page === "protected" ? "Link Github" : "Github"}
      </Button>
    </div>
  );
}
