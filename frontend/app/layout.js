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
      {children}
    </ThemeProvider>
  );
}
