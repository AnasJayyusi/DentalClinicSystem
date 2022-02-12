import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
let GithubService = class GithubService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    getUserRepos() {
        return this.httpClient.get(`https://api.github.com/users/mithunvp/repos`).
            pipe(map((item) => item.map(p => ({
            name: p.name,
            stars: p.stargazers_count,
            htmlUrl: p.html_url,
            forks: p.forks,
            description: p.description
        }))));
    }
};
GithubService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [HttpClient])
], GithubService);
export { GithubService };
//# sourceMappingURL=github.service.js.map