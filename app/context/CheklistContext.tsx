"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface CheklistFields {
    [key: string]: boolean;
}

interface CheklistEntry {
    cheklist_name: string;
    cheklist_url: string;
    cheklist_description: string;
    cheklist_author_name: string;
    cheklist_author_url: string;
    user_email: string;
    fields: CheklistFields;
}

interface CheklistContextType {
    cheklistEntry: CheklistEntry | null;
    setCheklistEntry: (entry: CheklistEntry | null) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    error: string | null;
    setError: (error: string | null) => void;
}

const CheklistContext = createContext<CheklistContextType | undefined>(undefined);

export function CheklistProvider({ children }: { children: ReactNode }) {
    const [cheklistEntry, setCheklistEntry] = useState<CheklistEntry | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    return (
        <CheklistContext.Provider value={{
            cheklistEntry,
            setCheklistEntry,
            isLoading,
            setIsLoading,
            error,
            setError
        }}>
            {children}
        </CheklistContext.Provider>
    );
}

export function useCheklistContext() {
    const context = useContext(CheklistContext);
    if (context === undefined) {
        throw new Error('useCheklistContext must be used within a CheklistProvider');
    }
    return context;
} 