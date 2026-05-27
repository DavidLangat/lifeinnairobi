import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import blogData from '@/data/about2-data.json';
import AboutDetailClientPage from './AboutDetailClientPage';

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

  const post = allPosts.find((p) => p.slug === slug);

  if (!post) {
      return {
          title: 'Not Found | Nairobi',
          description: 'The requested page could not be found.',
      };
  }

  return {
      title: `${post.title} `,
      description: post.excerpt || `Read about ${post.title} in Nairobi.`,
      keywords: [post.title, 'Nairobi', post.category || 'Travel', 'Kenya'],
      alternates: {
          canonical: `https://nairobi.life/about/${slug}`,
      },
      openGraph: {
          title: `${post.title} `,
          description: post.excerpt || `Read about ${post.title} in Nairobi.`,
          url: `https://nairobi.life/about/${slug}`,
          type: 'article',
          images: [
              {
                  url: post.image,
                  width: 1200,
                  height: 630,
                  alt: (post as any).imageAlt || post.title,
              },
          ],
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
      twitter: {
          card: 'summary_large_image',
          title: post.title,
          description: post.excerpt || `Read about ${post.title} in Nairobi.`,
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
  const content = post.content;

  if (!content) {
    return notFound();
  }

  // Prepare props
  const postProps = {
      ...post,
      content, // ensure content is passed correctly
      imageAlt: (post as any).imageAlt,
      imageAttribution: (post as any).imageAttribution,
  };

  return <AboutDetailClientPage post={postProps} />;
}
