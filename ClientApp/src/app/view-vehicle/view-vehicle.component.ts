import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VehicleService } from "../services/vehicle.service";
import { IVehicle } from "../core/models/IVechicle";
import { ActivatedRoute, Router } from "@angular/router";
import { PhotoService } from "../services/photo.service";
import { HttpEventType, HttpResponse } from "@angular/common/http";
import { finalize, takeUntil } from "rxjs/operators";
import { from, fromEvent, Subject } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {
  @ViewChild('fileInput', { static: true }) fileInput: ElementRef;
  cancelSubject = new Subject();
  vehicleId = 0;
  vehicle: IVehicle = null;
  photos = [];
  progress: any = {
    percentage: -1
  }

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private router: Router,
    private photoService: PhotoService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.vehicleId = +this.route.snapshot.paramMap.get('id');
    this.vehicleService.getVehicle(this.vehicleId).subscribe(v => this.vehicle = v);

    this.photoService.getPhotos(this.vehicleId).subscribe(photos => this.photos = photos as any[]);
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.vehicleService.delete(this.vehicle.id)
        .subscribe(() => {
          this.router.navigate(['/']);
        });
    }
  }

  uploadPhoto() {
    const nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    if (nativeElement.files.length === 0) return;

    // Get the file value and then reset the fileInput value.
    const file = nativeElement.files[0];
    nativeElement.value = '';
    this.photoService.upload(this.vehicleId, file)
      .pipe(
        takeUntil(from(this.cancelSubject)),
        finalize(() => {
          // Reset progress percentage
          this.progress.percentage = -1;
        })
      )
      .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress.percentage = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.photos.push(event.body)
          }
        },
        err => {
          this.toastr.error(err.error, 'Error');
        });
  }

  cancelUpload() {
    this.cancelSubject.next('cancel');
  }
}
