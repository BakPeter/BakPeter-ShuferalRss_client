import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { ItemModel } from '../app-models/item.model';
import { CommService } from './comm-service.service';

@Injectable({
  providedIn: 'root',
})
export class DataRepositoryService implements OnDestroy {
  dataUpdatetSubject: Subject<ItemModel[]> = new Subject<ItemModel[]>();

  private feddsData: ItemModel[] = [];
  private dataUpdateSub: Subscription;

  constructor(private commService: CommService) {
    this.dataUpdateSub = this.commService.dataUpdated.subscribe((data) => {
      this.feddsData = data;
      this.dataUpdatetSubject.next(data);
    });
  }

  ngOnDestroy(): void {
    this.dataUpdateSub.unsubscribe();
  }

  getItem(id: number): ItemModel {
    return this.feddsData[id];
  }
}
