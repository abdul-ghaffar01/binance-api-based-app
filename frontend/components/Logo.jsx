import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
    return (
        <Link href="/" className='flex gap-[10px] items-center h-full w-auto'>
            {/* Logo image */}
            <div className="img">
                <Image
                    className='h-full w-auto'
                    src="/logo.png" width={40} height={40} alt='Logo'
                />
            </div>

            {/* Logo text */}
            <div className="text">
                <h1 className='text-primary text-2xl font-bold select-none'>Binanify</h1>
            </div>
        </Link>
    )
}

export default Logo