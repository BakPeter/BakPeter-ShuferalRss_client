import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FeedItemComponent } from './feed-list/feed-item/feed-item.component';
import { FeedListComponent } from './feed-list/feed-list.component';
import { FeedListItemComponent } from './feed-list/feed-list-item/feed-list-item.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedItemComponent,
    FeedListComponent,
    FeedListItemComponent,
    HeaderComponent,
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
