import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

import blogData from '@/data/blog-data.json';
import activitiesData from '@/data/destinations-data.json';
import accommodationData from '@/data/favorite-destinations.json';
import restaurantData from '@/data/restaurant-data.json';
import calendarData from '@/data/calendar-data.json';
import otherDestinationsData from '@/data/other-destinations.json';
import independentBlogData from '@/data/independent-blog-data.json';
import aboutData from '@/data/about2-data.json';

const BASE_URL = 'https://nairobi.life';

export default function sitemap(): MetadataRoute.Sitemap {
  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/accommodation',
    '/activities',
    '/restaurants',
    '/calendar',
    '/other-destinations',
    '/cancel-policy',
  ].map((route) => ({
    url: `${BASE_URL}${route}/`, // trailingSlash: true
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Helper to flatten blog-like data structures
  const getBlogSlugs = (data: any) => {
    return [
      data.featuredPost,
      ...(data.recentPosts || []),
      ...(data.gridPosts || []),
    ].filter(post => post && typeof post === 'object' && 'slug' in post && typeof post.slug === 'string').map(post => post.slug);
  };

  // Dynamic routes
  // const blogRoutes = getBlogSlugs(blogData).map((slug) => ({
  //   url: `${BASE_URL}/blog/${slug}/`,
  //   lastModified: new Date(),
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.7,
  // }));

  const independentBlogRoutes = getBlogSlugs(independentBlogData).map((slug) => ({
    url: `${BASE_URL}/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const aboutRoutes = getBlogSlugs(aboutData).map((slug) => ({
    url: `${BASE_URL}/about/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const activityRoutes = activitiesData.items.map((item) => ({
    url: `${BASE_URL}/activities/${item.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const accommodationRoutes = accommodationData.items.map((item) => ({
    url: `${BASE_URL}/accommodation/${item.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const restaurantRoutes = restaurantData.items.map((item) => ({
    url: `${BASE_URL}/restaurants/${item.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const eventRoutes = calendarData.items.map((item) => ({
    url: `${BASE_URL}/calendar/${item.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const otherDestinationRoutes = otherDestinationsData.items.map((item) => ({
    url: `${BASE_URL}/other-destinations/${item.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    // ...blogRoutes,
    ...independentBlogRoutes,
    ...aboutRoutes,
    ...activityRoutes,
    ...accommodationRoutes,
    ...restaurantRoutes,
    ...eventRoutes,
    ...otherDestinationRoutes,
  ];
}
