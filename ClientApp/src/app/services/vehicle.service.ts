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
  private readonly vehicleEndpoint = 'api/vehicles';
  constructor(
    private http: HttpClient
  ) { }

  getVehicle(id) {
    return this.http.get<IVehicle>(`${this.vehicleEndpoint}/${id}`);
  }

  getVehicles(filter) {
    return this.http.get<Array<IVehicle>>('/api/vehicles', {
      params: filter
    });
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
    return this.http.put(`${this.vehicleEndpoint}/${vehicle.id}`, vehicle);
  }

  delete(id) {
    return this.http.delete(`${this.vehicleEndpoint}/${id}`);
  }
}
