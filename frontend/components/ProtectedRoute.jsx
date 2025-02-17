"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import Loader from "./ui/Loader";

const ProtectedRoute = ({ children }) => {
    const router = useRouter();
    const token = useAuthStore((state) => state.token);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                router.push("/");
                return;
            }

            try {
                const res = await fetch("/api/auth/verify-token", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const resp = await res.json();
                console.log(resp)

                if (!resp.isValid) {
                    router.push("/");
                }

                setIsLoading(false);
            } catch (error) {
                router.push("/");
            }
        };

        verifyToken();
    }, [token, router]);

    if (isLoading) return (
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-background">
            <Loader className="w-fit h-fit " />
            <p className="text-xl font-semibold text-blue-500 mt-4 animate-pulse">Verifying login...</p>
        </div>

    )

    return (
        <html>
            <body className="bg-background text-foreground">
                {children}
            </body>
        </html>
    );
};

export default ProtectedRoute;
