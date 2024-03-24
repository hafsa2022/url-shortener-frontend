import { UrlService } from './../../services/url.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-url-page',
  templateUrl: './url-page.component.html',
  styleUrls: ['./url-page.component.css'],
})
export class UrlPageComponent {
  data: any = {
    oldUrl: '',
    newUrl: '',
  };
  response: any = null;
  error: Boolean = false;
  copy: String = 'Copy';

  constructor(private service: UrlService) {}
  generateUrlShortener() {
    let counter = 0;
    this.response = null;
    this.copy = 'Copy';
    this.error = false;
    let newUrl = this.data.oldUrl;
    let newArray = newUrl.split('//');

    for (let i = 0; i < newArray.length; i++) {
      if (newArray[i] == 'http:' || newArray[i] == 'https:') {
        counter++;
      }

      if (counter == 0) {
        let newArrayOne = newUrl.split('.');

        if (newArrayOne[i] == 'www') {
          counter++;
        }

        let newArrayTwo = newUrl.indexOf('.com');
        if (newArrayTwo > 0) {
          counter++;
        }
      }
    }
    if (counter == 0) {
      this.error = true;
    } else {
      let newRandomUrl = Math.round(
        Math.pow(36, 8) - Math.random() * Math.pow(36, 8)
      );
      this.data.newUrl = 'http://localhost:8000/api/u/' + newRandomUrl;

      this.service.generateUrlShortener(this.data).subscribe((res) => {
        this.response = res;
        console.log('res', this.response.new_url);
      });
    }
  }

  copyUrlShortener() {
    navigator.clipboard.writeText(this.response.new_url).then(() => {
      // alert('Copied to clipboard!');
      this.copy = 'Copied!';
    });
  }
}
