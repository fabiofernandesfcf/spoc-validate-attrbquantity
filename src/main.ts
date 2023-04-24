import 'zone.js/dist/zone';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { file } from './importedFile.constant';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Numero total de linhas do ficheiro é {{lines}}</h1>
    <div>
    <strong>Linhas validas =></strong> <span>{{valid}}</span>
    <br>
    <strong>Linhas inválidas =></strong> <span>{{invalid}}</span>
    <br>
    <strong>Linhas analisadas =></strong> <span>{{valid + invalid}}</span>
    </div>
    
    <br>
    <br>

    <ng-container *ngFor="let error of invalidLines">
      <p> {{error}} </p>
    </ng-container>
  `,
})
export class App implements OnInit{
  lines = 0;
  valid = 0;
  invalid = 0;
  invalidLines: any[] = [];
  file = file;

  ngOnInit() {
    const parsedFile = JSON.parse(file);
    // console.log("Parsed File = ", parsedFile);

    const data = parsedFile.CatalogProject.catalogProjects.infoTable[0].data;

    // console.log("Data string = ", data);

    const parsedData = JSON.parse(data);

    // console.log("Parsed Data = ", parsedData);

    const lines = parsedData.infoTableRecords.data;
    this.lines = lines.length;

    // console.log("Number of lines of the file = ", this.lines);

    // console.log("Lines", lines);
    // const size = lines[0].split(',')
    // console.log("size", size)
    this.checkIsValid(lines);
  }

  checkIsValid(lines) {
    lines.forEach((line, index) => {
      const splitedLine = line.split(',');
      if (splitedLine.length === 22)
      this.valid ++;
      else {
        this.invalid ++
        this.invalidLines.push('Erro na linha ' + index + 'linha com ' + splitedLine.length + 'atributos');
      }      
    })
  }
}

bootstrapApplication(App);
