import { Component, OnInit } from '@angular/core';
import { Theme } from './theme';
import { THEME } from './mock-theme';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {
  themes = THEME;

  selectedTheme: Theme;

  constructor() { }

  ngOnInit() {
  }

  onSelect(theme: Theme): void {
    this.selectedTheme = theme;
  }

}
