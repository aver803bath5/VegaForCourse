import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IFeature } from "../core/models/IFeature";

@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  constructor(
    private http: HttpClient
  ) { }

}
