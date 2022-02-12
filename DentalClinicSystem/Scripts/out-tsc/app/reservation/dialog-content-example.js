import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
/**
 * @title Dialog with header, scrollable content and actions
 */
let DialogContentExample = class DialogContentExample {
    constructor(dialog) {
        this.dialog = dialog;
    }
    openDialog() {
        const dialogRef = this.dialog.open(DialogContentExampleDialog);
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }
};
DialogContentExample = __decorate([
    Component({
        selector: 'dialog-content-example',
        templateUrl: 'dialog-content-example.html',
    }),
    __metadata("design:paramtypes", [MatDialog])
], DialogContentExample);
export { DialogContentExample };
let DialogContentExampleDialog = class DialogContentExampleDialog {
};
DialogContentExampleDialog = __decorate([
    Component({
        selector: 'dialog-content-example-dialog',
        templateUrl: './dialog-content-example-dialog.html',
    })
], DialogContentExampleDialog);
export { DialogContentExampleDialog };
/**  Copyright 2022 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */ 
//# sourceMappingURL=dialog-content-example.js.map