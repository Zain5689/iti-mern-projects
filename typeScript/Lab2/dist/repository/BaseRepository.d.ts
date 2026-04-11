export declare class BaseRepository<T> {
    protected items: T[];
    private key;
    constructor(storageKey: string);
    add(item: T): void;
    delete(id: number): void;
    getAll(): T[];
    private save;
    private load;
}
//# sourceMappingURL=BaseRepository.d.ts.map