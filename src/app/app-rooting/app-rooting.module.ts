import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {BreakfastComponent} from '../breakfast/breakfast.component';
import {BreakfastsComponent} from '../breakfasts/breakfasts.component';

const routes: Routes = [
    { path: '', component: BreakfastsComponent},
    { path: ':id', component: BreakfastComponent, pathMatch: 'full'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        CommonModule
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRootingModule {
}
