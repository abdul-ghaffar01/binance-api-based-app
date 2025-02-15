"use client"
import ProtectedRoute from "@/components/ProtectedRoute";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import AddModeratorIcon from '@mui/icons-material/AddModerator';
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
      yes there is something
      <Button
        className="!rounded-full !p-3"
        onClick={clicked} isLoading={isLoading} disabled={isLoading} icon={AddModeratorIcon} />

    </div>
  );
}
