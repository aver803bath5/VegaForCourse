import { Component, OnInit } from '@angular/core';
import { VehicleService } from "../services/vehicle.service";
import { IVehicle } from "../core/models/IVechicle";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {
  vehicleId = 0;
  vehicle: IVehicle = null;

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.vehicleId = +this.route.snapshot.paramMap.get('id');
    this.vehicleService.getVehicle(this.vehicleId).subscribe(v => this.vehicle = v);
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.vehicleService.delete(this.vehicle.id)
        .subscribe(() => {
          this.router.navigate(['/']);
        });
    }
  }
}
