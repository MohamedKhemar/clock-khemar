import { ClockManagerModel } from "../models/ClockManagerModel";
import { ClockManagerView } from "../views/ClockManagerView";

export class ClockManagerController {
    private model: ClockManagerModel;
    private view: ClockManagerView;

    constructor(model: ClockManagerModel, view: ClockManagerView) {
        this.model = model;
        this.view = view;

        this.view.bindAddClock(() => this.addClock());

        this.updateView();
    }

    private addClock(): void {
        const timezone = this.view.getSelectedTimezone();
        this.model.addWatch(timezone);
        this.updateView();
    }

    private removeClock(index: number): void {
        this.model.removeWatch(index);
        this.updateView();
    }

    private resetClock(index: number): void {
        this.model.getWatches()[index].resetTime();
        this.updateView();
    }

    private toggleFormatClock(index: number): void {
        this.model.getWatches()[index].toggleFormat24h();
        this.updateView();
    }

    private updateView(): void {
        this.view.renderClocks(
            this.model.getWatches(),
            {
                remove: (index: number) => this.removeClock(index),
                reset: (index: number) => this.resetClock(index),
                toggleFormat: (index: number) => this.toggleFormatClock(index),
            }
        );
    }
}
