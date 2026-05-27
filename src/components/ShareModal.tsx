'use client';

import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Facebook, Twitter, Linkedin, MessageCircle } from 'lucide-react';

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    url?: string;
}

export default function ShareModal({
    isOpen,
    onClose,
    title = "Share this page",
    url
}: ShareModalProps) {
    const [shareUrl, setShareUrl] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (url) {
            setShareUrl(url);
        } else if (typeof window !== 'undefined') {
            setShareUrl(window.location.href);
        }
    }, [url, isOpen]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const shareLinks = [
        {
            name: 'Facebook',
            icon: Facebook,
            color: 'hover:bg-blue-600',
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
        },
        {
            name: 'Twitter',
            icon: Twitter,
            color: 'hover:bg-sky-500',
            href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`
        },
        {
            name: 'WhatsApp',
            icon: MessageCircle,
            color: 'hover:bg-green-500',
            href: `https://wa.me/?text=${encodeURIComponent(shareUrl)}`
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            color: 'hover:bg-blue-700',
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
        }
    ];

    return (
        <>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <div
                            className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl w-full max-w-md pointer-events-auto overflow-hidden transform transition-all"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-zinc-800">
                                <h3 className="font-serif text-lg text-gray-900 dark:text-white">
                                    {title}
                                </h3>
                                <button
                                    onClick={onClose}
                                    className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-6">

                                {/* Social Icons */}
                                <div className="grid grid-cols-4 gap-4">
                                    {shareLinks.map((link) => (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex flex-col items-center gap-2 group"
                                        >
                                            <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-200 transition-colors ${link.color} hover:text-white`}>
                                                <link.icon size={24} />
                                            </div>
                                            <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                                                {link.name}
                                            </span>
                                        </a>
                                    ))}
                                </div>

                                {/* Copy Link */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Page Link
                                    </label>
                                    <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-zinc-800/50 rounded-lg border border-gray-200 dark:border-zinc-700 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                                        <input
                                            type="text"
                                            readOnly
                                            value={shareUrl}
                                            className="flex-1 bg-transparent border-none text-sm text-gray-600 dark:text-gray-300 focus:outline-none w-full"
                                        />
                                        <button
                                            onClick={handleCopy}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${copied
                                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:text-gray-200'
                                                }`}
                                        >
                                            {copied ? (
                                                <>
                                                    <Check size={14} />
                                                    Copied
                                                </>
                                            ) : (
                                                <>
                                                    <Copy size={14} />
                                                    Copy
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
