import type { Metadata } from "next";
import "./globals.css";
import React from "react";

export const metadata: Metadata = {
    title: 'Next.js Rendering Demo - SSR vs SSG vs PPR',
    description: 'Compare performance and network requests across different rendering methods',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>{children}</body>
        </html>
    )
}