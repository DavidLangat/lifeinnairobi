# LocalBusiness Schema Markup Implementation Guide

## Overview

This guide explains how to implement LocalBusiness schema markup on your Nairobi Life website to improve SEO and visibility in rich search results.

## What is Schema Markup?

Schema markup (also known as structured data) is code that helps search engines understand your content better. For local businesses, it can help you appear in:

- **Google Maps** with enhanced business information
- **Rich search results** with ratings, hours, and contact info
- **Local Pack** (the map + 3 businesses shown for local searches)
- **Knowledge Panels** on the right side of search results

## Implementation Steps

### 1. Component Created

We've created `src/components/LocalBusinessSchema.tsx` which generates JSON-LD structured data.

### 2. Adding Schema to Blog Posts

Update your `src/app/[slug]/page.tsx` to include the schema component:

```tsx
import LocalBusinessSchema from "@/components/LocalBusinessSchema";

// Inside your component, add the schema in the <head> or at the top of your page
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ... existing code ...

  return (
    <main className="bg-primary min-h-screen">
      {/* Add schema markup */}
      <LocalBusinessSchema
        name={post.title}
        description={post.excerpt}
        image={post.image}
        url={`https://Nairobilife.com/${post.slug}`}
        category={post.category}
      />

      {/* Rest of your page content */}
    </main>
  );
}
```

### 3. Enhancing Blog Data with Business Information

To make the schema more effective, add business-specific fields to your `independent-blog-data.json`:

```json
{
  "title": "The Fig & Olive Restaurant",
  "slug": "fig-olive-restaurant",
  "excerpt": "...",
  "category": "Restaurant",
  "businessInfo": {
    "telephone": "+254 XXX XXX XXX",
    "address": {
      "streetAddress": "Raini Goldhandas Road",
      "addressLocality": "Nairobi",
      "addressRegion": "Limuru, Kiambu County",
      "postalCode": "00217",
      "addressCountry": "KE"
    },
    "geo": {
      "latitude": -1.1234,
      "longitude": 36.5678
    },
    "priceRange": "$$",
    "openingHours": [
      "Monday 09:00-18:00",
      "Tuesday 09:00-18:00",
      "Wednesday 09:00-19:00",
      "Thursday 09:00-18:00",
      "Friday 09:00-18:00",
      "Saturday 08:00-20:00",
      "Sunday 08:00-20:00"
    ],
    "servesCuisine": ["Kenyan", "International", "Farm-to-Table"]
  }
}
```

### 4. Schema Types Supported

The component automatically detects the appropriate schema type based on category:

| Category Keywords           | Schema Type             |
| --------------------------- | ----------------------- |
| restaurant, cafe, dining    | Restaurant              |
| hotel, accommodation, lodge | LodgingBusiness         |
| spa, wellness               | HealthAndBeautyBusiness |
| tour, activity              | TouristAttraction       |
| _default_                   | LocalBusiness           |

## Example Implementations

### Example 1: Restaurant (The Fig & Olive)

```tsx
<LocalBusinessSchema
  name="The Fig & Olive Restaurant"
  description="Iconic Nairobi cafe loved for its relaxed elegance, dog-friendly policy, and family appeal"
  image="https://ik.imagekit.io/w1yofme6f/Nairobilife/v2/images/fig-olive.jpg"
  url="https://Nairobilife.com/restaurants/the-fig-and-olive"
  category="Restaurant"
  telephone="+254740726783"
  priceRange="$$"
  servesCuisine={["Kenyan", "International", "Farm-to-Table"]}
  openingHours={[
    "Monday 09:00-18:00",
    "Tuesday 09:00-18:00",
    "Wednesday 09:00-19:00",
    "Thursday 09:00-18:00",
    "Friday 09:00-18:00",
    "Saturday 08:00-20:00",
    "Sunday 08:00-20:00",
  ]}
  geo={{
    latitude: -1.1234,
    longitude: 36.5678,
  }}
/>
```

### Example 2: Tea Farm Tour

```tsx
<LocalBusinessSchema
  name="Kiambethu Tea Farm Tour"
  description="One of Kenya's oldest tea farms, providing guided tea experiences with plantation walks and tastings"
  image="https://ik.imagekit.io/w1yofme6f/Nairobilife/v2/images/kiambethu.jpg"
  url="https://Nairobilife.com/blog/kiambethu-tea-farm-tour"
  category="Tour"
  telephone="+254740726783"
  priceRange="$$"
  geo={{
    latitude: -1.1234,
    longitude: 36.5678,
  }}
/>
```

### Example 3: Spa/Wellness

```tsx
<LocalBusinessSchema
  name="Serenity Spa Nairobi"
  description="Tucked away in the highlands, offering massages, spa treatments, and wellness experiences"
  image="https://ik.imagekit.io/w1yofme6f/Nairobilife/v2/images/serenity-spa.jpg"
  url="https://Nairobilife.com/other-destinations/serenity-spa-Nairobi"
  category="Spa"
  telephone="+254740726783"
  priceRange="$$"
/>
```

## Testing Your Schema

After implementation, test your schema markup using:

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Schema Markup Validator**: https://validator.schema.org/
3. **Google Search Console**: Monitor how Google sees your structured data

## Best Practices

1. **Be Accurate**: Only include information that's actually on the page
2. **Keep Updated**: Update hours, prices, and contact info regularly
3. **Use Specific Types**: Use the most specific schema type (Restaurant vs LocalBusiness)
4. **Add Reviews**: If you have reviews, add aggregateRating
5. **Include Images**: High-quality images improve rich results
6. **Geo Coordinates**: Always include latitude/longitude for better local SEO

## Common Fields Explained

- **name**: Business or attraction name
- **description**: Brief description (160 characters recommended)
- **image**: High-quality image URL (minimum 1200px wide)
- **url**: Canonical URL of the page
- **telephone**: Phone number in international format (+254...)
- **priceRange**: $ (budget), $$ (moderate), $$$ (expensive), $$$$ (luxury)
- **openingHours**: Array of "DayOfWeek HH:MM-HH:MM" format
- **geo**: Latitude and longitude coordinates
- **address**: Full postal address

## Next Steps

1. Add `businessInfo` fields to relevant posts in `independent-blog-data.json`
2. Update the blog page template to use the schema component
3. Test with Google's Rich Results Test
4. Monitor performance in Google Search Console
5. Consider adding review schema for businesses with ratings

## Resources

- [Schema.org LocalBusiness](https://schema.org/LocalBusiness)
- [Google Search Central - Structured Data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [Schema Markup Generator](https://technicalseo.com/tools/schema-markup-generator/)
