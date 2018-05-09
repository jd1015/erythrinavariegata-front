import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ThemeComponent } from './theme/theme.component';
import { MaterialComponent } from './material/material.component';
import { ThemeService } from './theme/theme.service';

@NgModule({
  declarations: [
    AppComponent,
    ThemeComponent,
    MaterialComponent
  ],
  imports: [
    FormsModule,
    NgbModule.forRoot(),
    BrowserModule
  ],
  providers: [ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
