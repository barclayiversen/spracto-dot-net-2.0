import "./globals.css";
import { ReactNode } from "react";
import Header from "./components/Header";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className="bg-black">
        <main>{children}</main>
        <footer className="p-4 text-center text-white">Footer</footer>
      </body>
    </html>
  );
};

export default RootLayout;
