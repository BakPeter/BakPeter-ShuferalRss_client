import { OnDestroy, Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { ItemModel } from 'src/app/app-models/item.model';
import { CommService } from 'src/app/app-services/comm-service.service';
import { DataRepositoryService } from 'src/app/app-services/data-repository.service';
import { ListFeedItemModel } from '../list-feed-item-models/list-feed-item-model';

@Injectable({
  providedIn: 'root',
})
export class ListItemService implements OnDestroy {
  dataUpdatetSubject = new Subject<ListFeedItemModel[]>();
  onItemClickSubject = new Subject<number>();

  private dataUpdatSubs: Subscription;
  private feedItems: ListFeedItemModel[];
  error: string;

  constructor(
    private comService: CommService,
    private dataRepService: DataRepositoryService
  ) {
    this.dataUpdatSubs = this.dataRepService.dataUpdatetSubject
      .pipe<ListFeedItemModel[]>(
        map((feeds: ItemModel[]) => {
          if (feeds.length) {
            var retVal: Array<ListFeedItemModel> = [];

            for (const element of feeds) {
              retVal.push(
                new ListFeedItemModel(element.title, element.latUpdateDate)
              );
            }

            return retVal;
          }
        })
      )
      .subscribe(
        (responseData) => {
          this.feedItems = responseData;
          this.dataUpdatetSubject.next(this.feedItems);
        },
        (error) => {
          this.error = error;
        }
      );
  }

  ngOnDestroy() {
    this.dataUpdatSubs.unsubscribe();
  }

  loadAndStoreFeeds() {
    this.comService.loadAndStoreFeeds();
  }
}
