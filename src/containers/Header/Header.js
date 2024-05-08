import "./Header.css"
import { useState, useEffect } from 'react'
import "../../components/ToggleButton/ToggleButton"
import { ToggleButton } from "../../components/ToggleButton/ToggleButton";

export function Header() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [darkMode]);

    return (
        <div className="Header">
            <span className="Header--Title">Weather App</span>
            <div className="Header--Toggle">
                <span>Dark mode</span>
                <ToggleButton status={darkMode} callback={setDarkMode}></ToggleButton>
            </div>
        </div>
    );
}