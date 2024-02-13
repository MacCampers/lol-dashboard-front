import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, shareReplay} from "rxjs";
import {ChampionMasteryDTO} from "../model/ChampionMasteryDTO";

interface Champion {
  key: string;
  name: string;
  image: string;
}
@Injectable({
  providedIn: 'root'
})

export class ChampionService {

  private championsUrl = '../../assets/shortened_champion_data.json';
  private championsCache?: Observable<Champion[]>;

  constructor(private http: HttpClient) { }


  getChampions(): Observable<Champion[]> {
    if (!this.championsCache) {
      this.championsCache = this.http.get<Champion[]>(this.championsUrl).pipe(
        shareReplay(1) // Ensures HTTP request is made only once
      );
    }
    return this.championsCache;
  }

  addChampionsName(champions: ChampionMasteryDTO[]): Observable<ChampionMasteryDTO[]> {
    return this.getChampions().pipe(
      map(championsWithName => {
        const enrichedChampions = champions.map(champMastery => {
          const foundChamp = championsWithName.find(champ => champ.key == champMastery.championId);
          if (foundChamp) {
            return {
              ...champMastery,
              name: foundChamp.name,
              image: foundChamp.image
            };
          }
          return champMastery;
        });
        return enrichedChampions;
      })
    );
  }
}

