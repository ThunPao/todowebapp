"use client"

import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
export default function LightSwitch() {
    const [isLightMode, setIsLightMode] = useState(true);
    const handleToggle = () => {
        setIsLightMode((prev) => !prev);
    };
    useEffect(() => {
        const mainElement = document.querySelector("html");
        if (mainElement) {
            const theme = isLightMode ? "light" : "dark";
            mainElement.setAttribute("data-theme", theme);
        }
    }, [isLightMode]);

    return (
        <>
            <label className="swap swap-rotate active:scale-110 duration-200">
                <input
                    type="checkbox"
                    className="theme-controller"
                    checked={isLightMode}
                    onChange={handleToggle}
                />
                <Icon icon={`ph:${isLightMode ? "sun" : "moon"}-fill`} width="2.5em" height="2.5em" />
            </label>
        </>
    );
}
