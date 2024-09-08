import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import NavBarPage from "./Components/navBar";
import 'react-toastify/dist/ReactToastify.css';
import '@sweetalert2/theme-borderless/borderless.css';

const inter = Noto_Sans_Thai({ subsets: ["latin"] });

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
