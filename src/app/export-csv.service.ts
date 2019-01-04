import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExportCsvService {

  private csvTryQuote(data: string) {
    if (data.includes(',')) {
      return '"' + data.replace(/"/g, '""') + '"';
    }

    return data.replace(/"/g, '""');
  }

  private toCsv(header: string[], dados: any[]) {
    let csv = '\ufeff';
    let csvSeparator = ',';

    header.forEach((d, i) => {
      csv += this.csvTryQuote(header[i]);
      csv += csvSeparator;
    });

    let quebra = 0;

    csv += '\n';

    dados.forEach((d, i) => {
      csv += this.csvTryQuote(dados[i].toString());
      quebra++;
      csv += csvSeparator;

      if (quebra === header.length) {
        csv += '\n';
        quebra = 0;
      }
    });

    return csv;
  }

  export(data: string, mimeTypeAndCharset: string, filename: string) {
    let blob = new Blob([data], {
      type: mimeTypeAndCharset
    });

    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, filename);
    }
    else {
      let link = document.createElement("a");
      link.style.display = 'none';
      document.body.appendChild(link);
      if (link.download !== undefined) {
        link.setAttribute('href', URL.createObjectURL(blob));
        link.setAttribute('download', filename);
        link.click();
      }
      else {
        data = mimeTypeAndCharset + ',' + data;
        window.open(encodeURI(data));
      }
      document.body.removeChild(link);
    }
  }

  exportCsv(header: string[], dados: any[], filename: string) {
    let csv = this.toCsv(header, dados);
    this.export(csv, 'text/csv;charset=utf-8;', filename);
  }

}
