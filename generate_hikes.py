from datetime import date, timedelta

hikes = [
    {
        'name': 'Kawamwaki Hike',
        'slug': 'kawamwaki-hike',
        'price': 3000,
        'image': 'https://ik.imagekit.io/w1yofme6f/tigonilife/v2/activities/Tigoni%20Hikes.jpg',
        'short_desc': 'A scenic walk leading to a hidden waterfall in Tigoni.',
        'full_desc': '<div class=''space-y-6 font-open-sans text-gray-700''><div><h3 class=''text-2xl font-serif text-background font-medium mb-3''>The Best Guides</h3><p class=''leading-relaxed''>Enhance your hiking experience with our knowledgeable local guides, many of whom are female and born and raised in Tigoni. Their intimate connection to the land ensures you’ll uncover hidden trails, breathtaking viewpoints, and fascinating local stories often missed by other visitors.</p></div></div>',
        'highlights': "ARRAY['Kawamwaki Waterfall', 'Scenic Views', 'River Walk']", 
        'key_details': "'{\"duration\": \"90 minutes\", \"startTime\": [\"9:00 AM\", \"12:00 PM\", \"3:30 PM\"], \"location\": \"Kawamwaki Farm\"}'::jsonb",
        'gallery': "ARRAY['https://ik.imagekit.io/w1yofme6f/tigonilife/v2/images/Hike.jpg', 'https://ik.imagekit.io/w1yofme6f/tigonilife/v2/images/hike2.jpg']" 
    },
    {
        'name': 'Cianda Hike',
        'slug': 'cianda-hike',
        'price': 3000,
        'image': 'https://ik.imagekit.io/w1yofme6f/tigonilife/v2/activities/Tigoni%20Hikes.jpg',
        'short_desc': 'Explore lush paths and tranquil water features at Cianda.',
        'full_desc': '<div class=''space-y-6 font-open-sans text-gray-700''><div><h3 class=''text-2xl font-serif text-background font-medium mb-3''>Cianda Waterfall</h3><p class=''leading-relaxed''>Discover the hidden gem of Cianda, known for its lush green paths and tranquil water features. A perfect hike for nature lovers looking for serenity.</p></div></div>',
        'highlights': "ARRAY['Cianda Waterfall', 'Lush Vegetation', 'Bird Watching']",
        'key_details': "'{\"duration\": \"90 minutes\", \"startTime\": [\"9:00 AM\", \"12:00 PM\", \"3:30 PM\"], \"location\": \"Cianda Farm\"}'::jsonb",
        'gallery': "ARRAY['https://ik.imagekit.io/w1yofme6f/tigonilife/v2/images/Hike.jpg']"
    },
    {
        'name': 'Brackenhurst Hike',
        'slug': 'brackenhurst-hike',
        'price': 3000,
        'image': 'https://ik.imagekit.io/w1yofme6f/tigonilife/v2/images/hike2.jpg',
        'short_desc': 'Shaded forest trails rich in birdlife at Brackenhurst.',
        'full_desc': '<div class=''space-y-6 font-open-sans text-gray-700''><div><h3 class=''text-2xl font-serif text-background font-medium mb-3''>Brackenhurst Forest</h3><p class=''leading-relaxed''>Walk through one of the few remaining indigenous forests in the area. Brackenhurst is famous for its restoration projects and incredible birdlife.</p></div></div>',
        'highlights': "ARRAY['Indigenous Forest', 'Bird Watching', 'Colobus Monkeys']",
        'key_details': "'{\"duration\": \"90 minutes\", \"startTime\": [\"9:00 AM\", \"12:00 PM\", \"3:30 PM\"], \"location\": \"Brackenhurst\"}'::jsonb",
        'gallery': "ARRAY['https://ik.imagekit.io/w1yofme6f/tigonilife/v2/images/hike2.jpg']"
    },
    {
        'name': 'Tigoni Tea Estate Hike',
        'slug': 'tigoni-tea-estate-hike',
        'price': 3000,
        'image': 'https://ik.imagekit.io/w1yofme6f/tigonilife/v2/activities/Tigoni%20Tea%20Farm%20Tours.jpg',
        'short_desc': 'Walks through iconic tea plantations with sweeping views.',
        'full_desc': '<div class=''space-y-6 font-open-sans text-gray-700''><div><h3 class=''text-2xl font-serif text-background font-medium mb-3''>Tea Estate Walk</h3><p class=''leading-relaxed''>Immerse yourself in the rolling hills of Tigoni tea plantations. Enjoy panoramic views and learn about the history of tea in Kenya.</p></div></div>',
        'highlights': "ARRAY['Tea Plantations', 'Panoramic Views', 'History']",
        'key_details': "'{\"duration\": \"90 minutes\", \"startTime\": [\"9:00 AM\", \"12:00 PM\", \"3:30 PM\"], \"location\": \"Tigoni Tea Farms\"}'::jsonb",
        'gallery': "ARRAY['https://ik.imagekit.io/w1yofme6f/tigonilife/v2/activities/Tigoni%20Tea%20Farm%20Tours.jpg']"
    }
]

# Start from April 18 (Saturday) - Index 0 (Kawamwaki)
# Previous inserts ended on April 12 (Sunday) - Tigoni Tea Estate
# Pattern: Sat (Kawamwaki) -> Sun (Cianda) -> Sat (Brackenhurst) -> Sun (Tigoni) ... wait
# Let's double check the rotation. 
# 1. Jan 24 (Sat) - Kawamwaki
# 2. Feb 1 (Sun) - Cianda
# 3. Feb 7 (Sat) - Brackenhurst
# 4. Feb 15 (Sun) - Tigoni
# ...
# 12. Apr 12 (Sun) - Tigoni 
# Next: Cycle restarts. 
# Apr 18 (Sat) - Kawamwaki. Correct.

curr_date = date(2026, 4, 18)
hike_idx = 0 
is_saturday = True # Starting on a Saturday

values_list = []

# Loop until end of 2026
while curr_date.year == 2026:
    hike = hikes[hike_idx]
    slug = f"{hike['slug']}-{curr_date.strftime('%Y-%m-%d')}"
    
    val = f"('{hike['name']}', '{slug}', '{curr_date}', 'Tigoni, Kenya', {hike['price']}, 'hiking-tours', '{hike['image']}', '{hike['short_desc']}', '{hike['full_desc']}', {hike['highlights']}, '[{{\"title\": \"Assembly\", \"description\": \"Warm-up and safety briefing 15 mins before start.\"}, {\"title\": \"The Hike\", \"description\": \"2-3 hour hike depending on pace and route chosen.\"}, {\"title\": \"Cool Down\", \"description\": \"Stretch session and refreshments.\"}}]'::jsonb, '{\"citizen\": 3000, \"resident\": 4000, \"nonResident\": 5000}'::jsonb, {hike['key_details']}, {hike['gallery']})"
    values_list.append(val)
    
    # Increment date mechanism
    # If currently Saturday, next is Sun (+8 days) -> Wait
    # Jan 24 (Sat) + 8 = Feb 1 (Sun). Correct.
    # Feb 1 (Sun) + 6 = Feb 7 (Sat). Correct.
    if is_saturday:
        curr_date += timedelta(days=8)
    else:
        curr_date += timedelta(days=6)
        
    is_saturday = not is_saturday
    hike_idx = (hike_idx + 1) % 4

print('INSERT INTO public.events (name, slug, date, location, price, type, image, short_description, full_description, highlights, itinerary, pricing, key_details, gallery) VALUES ' + ',\n'.join(values_list) + ';')
