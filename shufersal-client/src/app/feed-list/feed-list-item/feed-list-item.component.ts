import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ListFeedItemModel } from './list-feed-item-models/list-feed-item-model';

@Component({
  selector: 'app-feed-list-item',
  templateUrl: './feed-list-item.component.html',
  styleUrls: ['./feed-list-item.component.css'],
})
export class FeedListItemComponent implements OnInit {
  @Input() feedItem: ListFeedItemModel;

  constructor() {}

  ngOnInit(): void {}
}
