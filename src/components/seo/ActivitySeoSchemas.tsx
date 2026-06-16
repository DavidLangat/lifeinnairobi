import React from 'react';

interface FAQ {
  question: string;
  answer: string;
}

interface ActivitySeoSchemasProps {
  activity: {
    name: string;
    image: string;
    shortDescription: string;
    price?: number;
  };
  faqs?: FAQ[];
  categoryName?: string;
  categoryUrl?: string;
  url?: string;
}

export default function ActivitySeoSchemas({
  activity,
  faqs,
  categoryName = 'Things to do in Nairobi',
  categoryUrl = 'https://lifeinnairobi.com/things-to-do-in-nairobi',
  url
}: ActivitySeoSchemasProps) {
  
  // 1. FAQ Schema
  const faqSchema = faqs && faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  // 2. Product / Activity Schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": activity.name,
    "image": activity.image,
    "description": activity.shortDescription,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "KES",
      "price": activity.price || 0,
      "availability": "https://schema.org/InStock"
    }
  };

  // 3. Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": categoryName,
        "item": categoryUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": activity.name,
        ...(url && { item: url })
      }
    ]
  };

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
