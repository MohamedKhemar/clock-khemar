import { WatchModel } from '../models/WatchModel';
import { WatchView } from '../views/WatchView';

export class WatchController {
  private model: WatchModel;
  private view: WatchView;

  constructor(model: WatchModel, view: WatchView) {
    this.model = model;
    this.view = view;
  }

  public start(): void {
    this.model.addListener(() => this.updateView());

    const modeBtn = document.getElementById('mode-btn');
    const increaseBtn = document.getElementById('increase-btn');
    const lightBtn = document.getElementById('light-btn');

    if (modeBtn && increaseBtn && lightBtn) {
      modeBtn.addEventListener('click', () => this.switchMode());
      increaseBtn.addEventListener('click', () => this.increaseTime());
      lightBtn.addEventListener('click', () => this.toggleLight());
    }
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
