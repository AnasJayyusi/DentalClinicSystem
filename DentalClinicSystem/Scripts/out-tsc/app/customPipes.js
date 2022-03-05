import { __decorate } from "tslib";
import { Pipe } from "@angular/core";
let ShortNamePipe = class ShortNamePipe {
    transform(fullName) {
        return fullName.split(' ')[0];
    }
};
ShortNamePipe = __decorate([
    Pipe({
        name: "shortName"
    })
], ShortNamePipe);
export { ShortNamePipe };
//# sourceMappingURL=customPipes.js.map