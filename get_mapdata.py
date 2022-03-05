import requests
import json

mapdata = requests.get("https://api.guildwars2.com/v2/maps?ids=all").json()
maps = {}

for map in mapdata:
    maps[str(map["id"])] = map
    del map["id"]
    map["map_name"] = map["name"]
    del map["name"]

print(json.dumps(maps, indent=4))