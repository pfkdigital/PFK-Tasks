"use client";

import * as React from "react";
import { cn } from "@/lib/utils"; // adjust import based on your setup

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: number;    // Spinner diameter
    thickness?: string; // Border thickness
    color?: string;   // Tailwind border color class (e.g., "border-primary")
}

export function Spinner({
                            size = 24,
                            thickness = "4px",
                            color = "border-primary",
                            className,
                            ...props
                        }: SpinnerProps) {
    return (
        <div
            className={cn(
                "flex items-center justify-center w-full h-full", // fill parent and center content
                className
            )}
            {...props}
        >
            <div
                className={cn(
                    "animate-spin rounded-full border-t-transparent",
                    color
                )}
                style={{
                    width: size,
                    height: size,
                    borderWidth: thickness
                }}
            />
        </div>
    );
}
