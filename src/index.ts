import './index.css';

import { ClockManagerModel } from './models/ClockManagerModel';
import { ClockManagerView } from "./views/ClockManagerView";
import { ClockManagerController } from "./controllers/ClockManagerController";

const clockManager = new ClockManagerModel();
const clockView = new ClockManagerView();
const clockController = new ClockManagerController(clockManager, clockView);


