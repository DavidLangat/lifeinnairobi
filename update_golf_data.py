import json

data_file = "/Users/davidlangat/Documents/Development/Projects/Active/Web/NextJS/lifeinnairobi/src/data/golf-data.json"

descriptions = {
    "Muthaiga Golf Club": "Experience Muthaiga Golf Club in Nairobi, a premier championship course with lush fairways, top facilities, and an exclusive golfing experience.",
    "Karen Country Club": "Visit Karen Country Club Nairobi for golf, dining, tennis, and a peaceful green environment offering a premium country club experience.",
    "Royal Nairobi Golf Club": "Experience Royal Nairobi Golf Club, a historic championship course in Nairobi with lush fairways, premium facilities, and a prestigious golfing experience.",
    "Vetlab Sports Club": "Visit Vetlab Sports Club Nairobi for golf, tennis, swimming, and outdoor recreation in a peaceful green and family-friendly setting.",
    "Sigona Golf Club": "Visit Sigona Golf Club for a beautiful 18-hole course, rolling greens, and a relaxed golf experience surrounded by nature near Nairobi.",
    "Windsor Golf Hotel & Country Club": "Visit Windsor Golf Hotel & Country Club for world-class golf, luxury accommodation, fine dining, and a peaceful green escape in Nairobi.",
    "Limuru Country Club": "Experience Limuru Country Club near Nairobi with a scenic golf course, lush fairways, and a peaceful highland setting perfect for relaxation and sport.",
    "Golf Park": "Experience Golf Park Nairobi with a fun practice golf range, mini golf, training facilities, and a relaxed outdoor setting for all skill levels.",
    "KENYA RAILWAY GOLF COURSE": "Visit Kenya Railway Golf Course Nairobi for a 9-hole course, beginner-friendly golf, and a relaxed sporting environment in the city.",
    "KIAMBU Golf Course": "Visit Kiambu Golf Course for a beautiful 9-hole layout, green surroundings, and a peaceful golf experience just outside Nairobi.",
    "Impala Club": "Visit Impala Club Nairobi for tennis, swimming, fitness, and social recreation in a peaceful and family-friendly club setting.",
    "Upper Kabete Golf Course": "Visit Upper Kabete Golf Course near Nairobi for a scenic 9-hole course, casual golf play, and a peaceful green sporting environment.",
    "Muthaiga Country Club": "Visit Muthaiga Country Club in Nairobi for a hidden green escape of tennis, swimming, fine dining, and exclusive members-only relaxation.",
    "Ruiru Sports Club": "Visit Ruiru Sports Club and enjoy golf, tennis, swimming, and outdoor leisure in a peaceful green retreat just outside Nairobi.",
    "Migaa Golf Estate": "Visit Migaa Golf Club and escape into lush fairways, peaceful surroundings, and a premium golfing experience just outside Nairobi.",
    "Nairobi Club": "Visit Nairobi Club for a historic members’ experience with tennis, swimming, dining, and a timeless social atmosphere in the city.",
    "Public Service Club": "Visit Public Service Club in Nairobi for golf, tennis, swimming, dining, and a relaxed green escape for leisure and recreation.",
    "Parklands Sports Club": "Visit Parklands Sports Club and enjoy golf, tennis, swimming, and dining in a lively yet relaxed sports and social environment in Nairobi.",
    "Eastlands Country Club (ECCO)": "Visit Eastlands Country Club (ECCO) in Nairobi for golf, tennis, swimming, and a vibrant community sports and leisure experience.",
    "Ngong Racecourse & Golf Park": "Visit Ngong Racecourse & Golf Park in Nairobi for horse racing, golf practice, mini golf, and a vibrant outdoor leisure experience."
}

with open(data_file, "r") as f:
    data = json.load(f)

for item in data.get("items", []):
    name = item.get("name")
    
    # Map Migaa Golf Club to Migaa Golf Estate
    lookup_name = name
    if name == "Migaa Golf Estate":
        lookup_name = "Migaa Golf Estate"
    elif name == "Eastlands Country Club":
        lookup_name = "Eastlands Country Club (ECCO)"
    
    if "seo" in item:
        del item["seo"]
    
    if lookup_name in descriptions:
        item["metadesc"] = descriptions[lookup_name]
    else:
        # Check case-insensitive match just in case
        for key, val in descriptions.items():
            if key.lower() == name.lower():
                item["metadesc"] = val
                break
        else:
            item["metadesc"] = ""

with open(data_file, "w") as f:
    json.dump(data, f, indent=2)

print("Updated golf-data.json successfully.")
