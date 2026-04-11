import { Timestamp } from "../decorators/Log.js";

@Timestamp
export class BaseRepository<T> {
  protected items: T[] = [];
  private key: string;

  constructor(storageKey: string) {
    this.key = storageKey;
    this.load();
  }

  public add(item: T): void {
    this.items.push(item);
    this.save();
  }

  public delete(id: number): void {
    this.items = this.items.filter((i) => (i as any).id !== id);
    this.save();
  }

  public getAll(): T[] {
    return [...this.items];
  }

  private save(): void {
    localStorage.setItem(this.key, JSON.stringify(this.items));
  }

  private load(): void {
    const data = localStorage.getItem(this.key);
    if (data) this.items = JSON.parse(data);
  }
}
