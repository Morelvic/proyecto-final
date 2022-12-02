import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario-ciudad',
  templateUrl: './formulario-ciudad.component.html',
  styleUrls: ['./formulario-ciudad.component.scss'],
})
export class FormularioCiudadComponent implements OnInit {
  modo: string;
  form: any;

  constructor() { }

  ngOnInit() {}

}
