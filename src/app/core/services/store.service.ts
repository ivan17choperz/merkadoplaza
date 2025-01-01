import { inject, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private _ionStorage: Storage) {
    this._ionStorage.create();
  }

  public saveData(key: string, value: any) {
    this._ionStorage.set(key, value);
  }

  public getData(key: string) {
    return this._ionStorage.get(key);
  }

  public removeData(key: string) {
    this._ionStorage.remove(key);
  }

  public clearData() {
    this._ionStorage.clear();
  }
}
