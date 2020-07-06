import {Injectable} from '@angular/core';
import saveAs from 'save-as'


@Injectable({
  providedIn: 'root'
})
export class ExportService {
  constructor() {
  }

  downloadFile(fileContent: any, fileName: string) {
    const blob = new Blob([JSON.stringify(fileContent)], {type: 'application/json'});
    this.downloadJSONFile(blob, fileName);

  }

  private downloadJSONFile(blob: Blob, fileName: string) {
    saveAs(blob, fileName + '.json');
  }
}
