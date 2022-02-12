import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { toaster } from './toaster';
let AppComponent = class AppComponent {
    // Ctor  + ngOnInIt
    constructor(router, toaster) {
        this.router = router;
        this.toaster = toaster;
        this.today = Date.now();
        this.title = '';
    }
    ngOnInit() {
        this.router.navigate(['Calendar'], { skipLocationChange: true });
    }
};
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    }),
    __metadata("design:paramtypes", [Router,
        toaster])
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map