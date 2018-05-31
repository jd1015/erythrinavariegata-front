import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { ThemeComponent } from './theme/theme.component';
import { MaterialComponent } from './material/material.component';
import { ThemeService } from './theme/theme.service';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialdetailComponent } from './material/materialdetail/materialdetail.component';

@NgModule({
  declarations: [
    AppComponent,
    ThemeComponent,
    MaterialComponent,
    DashboardComponent,
    MaterialdetailComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
