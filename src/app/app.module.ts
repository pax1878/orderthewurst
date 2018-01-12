import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BreakfastsComponent} from './breakfasts/breakfasts.component';
import {BreakfastService} from './breakfast.service';
import {HttpClientModule} from '@angular/common/http';
import { BreakfastComponent } from './breakfast/breakfast.component';
import { RootComponent } from './root/root.component';
import {AppRootingModule} from './app-rooting/app-rooting.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PricePipe } from './price.pipe';

@NgModule({
    declarations: [
        AppComponent,
        BreakfastsComponent,
        BreakfastComponent,
        RootComponent,
        PricePipe
    ],
    imports: [
        AppRootingModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [
        BreakfastService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
