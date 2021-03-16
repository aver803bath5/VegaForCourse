import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  constructor(
    private http: HttpClient
  ) {
  }

  upload(vehicleId, photo) {
    const formData = new FormData();
    formData.append('file', photo);
    const req = new HttpRequest('POST', `/api/vehicles/${vehicleId}/photos`, formData, {
      responseType: 'json',
      // Enable report progress because we need to show the upload progress on the view.
      reportProgress: true
    });

    return this.http.request(req);
  }

  getPhotos(vehicleId) {
    return this.http.get(`/api/vehicles/${vehicleId}/photos`);
  }
}
