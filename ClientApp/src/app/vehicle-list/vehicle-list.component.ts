import { Component, OnInit } from '@angular/core';
import { IVehicle } from "../core/models/IVechicle";
import { VehicleService } from "../services/vehicle.service";
import { IMake } from "../core/models/IMake";
import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import { IQueryResult } from "../core/models/IQueryResult";

interface IQuery {
  page: number;
  pageSize: number;
  sortBy?: string;
  isSortAscending?: boolean;
  makeId?: number;
}

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  private readonly PAGE_SIZE = 3;
  queryResult: IQueryResult<IVehicle> = {
    items: [],
    totalItems: 0
  };
  makes: IMake[] = [];
  query: IQuery = {
    page: 1,
    pageSize: this.PAGE_SIZE,
  };
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
    this.query.page = 1;
    this.populateVehicles();
  }

  resetFilter() {
    this.query = {
      page: 1,
      pageSize: this.PAGE_SIZE,
    };
    this.populateVehicles();
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

  onPageChange(page) {
    this.query.page = page;
    this.populateVehicles();
  }

  private populateVehicles() {
    this.vehicleService.getVehicles(this.query).subscribe(result => {
      this.queryResult = result;
    });
  }
}
