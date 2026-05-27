'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import blogData from '@/data/blog-data.json';

export default function BlogSection() {
    return (
        <section className="py-20 lg:py-28 text-gray-900">
            <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                    {/* Left Column: Header & Featured Post */}
                    <Link className="flex flex-col gap-12"
                        href={blogData.featuredPost.href}

                    >
                        {/* Header */}
                        <div className="space-y-6">
                            <h2 className=" text-background  hover:text-accent font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1]">
                                {blogData.heading}
                            </h2>
                            <p className="text-gray-500 text-base leading-relaxed">
                                {blogData.description}
                            </p>
                        </div>

                        {/* Featured Post Card */}
                        <div className="group relative h-[370px] lg:h-[370px] w-full rounded-3xl overflow-hidden cursor-pointer">
                            {/* Background Image */}
                            <Image
                                
                                src={blogData.featuredPost.image}
                                alt={blogData.featuredPost.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-90" />

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 p-8 md:p-10 text-white space-y-4">
                                <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl leading-tight">
                                    {blogData.featuredPost.title}
                                </h3>
                                <div
                                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-gray-300 transition-colors mt-2"
                                >
                                    Read More <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Right Column: Recent Posts List */}
                    <div className="flex flex-col gap-8 justify-start">
                        {blogData.recentPosts.map((post, index) => (
                            <Link
                                href={post.href}

                                key={index} className="flex flex-col sm:flex-row gap-6 items-start group ">
                                {/* Thumbnail */}
                                <div className="relative w-full sm:w-[240px] h-[180px] shrink-0 rounded-2xl overflow-hidden">
                                    <Image
                                        
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>

                                {/* Content */}
                                <div className="space-y-3">
                                    <h4 className=" text-background font-serif text-xl md:text-2xl leading-tight group-hover:text-gray-600 transition-colors">
                                        {post.title}
                                    </h4>
                                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                    <div
                                        className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-900 hover:opacity-60 transition-opacity"
                                    >
                                        Read More <ArrowRight className="w-3 h-3" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
