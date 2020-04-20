import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-productdetails",
  templateUrl: "./productdetails.component.html",
  styleUrls: ["./productdetails.component.scss"],
})
export class ProductdetailsComponent implements OnInit {
  public detailItem;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.detailItem = JSON.parse(params["item"]);
    });
    console.log("  this.detailItem", this.detailItem);
  }
}
