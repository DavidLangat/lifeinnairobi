const fs = require('fs');

const navbarPath = 'src/data/navbar-data.json';
const destPath = 'src/data/destinations-data.json';
const bestPath = 'src/data/bestthings-data.json';

const navbar = JSON.parse(fs.readFileSync(navbarPath, 'utf8'));
const destData = JSON.parse(fs.readFileSync(destPath, 'utf8'));
const bestData = JSON.parse(fs.readFileSync(bestPath, 'utf8'));

const destSlugs = destData.items.map(i => ({ name: i.name, slug: i.slug, path: '/things-to-do-in-nairobi' }));
const bestSlugs = bestData.items.map(i => ({ name: i.name, slug: i.slug, path: '/best-things-to-do-in-nairobi' }));

const allItems = [...destSlugs, ...bestSlugs];

const thingsToDo = navbar.find(item => item.name === 'Things to Do');

if (thingsToDo && thingsToDo.dropdown) {
  thingsToDo.dropdown.forEach(item => {
    // Find the best match
    // Simple heuristic: check if any part of the name matches, or exact match
    let match = null;
    
    // Manual mapping for some tricky ones
    const manualMap = {
      "Tea Farm Tour": "tea-farm-tours-in-nairobi",
      "E-bike tours": "tigoni-ebike-tours",
      "Hikes": "hikes-in-nairobi",
      "Kibera slum tour": "kibera-slum-tour",
      "Brown's cheese factory": "brown-s-cheese-factory",
      "City walking tour": "nairobi-city-walking-tour",
      "Local Food Tour": "guided-food-tour",
      "Coffee farm tour": "coffee-farm-tour",
      "Cook a Kenyan meal": "explore-the-local-food-market-cook-a-kenyan-meal",
      "Rent a Friend": "rent-a-friend",
      "David Sheldrick Wildlife Trust": "david-sheldrick-wildlife-trust",
      "Karen Blixen Museum": "karen-blixen-museum-tour",
      "Nairobi Museums": "nairobi-museums",
      "Pottery class": "nairobi-pottery-tour",
      "Art gallery Tours": "nairobi-art-gallery-tours",
      "Wine Tasting": "wine-tasting-tours"
    };

    if (manualMap[item.name]) {
      match = allItems.find(i => i.slug === manualMap[item.name]);
    } else {
      // Try to find exact or lowercase match
      match = allItems.find(i => i.name.toLowerCase() === item.name.toLowerCase() || item.href.endsWith(i.slug));
    }
    
    if (!match && item.name === "Naivasha") match = allItems.find(i => i.slug === "naivasha");
    if (!match && item.name === "Giraffe Centre") match = allItems.find(i => i.slug === "giraffe-centre");
    if (!match && item.name === "Ngong hills") match = allItems.find(i => i.slug === "ngong-hills");
    if (!match && item.name === "Bomas of Kenya") match = allItems.find(i => i.slug === "bomas-of-kenya");
    if (!match && item.name === "Karura Forest") match = allItems.find(i => i.slug === "karura-forest");
    if (!match && item.name === "Twin rivers tigoni") match = allItems.find(i => i.slug === "twin-rivers-tigoni");

    if (match) {
      item.href = `${match.path}/${match.slug}`;
      console.log(`Updated ${item.name} to ${item.href}`);
    } else {
      console.log(`No match found for ${item.name}`);
    }
  });
}

fs.writeFileSync(navbarPath, JSON.stringify(navbar, null, 2));
console.log('Saved ' + navbarPath);
