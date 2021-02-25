import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {IMake} from "../core/models/IMake";
import { IFeature } from "../core/models/IFeature";
import { IVehicle } from "../core/models/IVechicle";
import { ISaveVehicle } from '../core/models/ISaveVehicle';

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

  getVehicles() {
    return this.http.get<Array<IVehicle>>('/api/vehicles');
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

  update(vehicle: ISaveVehicle) {
    return this.http.put(`/api/vehicles/${vehicle.id}`, vehicle);
  }

  delete(id) {
    return this.http.delete(`/api/vehicles/${id}`);
  }
}
