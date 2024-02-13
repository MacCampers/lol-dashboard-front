import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientService} from "../../services/http-client-service.service";
import {GlobalService} from "../../services/global.service";
import {Router} from "@angular/router";
import {catchError, of, switchMap, throwError} from "rxjs";
import {AccountDTO} from "../../model/AccountDTO";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  gameName?: string;
  tagLine?: string;
  @Output() submitForm = new EventEmitter();

  submit() {
    const event = {
      gameName: this.gameName,
      tagLine: this.tagLine
    }
    this.submitForm.emit(event);
  }

}
