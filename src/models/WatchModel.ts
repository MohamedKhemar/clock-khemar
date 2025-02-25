export class WatchModel{
    private hours : number;
    private minutes : number;
    private seconds : number;
    private lightOn : boolean;
    private isEditing : boolean;
    private editingPart : 'hours' | 'minutes' | null;
    private listeners: (() => void)[] = [];

    constructor() {
        const now = new Date();
        this.hours = now.getHours();
        this.minutes = now.getMinutes();
        this.seconds = now.getSeconds();
        this.isEditing = false;
        this.editingPart = null;
        this.lightOn = false;

        setInterval(() => {
            this.tick();
            this.notifyListeners();
        }, 1000);
      }
    /**
     * @function tick -> increments the time by each second in real time
     */
    private tick(): void{
        if(!this.isEditing){
            this.seconds ++;
            if(this.seconds >= 60){
                this.seconds=0;
                this.minutes++;
            }
            if(this.minutes >= 60){
                this.minutes = 0;
                this.hours = (this.hours + 1) % 24;
            }

        }
    }

    /**
     * 
     * @returns the time in the correct format

     */
    public getTime() : string{
        return `${this.formatNumber(this.hours)}:${this.formatNumber(this.minutes)}:${this.formatNumber(this.seconds)}`
    }

    /**
     * 
     * @param num : number
     * @returns two digit format
     */
    private formatNumber(num: number) : string{
        return num.toString().padStart(2,'0');
    }

    /**
     * @function togglEditMode -> allows you to switch between different editing modes
     */
    public togglEditMode() : void{
        if (!this.isEditing) {
            this.isEditing = true;
            this.editingPart = "hours";
        } else if (this.editingPart === "hours") {
            this.editingPart = "minutes";
        } else {
            this.isEditing = false;
            this.editingPart = null;
        }
        this.notifyListeners();
    }

    public increaseTime(): void {
        if (this.editingPart === "hours") {
            this.hours = (this.hours + 1) % 24;
        } else if (this.editingPart === "minutes") {
            this.minutes = (this.minutes + 1) % 60;
        }
        this.notifyListeners();
    }
    

    public toggleLight(): void {
        this.lightOn = !this.lightOn;
        this.notifyListeners();
    }
    
    public isLightOn(): boolean {
        return this.lightOn;
    }

    public addListener(listener: () => void): void {
        this.listeners.push(listener);
    }

    private notifyListeners(): void {
        this.listeners.forEach(listener => listener());
    }

    // Getters
    public getHours(): number {
    return this.hours;
    }

    public getMinutes(): number {
        return this.minutes;
    }

    public getSeconds(): number {
        return this.seconds;
    }

    public getLightOn(): boolean {
        return this.lightOn;
    }

    public getIsEditing(): boolean {
        return this.isEditing;
    }

    public getEditingPart(): 'hours' | 'minutes' | null {
        return this.editingPart;
    }

    // Setters
    public setHours(hours: number): void {
        this.hours = hours;
    }

    public setMinutes(minutes: number): void {
        this.minutes = minutes;
    }

    public setSeconds(seconds: number): void {
        this.seconds = seconds;
    }

    public setLightOn(lightOn: boolean): void {
        this.lightOn = lightOn;
    }

    public setIsEditing(isEditing: boolean): void {
        this.isEditing = isEditing;
    }

    public setEditingPart(editingPart: 'hours' | 'minutes' | null): void {
        this.editingPart = editingPart;
    }
}