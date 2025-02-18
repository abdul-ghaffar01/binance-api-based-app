"use client"

import React, { useState } from 'react'
import Logo from '../Logo'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { AnimatePresence, motion } from 'framer-motion'

const Navbar = () => {
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
        <nav className='w-full h-[60px] overflow-hidden p-2 flex items-center justify-between'>

            {/* Left */}
            <div className='h-full w-fit'>
                <Logo />
            </div>

            {/* Right for mobiles */}
            <div>
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
                        className='fixed top-0 left-0 bg-green-500 h-[100dvh] w-screen bg-box'>
                        <div className="cross-icon w-full text-right p-3">
                            <button onClick={hideNav}>
                                <CloseIcon sx={{ fontSize: "35px" }} />
                            </button>
                        </div>

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