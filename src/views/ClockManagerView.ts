import { WatchController } from "../controllers/WatchController";
import { WatchModel } from "../models/WatchModel";
import { WatchView } from "./WatchView";

export class ClockManagerView {
    private container: HTMLElement;
    private clockTemplate: HTMLTemplateElement;

    constructor() {
        const container = document.getElementById('clocks-container');
        const template = document.getElementById('clock-template') as HTMLTemplateElement;

        if (!container || !template) throw new Error('Template ou container non trouvé');

        this.container = container;
        this.clockTemplate = template;

        this.createControls();
    }

    private createControls(): void {
        if (document.getElementById("controls")) return;
        const controls = document.createElement('div');
        controls.id = "controls";
        controls.innerHTML = `
            <select id="timezone-select">
                <option value="0">GMT+0</option>
                <option value="1">GMT+1</option>
                <option value="-5">GMT-5</option>
                <option value="3">GMT+3</option>
            </select>
            <button id="add-clock-btn">Add Clock</button>
        `;

        document.body.insertBefore(controls, this.container);
    }

    public getSelectedTimezone(): number {
        const select = document.getElementById('timezone-select') as HTMLSelectElement;
        return parseInt(select.value, 10);
    }

    public bindAddClock(handler: () => void): void {
        const addBtn = document.getElementById('add-clock-btn');
        if (addBtn) {
            addBtn.addEventListener('click', handler);
        }
    }

    public renderClocks(
        watches: WatchModel[],
        handlers: any
    ): void {
        this.container.innerHTML = '';

        watches.forEach((watch, index) => {
            const watchElement = document.importNode(this.clockTemplate.content, true) as unknown as HTMLElement | null;
            const watchContainer = watchElement.querySelector('.watch') as HTMLElement | null;
            const timeDisplay = watchElement.querySelector('.time-display') as HTMLElement | null;

            if (!watchContainer || !timeDisplay) {
                throw new Error('WatchView: Impossible de récupérer les éléments HTML');
            }

            const watchView = new WatchView(watchContainer, timeDisplay);
            new WatchController(watch, watchView, watchElement);

            watch.addListener(() => {
                watchView.displayTime(watch.getTime(), watch.getEditingPart());
            });

            watchElement.querySelector('.remove-btn')?.addEventListener('click', () => handlers.remove(index));
            watchElement.querySelector('.reset-btn')?.addEventListener('click', () => handlers.reset(index));
            watchElement.querySelector('.format-btn')?.addEventListener('click', () => handlers.toggleFormat(index));

            this.container.appendChild(watchElement);
        });
    }
}
