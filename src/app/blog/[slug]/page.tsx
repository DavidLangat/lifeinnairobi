import React from 'react';
import { notFound } from 'next/navigation';
import blogData from '@/data/blog-data.json';
import BlogPostClientPage from './BlogPostClientPage';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const allPosts = [
    blogData.featuredPost,
    ...blogData.recentPosts,
    ...blogData.gridPosts
  ];

  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  const allPosts = [
    blogData.featuredPost,
    ...blogData.recentPosts,
    ...blogData.gridPosts
  ];

  const post = allPosts.find(p => p.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.seoTitle,
    description: post.excerpt,
    keywords: ["Nairobi Blog", post.seoTitle, "Nairobi Travel", "Kenya Travel Guide"],
    alternates: {
      canonical: `https://nairobi.life/blog/${post.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: post.seoTitle,
      description: post.excerpt,
      url: `https://nairobi.life/blog/${post.slug}`,
      images: [post.image],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author || 'Nairobi Guide'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Flatten all posts to search for the requested slug
  const allPosts = [
    blogData.featuredPost,
    ...blogData.recentPosts,
    ...blogData.gridPosts
  ];

  // Logic to handle potential duplicates in data
  const post = allPosts.find(p => p.slug === slug) as {
    title: string;
    slug: string;
    excerpt: string;
    image: string;
    href: string;
    content?: any;
    author?: string;
    date?: string;
    category?: string;
    imageAlt?: string;
    imageAttribution?: string;
  } | undefined;

  if (!post) {
    return notFound();
  }

  // Use content from JSON
  if (!post.content) {
    return notFound();
  }

  // Get recent posts for the "Related Stories" section
  const recentPosts = blogData.recentPosts.slice(0, 4);

  return <BlogPostClientPage post={post} recentPosts={recentPosts} />;
}
