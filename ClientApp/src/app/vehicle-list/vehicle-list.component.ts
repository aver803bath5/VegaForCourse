import { Component, OnInit } from '@angular/core';
import { IVehicle } from "../core/models/IVechicle";
import { VehicleService } from "../services/vehicle.service";
import { IKeyValuePair } from "../core/models/IKeyValuePair";
import { IMake } from "../core/models/IMake";

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: IVehicle[] = [];
  allVehicles: IVehicle[] = [];
  makes: IMake[] = [];
  filter: any = {
    makeId: 0
  };

  constructor(
    private vehicleService: VehicleService
  ) { }

  ngOnInit() {
    this.vehicleService.getMakes().subscribe(makes => this.makes = [...makes]);
    this.vehicleService.getVehicles().subscribe(vehicles => {
      this.vehicles = [...this.allVehicles] = [...vehicles];
    })
  }

  onFilterChange() {
    let vehicles = this.allVehicles;

    if (this.filter.makeId)
      vehicles = vehicles.filter(v => v.make.id == this.filter.makeId);

    this.vehicles = vehicles;
  }

  resetFilter() {
    this.filter = {};
    this.onFilterChange();
  }
}
