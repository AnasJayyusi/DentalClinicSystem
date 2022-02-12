import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { toaster } from './toaster';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    today: number = Date.now();
    // Ctor  + ngOnInIt
    constructor(
        private router: Router,
        private toaster: toaster) {
    }

    ngOnInit(): void {
        this.router.navigate(['Calendar'], { skipLocationChange: true });
    }
    title = '';


}

