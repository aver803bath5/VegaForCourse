import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {IMake} from "../core/models/IMake";
import { IFeature } from "../core/models/IFeature";
import { IVehicle } from "../core/models/IVechicle";
import { ISaveVechicle } from '../core/models/ISaveVechicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor(
    private http: HttpClient
  ) { }

  getVehicle(id) {
    return this.http.get<IVehicle>(`/api/vehicles/${id}`);
  }

  getMakes() {
    return this.http.get<Array<IMake>>('/api/makes');
  }

  getFeatures() {
    return this.http.get<Array<IFeature>>('/api/features');
  }

  create(vehicle)
  {
    return this.http.post('/api/vehicles', vehicle);
  }

  update(vehicle: ISaveVechicle) {
    return this.http.put(`/api/vehicles/${vehicle.id}`, vehicle);
  }

  delete(id) {
    return this.http.delete(`/api/vehicles/${id}`);
  }
}
