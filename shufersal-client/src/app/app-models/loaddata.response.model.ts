import { ItemModel } from './item.model';

export class LodaDataResponse {
  data: Array<ItemModel>;
  error: string;
  requestSuccess: boolean;
}
