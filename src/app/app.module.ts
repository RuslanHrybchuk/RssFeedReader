import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FeedCardComponent } from './feed-card/feed-card.component';
import { FeedListComponent } from './feed-list/feed-list.component';
import { FeedService } from '../services/feed.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FeedCardComponent,
    FeedListComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    FeedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
