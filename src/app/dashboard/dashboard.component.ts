import { Component, OnInit } from '@angular/core';
import { Theme } from '../theme/theme';
import { ThemeService } from '../theme/theme.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  themes: Theme[] = [];

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.getThemes();
  }
  getThemes(): void {
    this.themeService.getThemes()
    .subscribe(themes => {
      // 件数で降順にソート
      themes.sort(function(a, b){
        if (a.materialCount > b.materialCount) return -1;
        if (a.materialCount < b.materialCount) return 1;
        return 0;
      });
      this.themes = themes;
    });
  }

}
