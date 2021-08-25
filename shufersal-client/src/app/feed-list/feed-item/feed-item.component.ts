import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ItemModel } from 'src/app/app-models/item.model';
import { FeedItemService } from './services/feed-item.service';

@Component({
  selector: 'app-feed-item',
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.css'],
})
export class FeedItemComponent implements OnInit, OnDestroy {
  @Input() feed: ItemModel = null;

  private itemChangedSubscriotion: Subscription;

  constructor(private feedItemService: FeedItemService) {}

  ngOnInit(): void {
    this.itemChangedSubscriotion = this.feedItemService.onItemChanged.subscribe(
      (feed) => {
        this.feed = feed;
      }
    );
  }

  ngOnDestroy(): void {
    this.itemChangedSubscriotion.unsubscribe();
  }
}
