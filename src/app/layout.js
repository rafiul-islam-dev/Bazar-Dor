import "./globals.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Toaster from "./components/Toaster";

export const metadata = {
  title: "বাজার দর — নিত্যপ্রয়োজনীয় পণ্যের দাম",
  description:
    "বাজারের প্রয়োজনীয় পণ্যের দাম এক নজরে দেখুন।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body>
        <Navbar />

        <main>{children}</main>

        <Footer />

        <Toaster />
      </body>
    </html>
  );
}