import { Component, OnInit } from '@angular/core';
import { Theme } from '../theme/theme';
import { ThemeService } from '../theme/theme.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  themes: Theme[] = [];

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.getThemes();
  }
  getThemes(): void {
    this.themeService.getThemes()
    .subscribe(themes => this.themes = themes.slice(1, 5));
  }

}
