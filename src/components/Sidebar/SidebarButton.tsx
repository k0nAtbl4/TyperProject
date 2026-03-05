import React, { useState } from "react";
import type { IconType } from "react-icons";
import { NavLink } from "react-router-dom";
import "./SidebarButton.css";

interface MenuButtonProps {
    icon: IconType;
    link: string;
    label: string;
    isActive: boolean;
}

function MenuButton({ icon: Icon, link, label, isActive }: MenuButtonProps) {
    const [chosen, setChosen] = useState(false);
    return (
        <div className="menu-item">
            <NavLink to={link} className={({ isActive }) => `menu-item ${isActive ? 'active' : ''} ${chosen ? 'chosen' : ''}`} onClick={() => setChosen(true)}>
                {<Icon />}
                {isActive && <span className="label">{label}</span>}
            </NavLink>

        </div>
    );
}

export default MenuButton;