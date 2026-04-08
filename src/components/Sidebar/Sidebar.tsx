// Sidebar.tsx
import React, { useState } from 'react';
import './Sidebar.css';
import MenuButton from './SidebarButton/SidebarButton';
import { FiHome, FiBook, FiInfo, FiSettings, FiTrendingUp } from 'react-icons/fi';
import { SelectedTabProvider } from '../../context/MenuContext';
import SwitchThemeButton from '../ThemeSwitch/ThemeSwitch';

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
                        <MenuButton icon={FiHome} link={'/'} label={'Home'} isActive={isHovered} />
                        <MenuButton icon={FiBook} link={'/levels'} label={'Levels'} isActive={isHovered} />
                        <MenuButton icon={FiInfo} link={'/about'} label={'About'} isActive={isHovered} />
                        <MenuButton icon={FiTrendingUp} link={'/statistics'} label={'Statistics'} isActive={isHovered} />
                        <MenuButton icon={FiSettings} link={'/settings'} label={'Settings'} isActive={isHovered} />
                    </nav>
                    <div className='theme-container'>
                        <SwitchThemeButton />
                    </div>
                </div>
            </aside>

        </SelectedTabProvider>
    );
};

export default Sidebar;