import "@radix-ui/themes/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import NavBar from "./NavBar";
import ClientSessionProvider from "./ClientSessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-800`}>
        <ClientSessionProvider>
          <Theme accentColor="amber" appearance="light">
            <NavBar />
            <main className="">{children}</main>
          </Theme>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
