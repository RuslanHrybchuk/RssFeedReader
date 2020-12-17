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
import { FeedItemCardComponent } from './feed-item-card/feed-item-card.component';
import { FeedItemListComponent } from './feed-item-list/feed-item-list.component';
import { SafeHtmlPipe } from './pipes/safe-html-pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FeedCardComponent,
    FeedListComponent,
    FeedItemCardComponent,
    FeedItemListComponent,
    SafeHtmlPipe
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
