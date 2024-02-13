import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {FooterComponent} from "./navigation/footer/footer.component";
import {HeaderComponent} from "./navigation/header/header.component";
import {catchError, of, switchMap, throwError} from "rxjs";
import {AccountDTO} from "./model/AccountDTO";
import {HttpClientService} from "./services/http-client-service.service";
import {GlobalService} from "./services/global.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'LoL-Dashboard';

  constructor(private httpClientService: HttpClientService, private globalService: GlobalService, private router: Router) { }
  submitForm(event: any) {
    this.httpClientService.getByUserTag(event.gameName, event.tagLine)
      .pipe(
        switchMap((response: AccountDTO) => {
          this.globalService.setAccountInformation(response);
          this.router.navigate(['/player', response.gameName, response.tagLine]);
          return of(response);
        }),
        catchError((error: any) => {
          console.error(error);
          return throwError(error);
        })
      )
      .subscribe();
  }
}
