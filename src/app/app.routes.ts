import { Routes } from '@angular/router';
import { TripVisualizerComponent } from './components/trip-visualizer/trip-visualizer.component';
import { TripInputComponent } from './components/trip-input/trip-input.component';

export const routes: Routes = [
    { path: '', component: TripInputComponent },
    { path: 'visualize', component: TripVisualizerComponent },
];
