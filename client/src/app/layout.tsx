"use client"

import localFont from "next/font/local";
import "./globals.css";
import {ThemeProvider} from "@/context/theme-provider";
import {Toaster} from "@/components/ui/toaster";

import {queryClient} from "@/client/query-client";
import {QueryClientProvider} from "@tanstack/react-query";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
            <html lang="en" className="dark" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ThemeProvider>
                    <QueryClientProvider client={queryClient}>
                        <Toaster/>
                        {children}
                    </QueryClientProvider>
                </ThemeProvider>
            </body>
            </html>
    );
}