import { OnDestroy, Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { ItemModel } from 'src/app/app-models/item.model';
import { DataRepositoryService } from 'src/app/app-services/data-repository.service';
import { ListFeedItemModel } from '../list-feed-item-models/list-feed-item-model';

@Injectable({
  providedIn: 'root',
})
export class ListItemService implements OnDestroy {
  dataUpdated$ = new Subject<ListFeedItemModel[]>();
  dataUpdateting$ = new Subject<boolean>();
  onItemClick$ = new Subject<number>();

  private dataUpdatedSubs: Subscription;
  private dataUpdatingSubs: Subscription;

  private feedItems: ListFeedItemModel[];
  error: string;

  constructor(private dataRepService: DataRepositoryService) {
    this.dataUpdatingSubs = this.dataRepService.dataUpdateding$.subscribe(
      (status) => {
        this.dataUpdateting$.next(status);
      }
    );

    this.dataUpdatedSubs = this.dataRepService.dataUpdatet$
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
          this.dataUpdated$.next(this.feedItems);
        },
        (error) => {
          this.error = error;
        }
      );
  }

  ngOnDestroy() {
    this.dataUpdatedSubs.unsubscribe();
    this.dataUpdatingSubs.unsubscribe();
  }

  loadAndStoreFeeds() {
    this.dataRepService.loadAndStoreFeeds();
  }
}
