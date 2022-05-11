import { StorageKey } from '~/common/enums/enums';

type Constructor = {
  storage: globalThis.Storage;
};

export class Storage {
  #storage: globalThis.Storage;

  constructor({ storage }: Constructor) {
    this.#storage = storage;
  }

  getItem(key: StorageKey): string | null {
    return this.#storage.getItem(key);
  }

  setItem(key: StorageKey, value: string): void {
    this.#storage.setItem(key, value);
  }

  remove(key: StorageKey): void {
    this.#storage.removeItem(key);
  }
}
