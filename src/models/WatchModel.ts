export class WatchModel{
    private hours : number;
    private minutes : number;
    private seconds : number;
    private lightOn : boolean;
    private isEditing : boolean;
    private editingPart : 'hours' | 'minutes' | null;
    private listeners: (() => void)[] = [];

    private timezoneOffset: number;
    private format24h: boolean; 

    constructor(timezoneOffset: number = 0) {
        this.timezoneOffset = timezoneOffset;
        this.format24h = true;

        const now = new Date();
        now.setHours(now.getUTCHours() + this.timezoneOffset);
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

    public resetTime(): void {
        const now = new Date();
        now.setHours(now.getUTCHours() + this.timezoneOffset);
        this.hours = now.getHours();
        this.minutes = now.getMinutes();
        this.seconds = now.getSeconds();
        this.notifyListeners();
    }

    public toggleFormat24h(): void {
        this.format24h = !this.format24h;
        this.notifyListeners();
    }

    /**
     * 
     * @returns the time in the correct format

     */
    public getTime(): string {
        let displayHours = this.hours;
        let period = '';
    
        if (!this.format24h) { // Mode AM/PM atcif
            if (displayHours === 0) { // Minuit = 12:XX AM
                displayHours = 12;
                period = ' AM';
            } else if (displayHours === 12) { // Midi = 12:XX PM
                period = ' PM';
            } else if (displayHours > 12) { // 13h-23h = PM
                displayHours -= 12;
                period = ' PM';
            } else { // 1h-11h = AM
                period = ' AM';
            }
        }
    
        return `${this.formatNumber(displayHours)}:${this.formatNumber(this.minutes)}:${this.formatNumber(this.seconds)}${period}`;
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