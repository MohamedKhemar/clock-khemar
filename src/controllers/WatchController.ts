import { WatchModel } from "../models/WatchModel";
import { WatchView } from "../views/WatchView";

export class WatchController {
    private model: WatchModel;
    private view: WatchView;

    constructor(model: WatchModel, view: WatchView, watchElement: HTMLElement) {
        this.model = model;
        this.view = view;

        // Attaching events to buttons inside each clock
        watchElement.querySelector(".mode-btn")?.addEventListener("click", () => this.switchMode());
        watchElement.querySelector(".increase-btn")?.addEventListener("click", () => this.increaseTime());
        watchElement.querySelector(".light-btn")?.addEventListener("click", () => this.toggleLight());

        // Dynamic display update
        this.model.addListener(() => this.updateView());
    }

    private switchMode(): void {
        this.model.togglEditMode();
    }

    private increaseTime(): void {
        this.model.increaseTime();
    }

    private toggleLight(): void {
        this.model.toggleLight();
    }

  private updateView(): void {
    const time = this.model.getTime();
    const editingPart = this.model.getEditingPart();
    const isLightOn = this.model.getLightOn();

    this.view.displayTime(time, editingPart);
    this.view.toggleLight(isLightOn);
  }
}
