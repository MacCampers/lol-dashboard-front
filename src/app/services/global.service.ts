import { Injectable } from '@angular/core';
import {AccountDTO} from "../model/AccountDTO";
import {ChampionMasteryDTO} from "../model/ChampionMasteryDTO";
import {SummonerDTO} from "../model/SummonerDTO";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private accountDTO: AccountDTO  = {} as AccountDTO;
  private championMasteryDTO: ChampionMasteryDTO[] = [] as ChampionMasteryDTO[];
  private summonerDTO: SummonerDTO = {} as SummonerDTO;

  private accountInformationSource = new BehaviorSubject<AccountDTO | null>(null);
  accountInformation$ = this.accountInformationSource.asObservable();

  constructor() {
    this.loadInitialData();
  }

  loadInitialData() {
    const storedAccountDTO = localStorage.getItem('accountDTO');
    this.accountDTO = storedAccountDTO ? JSON.parse(storedAccountDTO) : {} as AccountDTO;


    const storedChampionMasteryDTO = localStorage.getItem('championMasteryDTO');
    this.championMasteryDTO = storedChampionMasteryDTO ? JSON.parse(storedChampionMasteryDTO) : [] as ChampionMasteryDTO[];

    const storedSummonerDTO = localStorage.getItem('summonerDTO');
    this.summonerDTO = storedSummonerDTO ? JSON.parse(storedSummonerDTO) : {} as SummonerDTO;
  }

  setAccountInformation(val: AccountDTO) {
    this.accountDTO = val;
    localStorage.setItem('accountDTO', JSON.stringify(val));
    this.accountInformationSource.next(val);
  }

  getAccountInformation(): AccountDTO {
    return this.accountDTO;
  }

  setChampionMastery(masteries: ChampionMasteryDTO[]) {
    this.championMasteryDTO = masteries;
    localStorage.setItem('championMasteryDTO', JSON.stringify(masteries));
  }

  getChampionMastery(): ChampionMasteryDTO[] {
    return this.championMasteryDTO;
  }

  setSummoner(sums: SummonerDTO) {
    this.summonerDTO = sums;
    localStorage.setItem('summonerDTO', JSON.stringify(sums));
  }

  getSummoner(): SummonerDTO {
    return this.summonerDTO;
  }

}
