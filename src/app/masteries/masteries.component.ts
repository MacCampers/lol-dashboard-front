import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClientService} from "../services/http-client-service.service";
import {switchMap} from "rxjs";
import {ChampionMasteryDTO} from "../model/ChampionMasteryDTO";
import {DatePipe, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";
import {ChampionService} from "../services/champion.service";
import {GlobalService} from "../services/global.service";
import {SummonerDTO} from "../model/SummonerDTO";

@Component({
  selector: 'app-masteries',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault
  ],
  templateUrl: './masteries.component.html',
  styleUrl: './masteries.component.css'
})
export class MasteriesComponent implements OnInit {

  gameName?: string | null
  tagLine?: string | null
  puuid?: string | null
  championMasteries: ChampionMasteryDTO[] = [] as ChampionMasteryDTO[]
  accountDetails: SummonerDTO = {} as SummonerDTO
  sortOrder: {[key: string]: 'asc' | 'desc'} = {}
  masteryTokenFive: number[] = [1, 2]
  masteryTokenSix: number[] = [1, 2, 3]

  constructor(private route: ActivatedRoute,
              private httpClientService: HttpClientService,
              private globalService: GlobalService,
              private championService: ChampionService) {}

  ngOnInit() {
    this.loadAccountInformations()
    this.loadAccountDetails()
    this.loadMasteries()
  }

  loadAccountInformations() {
    this.gameName = this.globalService.getAccountInformation().gameName
    this.tagLine = this.globalService.getAccountInformation().tagLine
    this.puuid = this.globalService.getAccountInformation().puuid
  }

  private loadAccountDetails() {
    this.route.paramMap.subscribe(params => {
      if (this.globalService.getSummoner() == null || this.gameName != params.get('gameName')) {
        this.httpClientService.getAccountInformations(this.puuid).pipe(
        ).subscribe(account => {
          this.globalService.setSummoner(account)
          this.accountDetails = account
          return account
        });
      } else {
        this.accountDetails = this.globalService.getSummoner()
      }
    });
  }

  private loadMasteries() {
    this.route.paramMap.subscribe(params => {
      console.log(this.globalService.getChampionMastery(), this.gameName, params.get('gameName'))
      if (this.globalService.getChampionMastery() == null || this.gameName != params.get('gameName')) {
        this.httpClientService.getAllMasteries(this.puuid).pipe(
          switchMap(masteries => this.championService.addChampionsName(masteries))
        ).subscribe(enrichedMasteries => {
          this.sortMasteries(enrichedMasteries)
          this.globalService.setChampionMastery(enrichedMasteries)
          return enrichedMasteries
        });
      } else {
        this.championMasteries = this.globalService.getChampionMastery()
      }
    });
  }

  private sortMasteries(enrichedMasteries: ChampionMasteryDTO[]) {
    this.championMasteries = enrichedMasteries.sort((a, b) => {
      return b.championPoints - a.championPoints;
    });
    this.championMasteries = enrichedMasteries.sort((a, b) => {
      return b.championLevel - a.championLevel;
    });
  }

  sortChampionMasteries(sortBy?: string) {
    if (!sortBy) {
      console.error('sortBy is required for sorting.')
      return
    }

    // Determine the current sort order for sortBy, defaulting to 'asc' if not set
    const currentSortOrder = this.sortOrder[sortBy] || 'asc'

    // Invert the sort order for the next call
    this.sortOrder[sortBy] = currentSortOrder === 'asc' ? 'desc' : 'asc'

    this.championMasteries?.sort((a, b) => {
      let valueA: any = a[sortBy as keyof typeof a] || ""
      let valueB: any = b[sortBy as keyof typeof b] || ""

      let comparison = 0
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        comparison = valueA.localeCompare(valueB)
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        comparison = valueA - valueB
      } else if (sortBy === 'lastPlayTime') {
        let timeA = new Date(valueA).getTime()
        let timeB = new Date(valueB).getTime()
        comparison = timeA - timeB
      }

      // Invert the comparison result if the current sort order is 'desc'
      return currentSortOrder === 'desc' ? -comparison : comparison
    });
  }

  getProgressWidth(cm: ChampionMasteryDTO): number {
    return (cm.championPointsSinceLastLevel * 100) / (cm.championPointsSinceLastLevel + cm.championPointsUntilNextLevel);
  }

  getMasteryTokens(level: number): number[] {
    if (level === 6) {
      return this.masteryTokenSix;
    } else if (level === 5) {
      return this.masteryTokenFive;
    }
    return [];
  }
}
