import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { GithubService } from '../github.service';
let GitreposComponent = class GitreposComponent {
    constructor(githubserv, router) {
        this.githubserv = githubserv;
        this.router = router;
    }
    ngOnInit() {
        this.loadGithubRepos();
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });
    }
    loadGithubRepos() {
        this.githubserv.getUserRepos().subscribe((data) => {
            this.gitRepoList = data;
        });
    }
};
GitreposComponent = __decorate([
    Component({
        selector: 'app-gitrepos',
        templateUrl: './gitrepos.component.html',
        styleUrls: ['./gitrepos.component.css']
    }),
    __metadata("design:paramtypes", [GithubService, Router])
], GitreposComponent);
export { GitreposComponent };
//# sourceMappingURL=gitrepos.component.js.map