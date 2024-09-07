import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBarPage from "./Components/navBar";
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo App",
  description: "Nextjs Todo App",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="light" lang="en">
      <body className={inter.className}>
        <NavBarPage />
        {children}</body>
    </html>
  );
}
