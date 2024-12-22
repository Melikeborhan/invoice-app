'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Hamburger from 'hamburger-react';

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div>
      <nav className="px-5 py-10 bg-blue-400 bg-opacity-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Sol tarafta logo */}
          <div className="flex items-center space-x-4">
            <div className="text-lg font-semibold">
              <span>LOGO</span>
            </div>
          </div>

          {/* Hamburger menu button */}
          <div className="lg:hidden">
            <Hamburger toggled={isOpen} toggle={setOpen} />
          </div>

          {/* Ortada Home, Invoice, Data başlıkları (sadece büyük ekranlarda) */}
          <div className="hidden lg:flex space-x-10 text-xl">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <Link href="/Invoices" className="hover:text-blue-600">
              Invoice
            </Link>
            <Link href="/Data" className="hover:text-blue-600">
              Data
            </Link>
          </div>

          {/* Sağ tarafta Sign In butonu (sadece büyük ekranlarda) */}
          <div className="hidden lg:flex">
            <Link href="/Login" className="hover:text-blue-600">
              Login
            </Link>
          </div>
        </div>

        {/* Mobil cihazlarda menü öğeleri */}
        <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'} mt-4 space-y-4 text-2xl`}>
          <Link href="/" className="block  hover:text-blue-600">
            Home
          </Link>
          <Link href="/Invoices" className="block  hover:text-blue-600">
            Invoice
          </Link>
          <Link href="/Data" className="block  hover:text-blue-600">
            Data
          </Link>
          <Link href="/Login" className="block  hover:text-blue-600">
            Login
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;