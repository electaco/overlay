import xml.etree.ElementTree as ET
from collections import defaultdict
import json
import argparse

def get_args():
    parser = argparse.ArgumentParser(description='Convert TaCO markers to json')
    parser.add_argument('xml',  
                        help='XML file to parse')
    parser.add_argument('type', 
                        help='Type to extract')
    parser.add_argument('--outfile', 
                        help='Out filename')
    return parser.parse_args()

def extract_pois_single(xmlpath: str, type:str):
    tree = ET.parse(xmlpath)
    root = tree.getroot()
    base = type.split(".")[-1]
    data = {}

    entry = root.find(f".//MarkerCategory[@name='{base}']")
    m =  defaultdict(list)

    def addpoint(point, name, id):
        pointObj = {
            "id": id,
            "name": name,
            "type": 0,
            "active":True,
            "position": {
                "X": float(point.attrib["zpos"]),
                "Y": float(point.attrib["ypos"]),
                "Z": float(point.attrib["xpos"]),
            }
        }
        m[point.attrib["MapID"]].append(pointObj)

    groupName = entry.attrib["DisplayName"]
    
    print(groupName)

    for i, subentry in enumerate(root.findall(".//POI[@type='%s']" % type)):
        name = f"{groupName} #{i+1}"
        addpoint(subentry, name, f"{type}.{i}")
        print("-",name)

    for subentry in entry.findall("MarkerCategory"): # Assumption: Sub markers with one poi each
        idname = type + "." + subentry.attrib["name"]
        poi = root.find(".//POI[@type='%s']" % idname)

        addpoint(poi, subentry.attrib["DisplayName"], idname)
        print("-",subentry.attrib["DisplayName"])
    
    data = {
        "active": True,
        "icon": "marker1.webp",
        "color": "#ffffff",
        "id": base,
        "name": groupName,
        "markers":m,
    }
    return groupName, data

if __name__ == "__main__":
    args = get_args()

    name, data = extract_pois_single(args.xml, args.type)
    outfile = args.outfile or f"{name}.etmp"
    with open(outfile, "w") as out:
        json.dump(data, out, indent=4)
        print ("Saved data to {}".format(outfile))