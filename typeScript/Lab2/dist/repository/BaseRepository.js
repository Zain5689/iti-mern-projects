var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Timestamp } from "../decorators/Log.js";
let BaseRepository = class BaseRepository {
    items = [];
    key;
    constructor(storageKey) {
        this.key = storageKey;
        this.load();
    }
    add(item) {
        this.items.push(item);
        this.save();
    }
    delete(id) {
        this.items = this.items.filter((i) => i.id !== id);
        this.save();
    }
    getAll() {
        return [...this.items];
    }
    save() {
        localStorage.setItem(this.key, JSON.stringify(this.items));
    }
    load() {
        const data = localStorage.getItem(this.key);
        if (data)
            this.items = JSON.parse(data);
    }
};
BaseRepository = __decorate([
    Timestamp
], BaseRepository);
export { BaseRepository };
//# sourceMappingURL=BaseRepository.js.map