import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Theme } from '../theme/theme';
import { ThemeService }  from '../theme/theme.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {

  @Input() theme: Theme;

  constructor(
    private route: ActivatedRoute,
    private themeService: ThemeService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getTheme();
  }

  getTheme(): void {
    const themeId = +this.route.snapshot.paramMap.get('themeId');
    this.themeService.getTheme(themeId)
      .subscribe(theme => this.theme = theme);
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.themeService.updateTheme(this.theme)
      .subscribe(() => this.goBack());
  }
}
