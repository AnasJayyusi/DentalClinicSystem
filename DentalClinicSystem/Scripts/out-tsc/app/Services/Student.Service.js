import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
let StudentService = class StudentService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        // Delcartion
        this.URL = 'http://localhost/MVCWithAngular';
    }
    getStudent() {
        return this.httpClient.get(this.URL + "/GetAllStudents")
            .pipe(map((item) => item.map(Data => ({
            Id: Data.Id,
            Name: Data.Name
        }))));
    }
    addStudent(StudentName) {
        var obj = {
            Name: StudentName,
        };
        this.httpClient.post(this.URL + "/InsertStudent", obj)
            // Just For Check If is Working 
            .subscribe(res => console.log('Done'));
    }
    removeStudent(StudentObj) {
        var obj = {
            Id: StudentObj.Id
        };
        return this.httpClient.post(this.URL + '/DeleteStudent?Id=', obj);
    }
    updateStudent(StudentObj) {
        this.httpClient.post(this.URL + "/UpdateStudent", StudentObj)
            // Just For Check If is Working 
            .subscribe(res => console.log('Done'));
    }
};
StudentService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [HttpClient])
], StudentService);
export { StudentService };
//# sourceMappingURL=Student.Service.js.map