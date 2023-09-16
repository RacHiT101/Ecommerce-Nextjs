"use client";

import { useSession } from "next-auth/react";
import Layout from "./components/Layout";

function Home() {
  const { data: session } = useSession();

  return (
    <div className="text-blue-900 flex justify-between">
      <h2>
        Hello, <b>{session?.user?.name}</b>
      </h2>
      <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
        <img src={session?.user?.image} alt="" className="w-8 h-8" />
        <span className="px-2 flex justify-center items-center">{session?.user?.name}</span>
      </div>
    </div>
  );
}

export default Home;
