import { Component, OnInit } from '@angular/core';
import { IVehicle } from "../core/models/IVechicle";
import { VehicleService } from "../services/vehicle.service";
import { IMake } from "../core/models/IMake";

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: IVehicle[] = [];
  makes: IMake[] = [];
  filter: any = {
  };

  constructor(
    private vehicleService: VehicleService
  ) { }

  ngOnInit() {
    this.vehicleService.getMakes().subscribe(makes => this.makes = [...makes]);
    this.populateVehicles();
  }

  onFilterChange() {
    this.populateVehicles();
  }

  resetFilter() {
    this.filter = {};
    this.onFilterChange();
  }

  private populateVehicles() {
    this.vehicleService.getVehicles(this.filter).subscribe(vehicles => {
      this.vehicles = [...vehicles];
    });
  }
}
