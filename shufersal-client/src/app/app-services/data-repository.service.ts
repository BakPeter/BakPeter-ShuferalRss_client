import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { ItemModel } from '../app-models/item.model';
import { CommService } from './comm-service.service';

@Injectable({
  providedIn: 'root',
})
export class DataRepositoryService implements OnDestroy {
  dataUpdatet$: Subject<ItemModel[]> = new Subject<ItemModel[]>();
  dataUpdateding$: Subject<boolean> = new Subject<boolean>();

  private dataUpdateSub: Subscription;
  private dataUpdatingSub: Subscription;

  private feddsData: ItemModel[] = [];

  constructor(private commService: CommService) {
    this.dataUpdateSub = this.commService.dataUpdated$.subscribe((data) => {
      this.feddsData = data;
      this.dataUpdatet$.next(data);
      this.dataUpdateding$.next(true);
    });

    this.dataUpdatingSub = this.commService.dataUpdateding$.subscribe(
      (status) => {
        this.dataUpdateding$.next(status);
      }
    );
  }

  ngOnDestroy(): void {
    this.dataUpdateSub.unsubscribe();
    this.dataUpdatingSub.unsubscribe();
  }

  getItem(id: number): ItemModel {
    return this.feddsData[id];
  }

  updateData() {
    this.dataUpdateding$.next(true);
    this.commService.updateAndStoreFeeds();
  }

  loadAndStoreFeeds() {
    this.dataUpdateding$.next(true);
    this.commService.loadAndStoreFeeds();
  }
}
