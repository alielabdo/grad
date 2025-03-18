import "~/styles/globals.css";

import {Inter} from 'next/font/google'
import { type Metadata } from "next";
import { ContextProvider } from "./contexts/ContextProvider";

export const metadata: Metadata = {
  title: "Drawing",
  description: "Drawing",
  icons: [{ rel: "icon", url: "/alimotassem.ico" }],
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap"
})

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.className}`}>
      <body>
        <ContextProvider>
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
