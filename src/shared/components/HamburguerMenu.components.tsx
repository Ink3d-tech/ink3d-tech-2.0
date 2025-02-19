import React from "react";
import WelcomeComponent from "./Welcome.component";
import HamBurgerButtons from "./HamBurgerButtons.component";

interface HamburguerMenuProps {
    handleToggle: () => void;
}

export default function HamburguerMenu({ handleToggle }: HamburguerMenuProps) {
    return (
        <div>
        <WelcomeComponent handleToggle={handleToggle}/>
        <HamBurgerButtons handleToggle={handleToggle} />
        </div>
    );
}
