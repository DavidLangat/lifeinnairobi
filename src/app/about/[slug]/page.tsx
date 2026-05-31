import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import aboutData from '@/data/about-data.json';
import AboutDetailClientPage from './AboutDetailClientPage';

export async function generateStaticParams() {
  return aboutData.pages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  const page = aboutData.pages.find((p) => p.slug === slug);

  if (!page) {
      return {
          title: 'Not Found | Nairobi',
          description: 'The requested page could not be found.',
      };
  }

  return {
      title: `${page.title} `,
      description: page.excerpt || `Read about ${page.title} in Nairobi.`,
      keywords: [page.title, 'Nairobi', 'Travel', 'Kenya'],
      alternates: {
          canonical: `https://nairobi.life/about/${slug}`,
      },
      openGraph: {
          title: `${page.title} `,
          description: page.excerpt || `Read about ${page.title} in Nairobi.`,
          url: `https://nairobi.life/about/${slug}`,
          type: 'article',
          images: [
              {
                  url: page.image,
                  width: 1200,
                  height: 630,
                  alt: (page as any).imageAlt || page.title,
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
          title: page.title,
          description: page.excerpt || `Read about ${page.title} in Nairobi.`,
          images: [page.image],
      },
  };
}

export default async function AboutSubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const page = aboutData.pages.find(p => p.slug === slug) as {
    title: string;
    slug: string;
    excerpt: string;
    image: string;
    href: string;
    content?: any;
    imageAlt?: string;
    imageAttribution?: string;
  } | undefined;

  if (!page) {
    return notFound();
  }

  // Use content from JSON
  const content = page.content;

  if (!content) {
    return notFound();
  }

  // Prepare props
  const pageProps = {
      ...page,
      content,
      imageAlt: (page as any).imageAlt,
      imageAttribution: (page as any).imageAttribution,
  };

  return <AboutDetailClientPage post={pageProps as any} />;
}
