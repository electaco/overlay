// //import { fs } from 'fs/promises';
// import { GetStoragePathFor } from './settings';
// import axios from 'axios';

// export interface IMap {
//     map_name: string;
//     min_level: number;
//     max_level: number;
//     default_floor: number;
//     type: string;
//     floors: number[];
//     region_id?: number;
//     region_name?: string;
//     continent_id?: number;
//     continent_name?: string;
//     map_rect: any;
//     continent_rect: any;
// }
// export interface IMaps {
//     [id: string]: IMap;
// }

// class GW2MapFetcher {
//   private apiUrl = 'https://api.guildwars2.com/v2/maps?ids=all';
//     private filePath: string;
//     private maps: IMaps;
//     private mapMap: { [index: string]: string } = {}

//   constructor() {
//       this.filePath = GetStoragePathFor('gw2_maps.json');
//   }

//     async inititalize() {
//         this.maps = await this.fetchMaps();
//     }

//     // some maps got multiple entries, this normalize the id to the first map with that name in the list
//     TranslateMapId(mapId: string) {
//         if (this.mapMap[mapId]) {
//             return this.mapMap[mapId]
//         }
//         let name = this.maps[mapId] ? this.maps[mapId].map_name : "Unknown";
//         for (let key in this.maps) {
//             if (this.maps[key].map_name === name) {
//                 this.mapMap[mapId] = key;
//                 return key;
//             }
//         }
//         return mapId;
//     }

  
  
//   private async fetchMaps(): Promise<IMaps> {
//     try {
//       if (await this.shouldFetchFromApi()) {
//         console.log('Fetching maps from API...');
//         const response = await axios.get<IMaps>(this.apiUrl);
//         await this.saveMapsToFile(response.data);
//         return response.data;
//       } else {
//         console.log('Loading maps from local file...');
//         return this.loadMapsFromFile();
//       }
//     } catch (error) {
//       console.error('Error fetching maps:', error);
//       throw error;
//     }
//   }  
    
//   private async shouldFetchFromApi(): Promise<boolean> {
//     try {
//       const stats = await fs.stat(this.filePath);
//       const lastModified = stats.mtime;
//       const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
//       return lastModified < oneDayAgo;
//     } catch (error) {
//       // If file doesn't exist, we should fetch from API
//       return true;
//     }
//   }

//   private async saveMapsToFile(maps: IMaps): Promise<void> {
//     await fs.writeFile(this.filePath, JSON.stringify(maps, null, 2));
//     console.log('Maps saved to file.');
//   }

//   private async loadMapsFromFile(): Promise<IMaps> {
//     const data = await fs.readFile(this.filePath, 'utf-8');
//     return JSON.parse(data);
//   }
// }

// const mapService = new GW2MapFetcher();
// //await mapService.inititalize();

// export default mapService;