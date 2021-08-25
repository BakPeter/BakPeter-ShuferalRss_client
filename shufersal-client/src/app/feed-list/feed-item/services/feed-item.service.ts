import { OnDestroy } from '@angular/core';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { ItemModel } from 'src/app/app-models/item.model';
import { DataRepositoryService } from 'src/app/app-services/data-repository.service';
import { ListItemService } from '../../feed-list-item/services/list-tem.service';

@Injectable({
  providedIn: 'root',
})
export class FeedItemService implements OnDestroy {
  onItemChanged = new Subject<ItemModel>();

  private itemClickSubscription: Subscription;

  constructor(
    private dataRepService: DataRepositoryService,
    private liService: ListItemService
  ) {
    this.itemClickSubscription = this.liService.onItemClickSubject.subscribe(
      (id) => {
        var item = dataRepService.getItem(id);
        this.onItemChanged.next(item);
      }
    );
  }

  ngOnDestroy(): void {
    this.itemClickSubscription.unsubscribe();
  }
}
