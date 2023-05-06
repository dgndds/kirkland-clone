import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagePatternComponent } from './components/pattern/pattern.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, PagePatternComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
