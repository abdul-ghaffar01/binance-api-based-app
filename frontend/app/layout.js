import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata = {
  title: "Binanify",
  description: "Binanify simplifies the trading for binance",
  icons: { icon: "/favicon.png" }
};

export default function RootLayout({ children }) {
  return (
    <ThemeProvider>
      <p className="bg-purple-700 text-slate-200 text-center font-bold fixed bottom-0 w-full p-2">Work in progress! The project is still under .</p>
      <Navbar />
      {children}
    </ThemeProvider>
  );
}
