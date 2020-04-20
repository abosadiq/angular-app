import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../user/user";
import { environment } from "../../../environments/environment";
import { AlertService } from "./alert.service";
import { Router, ActivatedRoute } from "@angular/router";

let users = JSON.parse(localStorage.getItem("users")) || [];

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  signup(body) {
    // here i am receiving user object and registered user to local storage
    const user = body;

    if (users.find((x) => x.username === user.username)) {
      return this.alertService.error(
        'Username "' + user.username + '" is already taken'
      );
    }

    user.id = users.length ? Math.max(...users.map((x) => x.id)) + 1 : 1;
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    return console.log("registered", users);
  }
  login(username: string, password: string) {
    // here just  matching username and password and your previous implementation will be using in success
    console.log(username, password);
    const user = users.find(
      (x) => x.username === username && x.password === password
    );
    if (!user) {
      return this.alertService.error("Username or password is incorrect");
    } else {
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        this.router.navigate(["/"]);
        this.currentUserSubject.next(user);
      }
      return user;
    }
  }
  logout() {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }
}
