import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { StudentService } from '../Services/Student.Service';
let studentComponent = class studentComponent {
    constructor(Service) {
        this.Service = Service;
        this.CheckEditMode = false;
    }
    ngOnInit() {
        this.LoadStudents(); // Run When Page Loaded
    }
    LoadStudents() {
        this.Service.getStudent() // Calling Serivce
            .subscribe((data) => {
            this.ListStudent = data; // Store data in the List
        });
    }
    AddStudent(StudentName) {
        var Name = StudentName;
        this.Service.addStudent(StudentName);
        // Call It again To Refersh Table after add record 
        this.LoadStudents();
        /** Note: Maybe there is more Professional way to do that but I don't know for now :D  */
    }
    DeleteStudent(StudentObj) {
        // This Part One: For Delete From Server
        this.Service.removeStudent(StudentObj)
            .subscribe(Response => {
            // This Part two: For Delete From UI
            let index = this.ListStudent.indexOf(StudentObj);
            this.ListStudent.splice(index, 1);
        });
    }
    EditStudent(StudentId) {
        // CheckEditMode >> Responsible for Show & Hide The Div Of Details
        if (StudentId !== null)
            this.CheckEditMode = true;
        // We can use (Find Or Filter) To Get Name From List Of Student & Display at Input Field
        var StdObj = this.ListStudent.find(x => x.Id === StudentId);
        this.NewStudentName = StdObj.Name;
        this.NewStudentId = StdObj.Id; // For Future If we want to Update
    }
    Update(NewStudentName) {
        var obj = {
            Id: this.NewStudentId,
            Name: NewStudentName
        };
        this.Service.updateStudent(obj);
        this.LoadStudents();
    }
};
studentComponent = __decorate([
    Component({
        selector: 'app-student',
        templateUrl: './student.component.html',
        styleUrls: ['./student.component.css']
    }),
    __metadata("design:paramtypes", [StudentService])
], studentComponent);
export { studentComponent };
//# sourceMappingURL=student.component.js.map