import { Component, OnInit } from '@angular/core';
import { IVehicle } from "../core/models/IVechicle";
import { VehicleService } from "../services/vehicle.service";
import { IMake } from "../core/models/IMake";
import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: IVehicle[] = [];
  makes: IMake[] = [];
  query: any = {};
  columns = [
    { title: 'id' },
    { title: 'Make', key: 'make', isSortable: true },
    { title: 'Model', key: 'model', isSortable: true },
    { title: 'ContactName', key: 'contactName', isSortable: true },
    {}
  ];

  constructor(
    private vehicleService: VehicleService
  ) {
  }

  ngOnInit() {
    this.vehicleService.getMakes().subscribe(makes => this.makes = [...makes]);
    this.populateVehicles();
  }

  onFilterChange() {
    this.populateVehicles();
  }

  resetFilter() {
    this.query = {};
    this.onFilterChange();
  }

  sortBy(columnName) {
    if (this.query.sortBy == columnName) {
      this.query.isSortAscending = !this.query.isSortAscending;
    } else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }
    this.populateVehicles();
  }

  setSortIcon() {
    return this.query.isSortAscending ? faSortUp : faSortDown;
  }

  private populateVehicles() {
    this.vehicleService.getVehicles(this.query).subscribe(vehicles => {
      this.vehicles = [...vehicles];
    });
  }
}
