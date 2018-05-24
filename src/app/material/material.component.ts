import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Theme } from '../theme/theme';
import { Material } from './material';
import { ThemeService }  from '../theme/theme.service';
import { MaterialService }  from './material.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {

  @Input() theme: Theme;
  materials : Material[];
  materialDisplay:boolean;

  constructor(
    private route: ActivatedRoute,
    private themeService: ThemeService,
    private location: Location,
    private materialService: MaterialService
  ) { }

  ngOnInit() {
    this.getTheme();
    this.getMaterial();
  }

  getTheme(): void {
    const themeId = +this.route.snapshot.paramMap.get('themeId');
    this.themeService.getTheme(themeId)
      .subscribe(theme => this.theme = theme);
  }
  getMaterial(): void {
    const themeId = +this.route.snapshot.paramMap.get('themeId');
    this.materialService.getMaterials(themeId)
      .subscribe(materials => {
        this.materials = materials;
        if (this.materials.length === 0) {
          this.materialDisplay = false;
        } else {
          this.materialDisplay = true;
        }
      });
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.themeService.updateTheme(this.theme)
      .subscribe(() => this.goBack());
  }
}
