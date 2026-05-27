import React from 'react';

export default function Loading() {
    return (
        <main className="bg-primary min-h-screen">
            {/* Page Header Skeleton */}
            <section className="relative w-full h-[60vh] min-h-[400px] flex items-center bg-gray-900 overflow-hidden">
                <div className="absolute inset-0 bg-gray-800 animate-pulse" />
                <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-7xl pt-20">
                    <div className="max-w-4xl space-y-6">
                        {/* Breadcrumb Skeleton */}
                        <div className="h-4 bg-white/10 rounded w-32" />
                        {/* Title Skeleton */}
                        <div className="h-16 md:h-20 bg-white/20 rounded-xl w-3/4" />
                    </div>
                </div>
            </section>

            {/* Content Skeleton */}
            <div className="container mx-auto px-6 lg:px-12 py-10 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 space-y-12">
                        <div className="space-y-4">
                            <div className="h-8 bg-gray-100 rounded-lg w-1/4" />
                            <div className="h-32 bg-gray-50 rounded-xl w-full" />
                        </div>
                        <div className="h-[400px] bg-gray-100 rounded-2xl w-full animate-pulse" />
                    </div>
                    <div className="lg:col-span-4">
                        <div className="h-[500px] bg-gray-50 rounded-3xl w-full animate-pulse" />
                    </div>
                </div>
            </div>
        </main>
    );
}
