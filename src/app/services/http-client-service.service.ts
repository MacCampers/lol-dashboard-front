import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AccountDTO} from "../model/AccountDTO";
import {ChampionMasteryDTO} from "../model/ChampionMasteryDTO";
import {SummonerDTO} from "../model/SummonerDTO";

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  BASE_URL: string = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  getByUserTag(gameName?: string, tagLine?: string): Observable<AccountDTO> {
    return this.http.get<AccountDTO>(this.BASE_URL + `/account/getByUserTag/${gameName}/${tagLine}`);
  }

  getAllMasteries(puuid?: string | null): Observable<ChampionMasteryDTO[]> {
    return this.http.get<ChampionMasteryDTO[]>(this.BASE_URL + `/mastery/getAll/${puuid}`);
  }

  getAccountInformations(puuid?: string | null): Observable<SummonerDTO> {
    return this.http.get<SummonerDTO>(this.BASE_URL + `/account/getByPuuid/${puuid}`);
  }
}
