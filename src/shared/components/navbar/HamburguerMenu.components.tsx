import React from "react";
import Welcome from "./Welcome.component";
import HamBurgerButtons from "./HamBurgerButtons.component";

interface HamburguerMenuProps {
    handleToggle: () => void;
}

export default function HamburguerMenu({ handleToggle }: HamburguerMenuProps) {
    return (
        <div>
            <Welcome handleToggle={handleToggle}/>
            <HamBurgerButtons handleToggle={handleToggle} />
        </div>
    );
}
