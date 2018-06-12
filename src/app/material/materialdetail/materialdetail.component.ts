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
  /** 表示フラグ */
  isDisplayMode:boolean = false;
  /** テーマID */
  themeId : number;

  constructor(
    private route: ActivatedRoute,
    private materialService: MaterialService
  ) { }

  ngOnInit() {
    this.themeId = +this.route.snapshot.paramMap.get('themeId');
    this.inputMaterial = {
      themeId: this.themeId,
      materialId: null,
      title: null,
      content: null
    };
  }

  getMaterial(material: Material): void {
    this.materialService.getMaterial(material.themeId, material.materialId)
      .subscribe(material => {
        this.material = material;
        this.isRegisterMode = false;
        this.isEditMode = false;
        this.isDisplayMode = true;
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
    this.isRegisterMode = false;
    this.isDisplayMode = false;
  }

  /**
  * キャンセルボタンが押されたときの挙動
  */
  onCancel(){
    this.isEditMode = false;
    this.isDisplayMode = true;
    this.isRegisterMode = false;
  }

  /**
  * 更新が押されたときの挙動
  */
  onUpdate(){
    this.materialService.putMaterial(this.inputMaterial)
      .subscribe(material => {
        this.material = undefined;
        this.inputMaterial = {
          themeId: this.themeId,
          materialId: null,
          title: null,
          content: null
        };
        this.isEditMode = false;
        this.isRegisterMode = true;
        this.isDisplayMode = false;
      });

  }

  /**
  * 登録が押されたときの挙動
  */
  onRegister(){
    this.materialService.addMaterial(this.inputMaterial)
      .subscribe(material => {
        this.inputMaterial = {
          themeId: this.themeId,
          materialId: null,
          title: null,
          content: null
        };
        this.isEditMode = false;
        this.isRegisterMode = true;
        this.isDisplayMode = false;
      });
  }
}
