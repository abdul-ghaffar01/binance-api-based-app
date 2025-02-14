"use client"
import Button from "@/components/ui/Button";
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import { useState } from "react";

export default function ProfileCard() {
  const [isLoading, setIsLoading] = useState(false);
  const clicked = () => {
    setIsLoading(true);
    console.log("clicked the button")
    setTimeout(() => { setIsLoading(false) }, 3000)
  }
  const submited = () => { console.log("clicked the button") }
  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
      <Button 
      className="!rounded-full !p-3"
      onClick={clicked} isLoading={isLoading} disabled={isLoading} icon={AddModeratorIcon} />
    </div>
  );
}
