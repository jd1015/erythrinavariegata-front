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
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit {

  @Input() theme: Theme;
  materials : Material[];
  materialDisplay:boolean;
  themeId : number;
  material:Material;

  constructor(
    private route: ActivatedRoute,
    private themeService: ThemeService,
    private location: Location,
    private materialService: MaterialService
  ) { }

  ngOnInit() {
    this.themeId = +this.route.snapshot.paramMap.get('themeId');
    this.getTheme();
    this.getMaterial();
  }

  getTheme(): void {
    this.themeService.getTheme(this.themeId)
      .subscribe(theme => this.theme = theme);
  }
  getMaterial(): void {
    this.materialService.getMaterials(this.themeId)
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
  add(title: string, content: string): void {
    title = title.trim();
    content = content.trim();
    if (!title && !content) { return; }
    this.material = {
      themeId:this.themeId,
      materialId:null,
      title:title,
      content:content
    };
    this.materialService.addMaterial(this.material)
      .subscribe(material => {
        this.getMaterial();
    });
  }
  delete(material: Material): void {
    this.materialService.deleteMaterial(material)
      .subscribe(material => {
        this.getMaterial();
    });
  }

}
