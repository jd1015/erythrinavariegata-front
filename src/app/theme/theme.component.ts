import { Component, OnInit } from '@angular/core';
import { Theme } from './theme';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {
  theme:Theme = {
    themeId:1,
    title:'英語のお勉強',
    content:'英単語と日本語のマッピング'
  }

  constructor() { }

  ngOnInit() {
  }

}
