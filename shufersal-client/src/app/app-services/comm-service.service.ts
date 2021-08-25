import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ItemModel } from '../app-models/item.model';
import { LodaDataResponse } from '../app-models/loaddata.response.model';

@Injectable({
  providedIn: 'root',
})
export class CommService {
  dataUpdated = new Subject<ItemModel[]>();

  constructor(private httpClient: HttpClient) {}

  //https://localhost:44379/api/loaddata
  loadAndStoreFeeds() {
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
        if (response.requestSuccess) {
          this.dataUpdated.next(response.data);
        } else {
          throw response.error;
        }
      },
      (error) => {
        this.dataUpdated.next(error);
      }
    );
  }

  updateAndStoreFeeds() {
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
          this.dataUpdated.next(response.data);
        } else {
          throw response.error;
        }
      },
      (error) => {
        this.dataUpdated.next(error);
      }
    );
  }
}
