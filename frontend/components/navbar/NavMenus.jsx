import Link from 'next/link'
import React from 'react'
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import { useThemeStore } from '@/store/themeStore';

const NavMenus = ({ menus, className }) => {
    const { toggleTheme, theme } = useThemeStore();
    return (
        <div className={className}>
            <ul className='flex flex-col'>
                {/* Adding theme icon manually */}
                <li className='w-full flex items-center justify-between p-3 text-lg font-bold'>

                    {/* Theme Text */}
                    <p className="text-foreground font-semibold">Theme</p>

                    {/* Icons of themes */}
                    <button onClick={() => { toggleTheme() }} className='flex items-center p-1 border border-border rounded-md text-sm'>
                        <div className={`flex-1 px-2 py-1 rounded-md ${theme === "dark" ? "bg-background" : ""}`}><WbSunnyIcon sx={{ fontSize: "18px" }} /></div>
                        <div className={`flex-1 px-2 py-1 rounded-md ${theme !== "dark" ? "bg-background" : ""}`}><BedtimeIcon sx={{ fontSize: "18px" }} /></div>
                    </button>

                </li>

                {/* All the menus from the data */}
                {menus.map((item, index) => {
                    return (
                        <li key={index}
                            className='w-full p-3 text-lg font-bold hover:bg-primary flex gap-x-3'
                        >
                            {item.icon}
                            <Link href={item.path}>{item.name}</Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default NavMenus