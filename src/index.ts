import './index.css';

import { WatchModel } from './models/WatchModel';
import { WatchView } from './views/WatchView';
import { WatchController } from './controllers/WatchController';

const model = new WatchModel();
const view = new WatchView();
const controller = new WatchController(model, view);

controller.start();

