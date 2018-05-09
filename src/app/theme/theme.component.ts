import { Component, OnInit } from '@angular/core';
import { Theme } from './theme';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {
  themes : Theme[];

  selectedTheme: Theme;

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.getThemes();
  }

  onSelect(theme: Theme): void {
    this.selectedTheme = theme;
  }

  getThemes(): void {
    this.themeService.getThemes()
      .subscribe(themes => this.themes = themes);
  }

}
