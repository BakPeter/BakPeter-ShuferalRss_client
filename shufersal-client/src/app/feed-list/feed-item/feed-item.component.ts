import {
  ViewChild,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { ItemModel } from 'src/app/app-models/item.model';
import { FeedItemService } from './services/feed-item.service';

@Component({
  selector: 'app-feed-item',
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.css'],
})
export class FeedItemComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() feed: ItemModel = null;

  @ViewChild('title') elTitle: ElementRef;
  @ViewChild('summary') elSummary: ElementRef;
  dataUpdating: boolean = true;

  private itemChangedSub: Subscription;
  private dataUpdatedSub: Subscription;
  private dataUpdatedingSub: Subscription;

  constructor(private feedItemService: FeedItemService) {}

  ngOnInit(): void {
    this.itemChangedSub = this.feedItemService.itemChanged$.subscribe(
      (feed) => {
        this.feed = feed;
      }
    );

    this.dataUpdatedSub = this.feedItemService.dataUpdated$.subscribe(() => {
      this.feed = null;
      this.dataUpdating = false;
    });

    this.dataUpdatedingSub = this.feedItemService.dataUpdating$.subscribe(
      (status) => {
        this.dataUpdating = status;
      }
    );
  }

  ngAfterViewInit(): void {
    this.elTitle.nativeElement.innerHTML = this.feed.title;
    this.elSummary.nativeElement.innerHTML = this.feed.summary;
  }

  ngOnDestroy(): void {
    this.itemChangedSub.unsubscribe();
    this.dataUpdatedSub.unsubscribe();
    this.dataUpdatedingSub.unsubscribe();
  }
}
