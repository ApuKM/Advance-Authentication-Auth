import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex items-center justify-center h-dvh">
      <div className="flex flex-col gap-4">
        <h2 className="text-5xl">Home</h2>
        <Link href={"/login"} className="text-sm text-blue-900 underline">
          Discover more
        </Link>
      </div>
    </div>
  );
};

export default page;
