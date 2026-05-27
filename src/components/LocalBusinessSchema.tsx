import React from 'react';

interface LocalBusinessSchemaProps {
    name: string;
    description: string;
    image?: string;
    url: string;
    address?: {
        streetAddress?: string;
        addressLocality: string;
        addressRegion: string;
        postalCode?: string;
        addressCountry: string;
    };
    geo?: {
        latitude: number;
        longitude: number;
    };
    telephone?: string;
    priceRange?: string;
    openingHours?: string[];
    servesCuisine?: string[];
    category?: string;
}

/**
 * LocalBusinessSchema Component
 * 
 * Generates JSON-LD structured data for LocalBusiness schema markup.
 * This helps search engines understand your business information and
 * can improve visibility in rich search results.
 * 
 * @see https://schema.org/LocalBusiness
 */
export default function LocalBusinessSchema({
    name,
    description,
    image,
    url,
    address = {
        addressLocality: 'Nairobi',
        addressRegion: 'Limuru, Kiambu County',
        addressCountry: 'KE'
    },
    geo,
    telephone,
    priceRange,
    openingHours,
    servesCuisine,
    category
}: LocalBusinessSchemaProps) {

    // Determine the most appropriate schema type based on category
    const getSchemaType = () => {
        const categoryLower = category?.toLowerCase() || '';

        if (categoryLower.includes('restaurant') || categoryLower.includes('cafe') || categoryLower.includes('dining')) {
            return 'Restaurant';
        }
        if (categoryLower.includes('hotel') || categoryLower.includes('accommodation') || categoryLower.includes('lodge')) {
            return 'LodgingBusiness';
        }
        if (categoryLower.includes('spa') || categoryLower.includes('wellness')) {
            return 'HealthAndBeautyBusiness';
        }
        if (categoryLower.includes('tour') || categoryLower.includes('activity')) {
            return 'TouristAttraction';
        }

        return 'LocalBusiness';
    };

    const schemaData = {
        '@context': 'https://schema.org',
        '@type': getSchemaType(),
        name,
        description,
        ...(image && { image }),
        url,
        address: {
            '@type': 'PostalAddress',
            ...address
        },
        ...(geo && {
            geo: {
                '@type': 'GeoCoordinates',
                latitude: geo.latitude,
                longitude: geo.longitude
            }
        }),
        ...(telephone && { telephone }),
        ...(priceRange && { priceRange }),
        ...(openingHours && {
            openingHoursSpecification: openingHours.map(hours => ({
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: hours.split(' ')[0],
                opens: hours.split(' ')[1],
                closes: hours.split(' ')[2]
            }))
        }),
        ...(servesCuisine && { servesCuisine }),
        // Additional properties for Nairobi area
        areaServed: {
            '@type': 'City',
            name: 'Nairobi'
        },
        // Aggregate rating can be added here if you have reviews
        // aggregateRating: {
        //   '@type': 'AggregateRating',
        //   ratingValue: '4.5',
        //   reviewCount: '100'
        // }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
    );
}
