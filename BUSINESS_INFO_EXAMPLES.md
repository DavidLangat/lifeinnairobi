# Example: Adding Business Information to JSON Data

This file shows examples of how to add `businessInfo` to posts in `independent-blog-data.json` to enhance schema markup.

## Example 1: Restaurant (The Fig & Olive)

Find the post in your JSON file and add the `businessInfo` field:

```json
{
  "title": "The Fig & Olive Restaurant – Tigoni's Iconic Countryside Café",
  "slug": "fig-olive-restaurant-tigoni",
  "excerpt": "Iconic Tigoni cafe loved for its relaxed elegance, dog-friendly policy, and family appeal",
  "image": "/v2/images/fig-olive.jpg",
  "category": "Restaurant",
  "author": "Tigoni",
  "date": "January 1, 2026",
  "businessInfo": {
    "telephone": "+254740726783",
    "address": {
      "streetAddress": "Raini Goldhandas Road",
      "addressLocality": "Tigoni",
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
  },
  "content": {
    // ... existing content ...
  }
}
```

## Example 2: Tea Farm Tour (Kiambethu)

```json
{
  "title": "Kiambethu Tea Farm Tour – Kenya's Historic Tea Experience",
  "slug": "kiambethu-tea-farm-tour",
  "excerpt": "One of Kenya's oldest tea farms, providing guided tea experiences with plantation walks and tastings",
  "category": "Tour",
  "businessInfo": {
    "telephone": "+254740726783",
    "address": {
      "addressLocality": "Tigoni",
      "addressRegion": "Limuru, Kiambu County",
      "addressCountry": "KE"
    },
    "geo": {
      "latitude": -1.1234,
      "longitude": 36.5678
    },
    "priceRange": "$$"
  }
}
```

## Example 3: Spa/Wellness (Serenity Spa)

```json
{
  "title": "Serenity Spa Tigoni – Highland Wellness Retreat",
  "slug": "serenity-spa-tigoni",
  "excerpt": "Tucked away in the highlands, offering massages, spa treatments, and wellness experiences",
  "category": "Spa",
  "businessInfo": {
    "telephone": "+254740726783",
    "address": {
      "addressLocality": "Tigoni",
      "addressRegion": "Limuru, Kiambu County",
      "addressCountry": "KE"
    },
    "priceRange": "$$",
    "openingHours": [
      "Monday 10:00-18:00",
      "Tuesday 10:00-18:00",
      "Wednesday 10:00-18:00",
      "Thursday 10:00-18:00",
      "Friday 10:00-18:00",
      "Saturday 09:00-19:00",
      "Sunday 09:00-19:00"
    ]
  }
}
```

## Example 4: Accommodation (Brackenhurst)

```json
{
  "title": "Brackenhurst Conference and Retreat Centre",
  "slug": "brackenhurst-peaceful-sanctuary-tigoni",
  "excerpt": "A peaceful sanctuary nestled amidst rolling tea fields and indigenous forest",
  "category": "Accommodation",
  "businessInfo": {
    "telephone": "+254724256721",
    "address": {
      "streetAddress": "Limuru–Banana Road",
      "addressLocality": "Tigoni",
      "addressRegion": "Limuru, Kiambu County",
      "addressCountry": "KE"
    },
    "geo": {
      "latitude": -1.1234,
      "longitude": 36.5678
    },
    "priceRange": "$$"
  }
}
```

## Field Explanations

### Required Fields (Always Include)

- `telephone`: Phone number in international format (+254...)
- `address.addressLocality`: City/area (e.g., "Tigoni")
- `address.addressRegion`: Region/county (e.g., "Limuru, Kiambu County")
- `address.addressCountry`: Country code (e.g., "KE" for Kenya)

### Optional But Recommended

- `address.streetAddress`: Street address if known
- `address.postalCode`: Postal code if applicable
- `geo.latitude` and `geo.longitude`: GPS coordinates (highly recommended for local SEO)
- `priceRange`: $ (budget), $$ (moderate), $$$ (expensive), $$$$ (luxury)

### Category-Specific Fields

- **Restaurants**: `servesCuisine` (array of cuisine types), `openingHours`
- **Hotels/Lodging**: `openingHours`, `priceRange`
- **Tours/Activities**: `priceRange`
- **Spas**: `openingHours`, `priceRange`

## Opening Hours Format

Opening hours must follow this exact format:

```
"DayOfWeek HH:MM-HH:MM"
```

Examples:

- `"Monday 09:00-18:00"`
- `"Saturday 08:00-20:00"`
- `"Sunday 10:00-17:00"`

## Getting GPS Coordinates

1. Go to [Google Maps](https://www.google.com/maps)
2. Search for the business location
3. Right-click on the exact location
4. Click the coordinates to copy them
5. First number is latitude, second is longitude

Example: `-1.1234, 36.5678`

- Latitude: `-1.1234`
- Longitude: `36.5678`

## Price Range Guide

- `$` = Budget-friendly (under KES 1,000)
- `$$` = Moderate (KES 1,000 - 3,000)
- `$$$` = Expensive (KES 3,000 - 10,000)
- `$$$$` = Luxury (over KES 10,000)

## Quick Checklist

Before adding businessInfo to a post:

- [ ] Have accurate phone number
- [ ] Know the general location (Tigoni is fine if no street address)
- [ ] Have GPS coordinates (use Google Maps)
- [ ] Know approximate price range
- [ ] Have opening hours (if applicable)
- [ ] Know cuisine types (for restaurants)

## Priority Posts to Update

Start with these high-value posts:

1. **Restaurants**
   - The Fig & Olive
   - Como Restaurant
   - Nifty Cafe & Wine Bar
   - Camellia Gardens
   - Muna Tree Cafe

2. **Tea Farms**
   - Kiambethu Tea Farm
   - Ravenswood Tea Estate
   - Gathoni Tea Farm
   - Teagoni Tea Farm

3. **Activities**
   - Twin Rivers Resort
   - Redhill Go-Karting
   - Sensory Garden Tigoni

4. **Wellness**
   - Serenity Spa Tigoni
   - Brackenhurst Conference Centre

## Notes

- You don't need to add `businessInfo` to every post
- Focus on posts about specific businesses/locations
- General guide posts (like "Things to Do in Tigoni") don't need businessInfo
- The schema component will work fine without businessInfo, using basic post data
