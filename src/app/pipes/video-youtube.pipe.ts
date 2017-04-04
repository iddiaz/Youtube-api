import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'videoYoutube'
})
export class VideoYoutubePipe implements PipeTransform {

  constructor( private domsanitizer: DomSanitizer ) {}

  transform(value: string, args?: any): any {

    let url = 'https://www.youtube-nocookie.com/embed/';
    return this.domsanitizer.bypassSecurityTrustResourceUrl( url + value );
  }

}
