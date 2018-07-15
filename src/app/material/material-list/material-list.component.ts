import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Theme } from '../../theme/theme';
import { Material } from '../material';
import { ThemeService }  from '../../theme/theme.service';
import { MaterialService }  from '../material.service';
import { MaterialdetailComponent } from '../materialdetail/materialdetail.component';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.scss']
})
export class MaterialListComponent implements OnInit {

  @Input() theme: Theme;
  materials : Material[];
  materialDisplay:boolean;
  themeId : number;
  material:Material;
  @ViewChild(MaterialdetailComponent)
  private materialdetailComponent: MaterialdetailComponent;

  constructor(
    private route: ActivatedRoute,
    private themeService: ThemeService,
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

  save(): void {
    this.themeService.updateTheme(this.theme)
      .subscribe( );
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
    var isOk = confirm('削除しますか？');
    if (isOk) {
      this.materialService.deleteMaterial(material)
        .subscribe(material => {
          this.getMaterial();
      });
    }
  }

  onClick(material: Material){
    this.materialdetailComponent.getMaterial(material);
  }
}
