import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 mt-10">
            <span className="text-sm text-gray-500 sm:text-center">© {new Date().getFullYear()} <a href="https://github.com/mine-treasure/" className="hover:underline">Mine Treasure</a>. All Rights Reserved.</span>
            <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 sm:mt-0">
                <li>
                    <a href="https://modrinth.com/datapack/mine-treasure" className="mr-4 hover:underline md:mr-6">Datapack</a>
                </li>
                <li>
                    <a href="https://github.com/mine-treasure/mine-treasure" className="mr-4 md:mr-6">Pack github</a>
                </li>
                <li>
                    <a href="https://github.com/Mine-Treasure/Mine-Treasure-Website" className="mr-4 md:mr-6">Site github</a>
                </li>
                <li className="hover:bg-gray-100 rounded-lg">
                    <Link className="mr-4 md:mr-6" href="https://ko-fi.com/frozytime" target="_blank"><Image src="/images/kofi.webp" className="inline-block" alt="Ko-fi" height={48} width={48} /><span className="ml-2">Support datapack author</span></Link>
                </li>
                <li className="hover:bg-gray-100 rounded-lg">
                    <Link href="https://ko-fi.com/supercrafter100" className="mr-4 md:mr-6" target="_blank"><Image src="/images/kofi.webp" className="inline-block" alt="Ko-fi" height={48} width={48} /><span className="ml-2">Support website author</span></Link>
                </li>
            </ul>
        </footer>
    )
}

export default Footer