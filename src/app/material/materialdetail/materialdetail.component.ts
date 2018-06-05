import { Component, OnInit } from '@angular/core';

import { MaterialService }  from '../material.service';
import { Material } from '../material';

@Component({
  selector: 'app-materialdetail',
  templateUrl: './materialdetail.component.html',
  styleUrls: ['./materialdetail.component.scss']
})
export class MaterialdetailComponent implements OnInit {

  material:Material;

  constructor(
    private materialService: MaterialService
  ) { }

  ngOnInit() {
  }

  getMaterial(material: Material): void {
    this.materialService.getMaterial(material.themeId, material.materialId)
      .subscribe(material => {
        this.material = material;
      });
  }

}
