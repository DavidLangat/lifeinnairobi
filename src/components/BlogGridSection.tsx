'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import blogData from '@/data/blog-data.json';

export default function BlogGridSection() {
    return (
        <section className="py-20  text-gray-900 border-t border-gray-100">
            <div className="container mx-auto px-6 lg:px-12 max-w-7xl">

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {blogData.gridPosts.map((post, index) => (
                        <Link
                            href={post.href}
                            key={index} className="flex flex-col group">
                            {/* Image */}
                            <div className="relative w-full h-[250px] rounded-2xl overflow-hidden mb-6">
                                <Image
                                    
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>

                            {/* Content */}
                            <div className="space-y-4">
                                <h3 className=" text-background font-serif text-xl md:text-2xl leading-tight  group-hover:text-gray-600 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <div
                                    // href={post.href}
                                    className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-900 hover:opacity-60 transition-opacity"
                                >
                                    Read More <ArrowRight className="w-3 h-3" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>


            </div>
        </section>
    );
}
