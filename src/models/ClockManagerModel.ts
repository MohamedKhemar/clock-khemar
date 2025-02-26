import { WatchModel } from "./WatchModel";

export class ClockManagerModel {
    private watches : WatchModel[] = [];
    private listeners: (() => void)[] = [];

    constructor(){
        this.addWatch(0);
    }
    
    public addWatch(timezoneOffset : number) : void{
        const watch = new WatchModel(timezoneOffset);
        watch.addListener(()=>this.notifyListeners());
        this.watches.push(watch);
        this.notifyListeners;
    }

    public removeWatch(index: number): void {
        if (index >= 0 && index < this.watches.length) {
            this.watches.splice(index, 1);
            this.notifyListeners();
        }
    }

    public getWatches(): WatchModel[] {
        return this.watches;
    }

    public addListener(listener: () => void): void {
        this.listeners.push(listener);
    }

    private notifyListeners(): void {
        this.listeners.forEach(listener => listener());
    }
}