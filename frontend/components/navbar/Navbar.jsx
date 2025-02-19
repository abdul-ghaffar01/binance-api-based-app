"use client"

import React, { useState } from 'react'
import Logo from '../Logo'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { AnimatePresence, motion } from 'framer-motion'
import Button from '../ui/Button';
import { useRouter } from 'next/navigation';
import menus from './menus.data';
import NavMenus from './NavMenus';
const Navbar = () => {
    const router = useRouter();
    const [isShowing, setIsShowing] = useState(false);

    // Function to show mobile nav
    const showNav = () => {
        setIsShowing(true)
    }

    // Function to hide mobile nav
    const hideNav = () => {
        setIsShowing(false);
    }

    return (
        <nav className='sticky top-0 bg-background text-foreground w-full h-[60px] overflow-hidden p-2 flex items-center justify-between z-[999]'>

            {/* Left */}
            <div className='h-full w-fit'>
                <Logo />
            </div>

            {/* Right for mobiles */}
            <div className='md:hidden'>
                <button onClick={showNav}>
                    <MenuIcon sx={{ fontSize: "35px" }} />
                </button>
            </div>

            {/* Mobile navbar */}
            <AnimatePresence >
                {isShowing && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "-100%" }}
                        transition={{ duration: 0.3 }}
                        className='fixed top-0 left-0 h-[100dvh] w-screen bg-box'>

                        <div className="cross-icon w-full text-right p-3 h-[60px]">

                            {/* Close button */}
                            <button onClick={hideNav}>
                                <CloseIcon sx={{ fontSize: "35px" }} />
                            </button>
                        </div>

                        {/* Login and signup buttons */}
                        <div className='flex items-center justify-center gap-[10px] p-3'>

                            {/* Login button */}
                            <Button
                                text="Login"
                                variant='outline'
                                className='flex-1'
                                onClick={() => { router.push("/") }} />

                            {/* Signup button */}
                            <Button
                                text="Singup"
                                variant='primary'
                                className='flex-1'
                                onClick={() => { router.push("/signup") }} />
                        </div>

                        {/* Menus */}
                        <NavMenus className="" menus={menus} />

                    </motion.div>
                )}
            </AnimatePresence>

            {/* Right for desktops */}
            <div className='hidden'>

            </div>

        </nav>
    )
}

export default Navbar