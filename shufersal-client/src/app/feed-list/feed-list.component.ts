import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ListFeedItemModel } from './feed-list-item/list-feed-item-models/list-feed-item-model';
import { ListItemService } from './feed-list-item/services/list-tem.service';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.css'],
})
export class FeedListComponent implements OnInit, OnDestroy {
  feedItems: Array<ListFeedItemModel> = [];
  private dataUpdatSubs: Subscription;
  downloading: boolean = true;

  constructor(private liService: ListItemService) {}

  ngOnInit(): void {
    this.dataUpdatSubs = this.liService.dataUpdated$.subscribe(
      (responseData) => {
        this.feedItems = responseData;
        this.downloading = false;
      },
      (error) => {
        throw error;
      }
    );

    this.liService.loadAndStoreFeeds();
  }

  ngOnDestroy(): void {
    this.dataUpdatSubs.unsubscribe();
  }

  onItemClick(itemId: number) {
    console.log(itemId);
    this.liService.onItemClick$.next(itemId);
  }
}
