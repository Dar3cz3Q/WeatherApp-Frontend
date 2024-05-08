import "./ToggleButton.css"
import React from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css"

export function ToggleButton({ status, callback }) {
    return (
        <Toggle
            checked={status}
            onChange={({ target }) => callback(target.checked)}
            aria-label="Dark mode toggle"
        />
    );
};