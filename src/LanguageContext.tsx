// src/LanguageContext.tsx
import React, { createContext, useContext, useState } from 'react';

// Define the context and its default value
interface LanguageContextType {
    language: string;
    setLanguage: (language: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Create a provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState('English'); // Default language

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

// Custom hook to use the LanguageContext
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
