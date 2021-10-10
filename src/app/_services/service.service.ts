import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private ChuckUrl = "https://restcountries.com/v3/all"; // URL to web api

  constructor(private http: HttpClient) {}

  public getData() {
    return this.http.get(this.ChuckUrl).pipe(map(res => res as any));
  }
}
