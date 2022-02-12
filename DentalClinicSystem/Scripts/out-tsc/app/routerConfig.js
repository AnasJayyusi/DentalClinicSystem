import { CalendarComponent } from './calendar/calendar.component';
import { PatientComponent } from './patient/patient.component';
import { PatientListComponent } from './patient/patient.list.component';
import { ReportComponent } from './report/report.component';
import { ReservationComponent } from './reservation/reservation.component';
export const appRoutes = [
    {
        path: 'Calendar',
        component: CalendarComponent
    },
    {
        path: 'Reservation',
        component: ReservationComponent
    },
    {
        path: 'Report',
        component: ReportComponent
    },
    //{
    //    path: 'BillingAndAccounting',
    //    component: BillingAndAccountingComponent
    //},
    {
        path: 'Patient',
        component: PatientComponent,
        children: [
            { path: 'edit/:id', component: PatientComponent }
        ]
    },
    {
        path: 'Patient/PatientList',
        component: PatientListComponent
    },
];
export default appRoutes;
//# sourceMappingURL=routerConfig.js.map