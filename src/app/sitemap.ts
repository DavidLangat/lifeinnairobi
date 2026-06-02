import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

import activitiesData from '@/data/destinations-data.json';
import accommodationData from '@/data/favorite-destinations.json';
import restaurantData from '@/data/restaurant-data.json';
import calendarData from '@/data/calendar-data.json';
import otherDestinationsData from '@/data/other-destinations.json';
import independentBlogData from '@/data/independent-blog-data.json';
import aboutData from '@/data/about-data.json';

// Category Data files
import eatData from '@/data/eat-data.json';
import golfData from '@/data/golf-data.json';
import padelData from '@/data/padel-data.json';
import shopData from '@/data/shop-data.json';
import stayData from '@/data/stay-data.json';
import partyData from '@/data/party-data.json';
import hotelData from '@/data/hotel-data.json';

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

  // Helper to map simple list objects containing slugs (like pages in about-data.json)
  const getAboutSlugs = (data: any): string[] => {
    return (data.pages || []).filter((page: any) => page && page.slug).map((page: any) => page.slug);
  };

  // Dynamic routes
  const independentBlogRoutes = getBlogSlugs(independentBlogData).map((slug: string) => ({
    url: `${BASE_URL}/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const aboutRoutes = getAboutSlugs(aboutData).map((slug: string) => ({
    url: `${BASE_URL}/about/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const aboutNairobiRoutes = getAboutSlugs(aboutData).map((slug: string) => ({
    url: `${BASE_URL}/about-nairobi/${slug}/`,
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

  const thingsToDoRoutes = activitiesData.items.map((item) => ({
    url: `${BASE_URL}/things-to-do-in-nairobi/${item.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const bestThingsToDoRoutes = activitiesData.items.map((item) => ({
    url: `${BASE_URL}/best-things-to-do-in-nairobi/${item.slug}/`,
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

  const accommodationNairobiRoutes = stayData.items.map((item) => ({
    url: `${BASE_URL}/accommodation-in-nairobi/${item.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const hotelsNairobiRoutes = hotelData.items.map((item) => ({
    url: `${BASE_URL}/hotels-in-nairobi/${item.slug}/`,
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

  const restaurantsNairobiRoutes = eatData.items.map((item) => ({
    url: `${BASE_URL}/restaurants-in-nairobi/${item.slug}/`,
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

  const golfRoutes = golfData.items.map((item) => ({
    url: `${BASE_URL}/golf-clubs-in-nairobi/${item.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const padelRoutes = padelData.items.map((item) => ({
    url: `${BASE_URL}/padel-courts-in-nairobi/${item.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const shopRoutes = shopData.items.map((item) => ({
    url: `${BASE_URL}/shops-in-nairobi/${item.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const clubRoutes = partyData.items.map((item) => ({
    url: `${BASE_URL}/clubs-in-nairobi/${item.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...independentBlogRoutes,
    ...aboutRoutes,
    ...aboutNairobiRoutes,
    ...activityRoutes,
    ...thingsToDoRoutes,
    ...bestThingsToDoRoutes,
    ...accommodationRoutes,
    ...accommodationNairobiRoutes,
    ...hotelsNairobiRoutes,
    ...restaurantRoutes,
    ...restaurantsNairobiRoutes,
    ...eventRoutes,
    ...otherDestinationRoutes,
    ...golfRoutes,
    ...padelRoutes,
    ...shopRoutes,
    ...clubRoutes,
  ];
}
