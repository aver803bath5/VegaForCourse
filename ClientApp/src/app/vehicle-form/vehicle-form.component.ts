import * as _ from 'underscore';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { VehicleService } from "../services/vehicle.service";
import { IMake } from "../core/models/IMake";
import { IModel } from "../core/models/IModel";
import { IFeature } from "../core/models/IFeature";
import { ToastrService } from "ngx-toastr";
import { Observable, forkJoin } from 'rxjs';
import { IVehicle } from '../core/models/IVechicle';
import { ISaveVechicle } from '../core/models/ISaveVechicle';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})

export class VehicleFormComponent implements OnInit {
  makes = new Array<IMake>();
  models = new Array<IModel>();
  features = new Array<IFeature>();
  vehicle: ISaveVechicle | null = {
    id: 0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,
    features: new Array<Number>(),
    contact: {
      name: "",
      phone: "",
      email: ""
    }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private toastr: ToastrService
  ) {
    route.params.subscribe(p => {
      this.vehicle.id = +p['id'];
    })
  }

  ngOnInit() {
    const sources: Array<Observable<any>> = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures()
    ];

    if (this.vehicle.id)
      sources.push(this.vehicleService.getVehicle(this.vehicle.id));

    forkJoin(
      sources
    ).subscribe(data => {
      this.makes = data[0] as Array<IMake>;
      this.features = data[1] as Array<IFeature>;
      if (this.vehicle.id)
        this.setVehicle(data[2]);
      this.populateModels();
    }, err => {
      if (err.status == 404)
        this.router.navigate(['/']);
    });
  }

  private setVehicle(v: IVehicle) {
    this.vehicle.id = v.make.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.contact = v.contact;
    this.vehicle.features = _.pluck(v.features, 'id');
  }

  onMakeChange() {
    this.populateModels();
    delete this.vehicle.modelId;
  }

  private populateModels() {
    const selectedMake = this.makes.find(m => m.id == this.vehicle.makeId)
    this.models = selectedMake ? selectedMake.models : [];
  }

  onFeatureToggle(featureId: Number, $event) {
    if ($event.target.checked)
      this.vehicle.features.push(featureId);
    else {
      const index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }

  submit() {
    if (this.vehicle.id) {
      this.vehicleService.update(this.vehicle)
        .subscribe(x => {
          this.toastr.success("The vehicle was sucessfully updated.", "Success")
        });
    }
    else {
      this.vehicleService.create(this.vehicle)
        .subscribe(x => console.log(x));
    }
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.vehicleService.delete(this.vehicle.id)
        .subscribe(x => {
          this.router.navigate(['/']);
        });
    }
  }
}
