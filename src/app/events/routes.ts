import { Route } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { DialogEntryComponent } from '../shared/dialog-entry/dialog-entry.component';
import { EditEventComponent } from './edit-event/edit-event.component';

export const EVENTS_ROUTES: Route[] = [
  {
    path: '',
    component: OverviewComponent,
  },
  { path: 'overview', component: OverviewComponent },
  {
    path: 'edit/:UUID',
    component: DialogEntryComponent,
    data: {
      dialog: EditEventComponent,
    },
  },
];
