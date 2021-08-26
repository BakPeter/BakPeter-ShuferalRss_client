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
  itemChanged$ = new Subject<ItemModel>();
  dataUpdated$ = new Subject<void>();
  dataUpdating$ = new Subject<boolean>();

  private itemClickSubscription: Subscription;
  private dataUpdatedSubscription: Subscription;
  private dataUpdatingSubscription: Subscription;

  constructor(
    private dataRepService: DataRepositoryService,
    private liService: ListItemService
  ) {
    this.itemClickSubscription = this.liService.onItemClick$.subscribe((id) => {
      var item = dataRepService.getItem(id);
      this.itemChanged$.next(item);
    });

    this.dataUpdatedSubscription = this.dataRepService.dataUpdatet$.subscribe(
      () => {
        this.dataUpdated$.next();
      }
    );

    this.dataUpdatingSubscription =
      this.dataRepService.dataUpdateding$.subscribe((status) => {
        this.dataUpdating$.next(status);
      });
  }

  ngOnDestroy(): void {
    this.itemClickSubscription.unsubscribe();
    this.dataUpdatedSubscription.unsubscribe();
    this.dataUpdatingSubscription.unsubscribe();
  }
}
