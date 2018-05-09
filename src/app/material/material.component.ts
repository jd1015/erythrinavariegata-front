import { Component, OnInit, Input } from '@angular/core';
import { Theme } from '../theme/theme';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {

  @Input() theme: Theme;

  constructor() { }

  ngOnInit() {
  }

}
