import { Component, OnInit } from '@angular/core';
import { Person } from './person.model';
import { ExportCsvService } from './export-csv.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  people: Array<Person>;

  selectedPeople: Array<Person>;

  constructor(private exportCsvService: ExportCsvService) {

  }

  ngOnInit() {
    
    this.people = [
      new Person('657766', 'Josimar', 23),
      new Person('565465', 'João', 25),
      new Person('454545', 'Maria', 21),
    ];

  }

  exportCSV() {
    const header = ['CPF', 'Name', 'Age'];

    const dados = [];

    this.people.forEach((p) => {
      dados.push(p.cpf);
      dados.push(this.isJosimar(p));
      dados.push(p.age);
    });

    this.exportCsvService.exportCsv(header, dados, 'People.csv');
  }

  isJosimar(p: Person): string {
    if(p.name === 'Josimar') 
      return 'Josimar Junior'.toUpperCase();
    return p.name.toUpperCase();
  }
}
