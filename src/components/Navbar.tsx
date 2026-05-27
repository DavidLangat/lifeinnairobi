'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, ChevronDown, Menu, X } from 'lucide-react';
import Image from 'next/image';
import navbarData from '@/data/navbar-data.json';

interface NavItem {
  name: string;
  href: string;
  dropdown?: {
    name: string;
    href: string;
  }[];
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Cast imported data to typed array
  const navLinks: NavItem[] = navbarData;

  return (
    <nav className="absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 lg:pl-6 lg:pr-12 max-w-7xl ">
        <div className="relative flex items-center justify-between py-6 ">

          {/* Logo */}
          <div className="flex-shrink-0 " >
            <Link href="/">
              <Image
                src="/image/logo.png"
                alt="Nairobi Logo"
                width={260}
                height={60}
                className="w-auto h-12 md:h-14 lg:h-[60px] "
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-2 text-primary border border-primary rounded-full px-2 py-1.5 bg-primary/5">
              {navLinks.map((link) => {
                const isActive = link.name === 'Home'; // Basic active state check, can be improved
                return (
                  <li key={link.name} className="relative group">
                    <Link
                      href={link.href}
                      className={`flex items-center gap-1 font-sans text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full transition-all duration-300 ${isActive
                        ? 'bg-primary/20 text-primary'
                        : 'text-primary/90 hover:bg-primary hover:text-gray-900 group-hover:bg-primary group-hover:text-gray-900'
                        }`}
                    >
                      {link.name}
                      {link.dropdown && (
                        <ChevronDown className="w-3 h-3 group-hover:text-gray-900 transition-colors" />
                      )}
                    </Link>
                    {/* Dropdown Menu */}
                    {link.dropdown && (
                      
                      <div className="absolute top-full left-0 mt-2 w-64 bg-primary text-gray-800 rounded-3xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left p-2 z-50">
                        <ul className="flex flex-col gap-1">
                          {link.dropdown.map((subItem) => (

                            <li key={subItem.name}>
                              {subItem.name === 'Activitiesd' ? (
                             <div
                             className='flex flex-row gap-1'
                             >

                                <Link
                                  href={subItem.href}
                                  className="block px-4 py-3 hover:bg-background hover:text-primary rounded-2xl cursor-pointer text-sm font-bold tracking-widest uppercase transition-colors"
                                >
                                  {subItem.name}
                                </Link>
                                <div 
                                />
                                <Link
                                  href="/calendar"
                                  className="block px-4 py-3 hover:bg-background hover:text-primary hover:rounded-2xl cursor-pointer text-sm font-bold tracking-widest uppercase transition-colors border-l border-background"
                                >
                                  calendar
                                </Link>
                                </div>
                              ) : (
                                
                                <Link
                                  href={subItem.href}
                                  className="block px-4 py-3 hover:bg-background hover:text-primary rounded-2xl cursor-pointer text-sm font-bold tracking-widest uppercase transition-colors"
                                >
                                  {subItem.name}
                                </Link>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right Action & Mobile Toggle */}
          <div className="flex items-center gap-4">

            {/* WhatsApp Chat Button (Desktop) */}
            <div className="hidden lg:block">
              <button
                onClick={() => window.open('https://wa.me/254740726783', '_blank')}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-background hover:bg-background hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-primary p-2"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-primary shadow-xl lg:hidden p-4 animate-in slide-in-from-top-2">
          <ul className="flex flex-col gap-4 text-gray-900">
            {navLinks.map((link) => (
              <li key={link.name}>
                <div className="flex flex-col">
                  <Link
                    href={link.href}
                    className="flex items-center justify-between font-sans text-base font-medium py-2 border-b border-gray-100"
                    onClick={() => !link.dropdown && setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                    {link.dropdown && (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </Link>
                  {/* Mobile Dropdown Items (Basic Implementation: Always visible if exists, or distinct toggle. For now, flat list below parent) */}
                  {link.dropdown && (
                    <ul className="pl-4 mt-2 space-y-2">
                      {link.dropdown.map(subItem => (
                        <li key={subItem.name}>
                          {subItem.name === 'Activitiesd' ? (
                            <div className="flex flex-col gap-2">
                              <Link
                                href={subItem.href}
                                className="block text-sm text-gray-600 py-1"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                              <Link
                                href="/calendar"
                                className="block text-sm text-gray-600 py-1"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                Calendar
                              </Link>
                            </div>
                          ) : (
                            <Link
                              href={subItem.href}
                              className="block text-sm text-gray-600 py-1"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          )}
            
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
