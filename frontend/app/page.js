"use client"
import Login from "@/components/root/Login";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfileCard() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const clicked = () => {
    setIsLoading(true);
    router.push("/dashboard")
  }
  const submited = () => { console.log("clicked the button") }
  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
      <Login />

    </div>
  );
}
