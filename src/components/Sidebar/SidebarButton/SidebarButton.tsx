import React, { useState } from "react";
import type { IconType } from "react-icons";
import { NavLink } from "react-router-dom";
import "./SidebarButton.css";
import { useSelectedTabProvider } from "../../../context/MenuContext";

interface MenuButtonProps {
    icon: IconType;
    link: string;
    label: string;
    isActive: boolean;
}

function MenuButton({ icon: Icon, link, label, isActive }: MenuButtonProps) {
    const [selectedTab, setSelectedTab] = useSelectedTabProvider();

    const isSelected = selectedTab == label;
    console.log('label: ', label, `menu-item ${isActive ? 'active' : ''} ${isSelected ? 'isSelected' : ''}`);
    const handleClick = () => {
        setSelectedTab(label);
    };
    return (
        <div className="menu-item">
            <NavLink to={link} className={() => `menu-item ${isActive ? 'active' : ''} ${isSelected ? 'isSelected' : ''}`} onClick={handleClick}>
                {<Icon />}
                {isActive && <span className="label">{label}</span>}
            </NavLink>

        </div>
    );
}

export default MenuButton; 