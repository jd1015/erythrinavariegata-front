import { Component, OnInit } from '@angular/core';
import { Theme } from './theme';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {
  themes : Theme[];

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.getThemes();
  }

  getThemes(): void {
    this.themeService.getThemes()
      .subscribe(themes => this.themes = themes);
  }
  add(title: string, content: string): void {
    title = title.trim();
    content = content.trim();
    if (!title) { return; }
      this.themeService.addTheme({ title, content } as Theme)
        .subscribe(theme => {
          this.getThemes();
        //this.themes.push(theme); // FIXME 追加したAPIの返却を行った後に表示させる
    });
  }
  delete(theme: Theme): void {
    this.themes = this.themes.filter(t => t !== theme);
    this.themeService.deleteTheme(theme).subscribe();
  }
}
