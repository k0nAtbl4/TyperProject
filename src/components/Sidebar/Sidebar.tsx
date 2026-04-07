// Sidebar.tsx
import React, { useState } from 'react';
import './Sidebar.css';
import MenuButton from './SidebarButton/SidebarButton';
import type { IconBaseProps } from 'react-icons';
import { MdMenu, MdOutlineQuestionMark } from 'react-icons/md';
import { HiHome } from 'react-icons/hi';
import { BsListCheck } from 'react-icons/bs';
import SwitchThemeButton from '../ThemeSwitch/ThemeSwitch';
import { SlSettings } from 'react-icons/sl';
import { SelectedTabProvider } from '../../context/MenuContext';

const Sidebar: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);
    console.log('Текущая вкладка:', isHovered);
    return (
        <SelectedTabProvider>
            <aside
                className={`sidebar ${isHovered ? 'expanded' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className='linksContainer'>
                    <nav className='navContainer'>
                        <MenuButton icon={HiHome} link={'/'} label={'Home'} isActive={isHovered} />
                        <MenuButton icon={BsListCheck} link={'/levels'} label={'Levels'} isActive={isHovered} />
                        <MenuButton icon={MdOutlineQuestionMark} link={'/about'} label={'About'} isActive={isHovered} />
                        <MenuButton icon={SlSettings} link={'/settings'} label={'Settings'} isActive={isHovered} />
                        {/* <h1>
                            {isHovered ? 't' : 'f'}
                        </h1> */}
                    </nav>
                </div>
            </aside>

        </SelectedTabProvider>
    );
};

export default Sidebar;