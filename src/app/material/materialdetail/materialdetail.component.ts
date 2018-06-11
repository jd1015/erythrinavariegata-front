import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  /** 登録フラグ */
  isRegisterMode:boolean = true;
  /** テーマID */
  themeId : number;

  constructor(
    private route: ActivatedRoute,
    private materialService: MaterialService
  ) { }

  ngOnInit() {
    this.themeId = +this.route.snapshot.paramMap.get('themeId');
    this.inputMaterial = {themeId: this.themeId};
  }

  getMaterial(material: Material): void {
    this.materialService.getMaterial(material.themeId, material.materialId)
      .subscribe(material => {
        this.material = material;
        this.isRegisterMode = false;
        this.isEditMode = false;
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
        this.inputMaterial = {};
        this.isEditMode = false;
        this.isRegisterMode = true;
      });

  }

  /**
  * 登録が押されたときの挙動
  */
  onRegister(){
    this.materialService.addMaterial(this.inputMaterial)
      .subscribe(material => {
        this.inputMaterial = {themeId: this.themeId};
        this.isEditMode = false;
        this.isRegisterMode = true;
      });
  }
}
