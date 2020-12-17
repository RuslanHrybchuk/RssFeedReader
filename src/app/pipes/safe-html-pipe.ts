import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtmlPipe'
})
export class SafeHtmlPipe implements PipeTransform {

  transform(content: string): any {
    return this._sanitized.bypassSecurityTrustHtml(content);
  }

  constructor(private _sanitized: DomSanitizer) { }
}
