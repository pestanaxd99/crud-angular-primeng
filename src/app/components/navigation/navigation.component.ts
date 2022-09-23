import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
    
    constructor() { }

    items: MenuItem[] = [];
    activeItem!: MenuItem;

    ngOnInit() {
        this.items = [
            { routerLink: ['home'] ,    label: 'Home', icon: 'pi pi-fw pi-home'},
            { routerLink: ['calendar'], label: 'Calendar', icon: 'pi pi-fw pi-calendar'},
            // { routerLink: ['not-found'],label: 'Error', icon: 'pi pi-fw pi-ban'},
            { routerLink: ['login'],    label: 'Login', icon: 'pi pi-wf pi-user'},
            { label: 'Log Out', icon: 'pi pi-wf pi-sign-out'}
        ];

        this.activeItem = this.items[0];
    }


}

