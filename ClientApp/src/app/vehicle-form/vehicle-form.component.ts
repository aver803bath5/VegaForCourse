import { Component, OnInit } from '@angular/core';
import { VehicleService } from "../services/vehicle.service";
import { IMake } from "../core/models/IMake";
import { IModel } from "../core/models/IModel";
import { IFeature } from "../core/models/IFeature";

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes = new Array<IMake>();
  models = new Array<IModel>();
  features = new Array<IFeature>();
  vehicle = {
    makeId: 0,
    modelId: 0,
    isRegistered: false
  };

  constructor(
    private vehicleService: VehicleService,
  ) {
  }

  ngOnInit() {
    this.vehicleService.getMakes().subscribe(makes =>
      this.makes = makes);

    this.vehicleService.getFeatures().subscribe(features =>
      this.features = features);
  }

  onMakeChange() {
    const selectedMake = this.makes.find(m => m.id == this.vehicle.makeId)
    this.models = selectedMake ? selectedMake.models : [];
  }
}
