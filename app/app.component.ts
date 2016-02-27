import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from "angular2/router";
import {WeekViewComponent} from './weekview-component';

@Component({
    selector: 'my-app',
    template:
    `
        <header>
            <nav>
                <a [routerLink]="['Week']">Current Week</a>
            </nav>
        </header>
    
        <div class="main">
            <router-outlet></router-outlet>
        </div>
    `,
    directives: [WeekViewComponent, ROUTER_DIRECTIVES]
})
@RouteConfig([
    { path: '/week', name: 'Week', component: WeekViewComponent }
])
export class AppComponent { 
    
} 