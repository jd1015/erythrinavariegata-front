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
  /** 編集中のマテリアル */
  inputMaterial:Material;

  /** 編集フラグ */
  isEditMode:boolean = false;

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

  /**
  * 編集ボタンが押されたときの挙動
  */
  onEdit(){
    this.inputMaterial = {
      themeId: this.material.themeId,
      materialId: this.material.materialId,
      title: this.material.title,
      content: this.material.content
    }
    this.isEditMode = true;
  }

  /**
  * キャンセルボタンが押されたときの挙動
  */
  onCancel(){
    this.isEditMode = false;
  }

  /**
  * 更新が押されたときの挙動
  */
  onUpdate(){
    this.materialService.putMaterial(this.inputMaterial)
      .subscribe(material => {
        this.material = undefined;
        this.isEditMode = false;
      });

  }
}
