import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { AlertService } from "../services/alert.service";
@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.scss"],
})
export class AlertComponent implements OnInit {
  private subscription: Subscription;
  message: any;
  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe((msg) => {
      this.message = msg;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
