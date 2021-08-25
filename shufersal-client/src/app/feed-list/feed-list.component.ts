import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { ItemModel } from '../app-models/item.model';
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

  constructor(private liService: ListItemService) {}

  ngOnInit(): void {
    this.dataUpdatSubs = this.liService.dataUpdatetSubject.subscribe(
      (responseData) => {
        this.feedItems = responseData;
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
    this.liService.onItemClickSubject.next(itemId);
  }
}
