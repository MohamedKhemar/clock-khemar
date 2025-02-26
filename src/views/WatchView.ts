export class WatchView {
    private timeElement: HTMLElement;
    private watchContainer: HTMLElement;
    private blinkInterval: number | null = null;
  
    constructor(watchContainer : HTMLElement,timeElement: HTMLElement) {
      if (!timeElement || !watchContainer) {
        throw new Error('HTML elements not found');
      }
  
      this.timeElement = timeElement;
      this.watchContainer = watchContainer;
    }

    /**
     * 
     * @param time 
     * @param editingPart 
     * @function displayTime -> Manage time and blinking
     */
    public displayTime(time: string, editingPart: 'hours' | 'minutes' | null): void {
      const [hours, minutes, seconds] = time.split(":");

      // creating an HTML structure with spans to separate the parts
      this.timeElement.innerHTML = `
          <span class="hours">${hours}</span>:
          <span class="minutes">${minutes}</span>:
          <span class="seconds">${seconds}</span>
      `;

      // stop blinking
      if (this.blinkInterval !== null) {
          clearInterval(this.blinkInterval);
          this.blinkInterval = null;
      }

      // Checking editingPart to enable blinking
      if (editingPart) {
          const elementToBlink = this.timeElement.querySelector(`.${editingPart}`) as HTMLElement | null;
          if (elementToBlink) {
              let isVisible = true;
              this.blinkInterval = window.setInterval(() => {
                  isVisible = !isVisible;
                  requestAnimationFrame(() => {
                      elementToBlink.style.opacity = isVisible ? "1" : "0.3";
                  });
              }, 500);
          }
      }
    }

       /**
     * 
     * @param isLightOn 
     * @function toggleLight -> Manage the light
     */
    public toggleLight(isLightOn: boolean): void {
      this.watchContainer.style.backgroundColor = isLightOn ? '#FFFFFF' : '#FBE106';
    }
  }
  