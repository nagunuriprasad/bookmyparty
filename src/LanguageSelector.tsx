// src/LanguageSelector.tsx
import React, { useState } from 'react';
import './assets/css/LanguageSelector.css'; // Import CSS for styling
import LanguageLogo from './assets/language.png';

interface LanguageSelectorProps {
    onLanguageChange: (language: string) => void; // Callback to change the language
}

const languages = [
    'Hindi',
    'Bengali',
    'Telugu',
    'Marathi',
    'Tamil',
    'Gujarati',
    'Urdu',
    'Malayalam',
    'Kannada',
    'Odia',
    'Punjabi',
    'Assamese',
    'Maithili',
    'Dogri',
    'Santhali',
    'Kashmiri',
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onLanguageChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('');

    const handleImageClick = () => {
        setIsOpen(!isOpen); // Toggle the language list visibility
    };

    const handleLanguageClick = (language: string) => {
        setSelectedLanguage(language);
        onLanguageChange(language); // Call the parent callback
        setIsOpen(false); // Close the language list
    };

    return (
        <div className="language-selector">
           <img src={LanguageLogo} alt="Company Logo" // Replace with your image path
               
                className="selector-image"
                onClick={handleImageClick}
            />
            {isOpen && (
                <ul className="language-list">
                    {languages.map((lang) => (
                        <li key={lang} onClick={() => handleLanguageClick(lang)}>
                            {lang}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LanguageSelector;
