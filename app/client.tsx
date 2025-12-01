'use client';

import { useEffect, useState } from "react";
import { useTRPC } from "@/trpc/client";

export const Client = () => {
    const trpc = useTRPC();

    // Removed the broken createAI query

    useEffect(() => {}, []);

    return (
        <div>
            <p>Client component loaded.</p>
        </div>
    );
};
