import type { Metadata } from "next";
import localFont from "next/font/local";
import { Plus_Jakarta_Sans, Shantell_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});
const shantellSans = Shantell_Sans({
  subsets: ["latin"],
  variable: "--font-shantell-sans",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Savvio",
  description:
    "Savvio is a modern bookmark manager that lets you save, organize, and discover your favorite links with ease and style.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#F5F5F4] min-h-screen">
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
          <Toaster richColors={true} position="top-right" />
          <div
            className={`${plusJakartaSans.className} ${shantellSans.variable} overflow-hidden`}
          >
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
