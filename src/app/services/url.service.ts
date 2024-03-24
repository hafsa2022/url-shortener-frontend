import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  baseUrl = 'http://localhost:8000/api';
  constructor(private http: HttpClient) {}

  generateUrlShortener(data: any) {
    let UrlData = {
      'old_url': data.oldUrl,
      'new_url': data.newUrl,
    };

    return this.http.post(this.baseUrl + '/urlshortener', UrlData);
  }
}
