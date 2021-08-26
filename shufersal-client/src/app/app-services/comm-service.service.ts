import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ItemModel } from '../app-models/item.model';
import { LodaDataResponse } from '../app-models/loaddata.response.model';

@Injectable({
  providedIn: 'root',
})
export class CommService {
  dataUpdated$ = new Subject<ItemModel[]>();
  dataUpdateding$ = new Subject<boolean>();

  constructor(private httpClient: HttpClient) {}

  //https://localhost:44379/api/loaddata
  loadAndStoreFeeds() {
    this.dataUpdateding$.next(true);

    var remoteAddress = '/api/loaddata';
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf8',
        'Access-Control-Allow-Origin': '*',
      }),
    };

    var getData = this.httpClient.get<LodaDataResponse>(
      remoteAddress,
      httpOptions
    );
    getData.subscribe(
      (response) => {
        this.dataUpdateding$.next(false);

        if (response.requestSuccess) {
          this.dataUpdated$.next(response.data);
        } else {
          throw response.error;
        }
      },
      (error) => {
        this.dataUpdateding$.next(false);

        this.dataUpdated$.next(error);
      }
    );
  }

  updateAndStoreFeeds() {
    this.dataUpdateding$.next(true);

    // var remoteAddress = 'https://localhost:44379/api/updatedata';
    var remoteAddress = 'api/updatedata';
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf8',
      }),
    };

    var getData = this.httpClient.get<LodaDataResponse>(
      remoteAddress,
      httpOptions
    );
    getData.subscribe(
      (response) => {
        if (response.requestSuccess) {
          this.dataUpdated$.next(response.data);
        } else {
          throw response.error;
        }
      },
      (error) => {
        this.dataUpdated$.next(error);
      }
    );
  }
}
