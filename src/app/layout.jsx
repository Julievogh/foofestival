// app/layout.jsx
import { Inter } from "next/font/google";
import "./globals.css"; // Adjusted import path for global CSS
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FooFestival",
  description: "Your FooFestival Site and App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="content">{children}</div>
      </body>
    </html>
  );
}
