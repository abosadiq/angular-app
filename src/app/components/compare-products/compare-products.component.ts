import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";

@Component({
  selector: "app-compare-products",
  templateUrl: "./compare-products.component.html",
  styleUrls: ["./compare-products.component.scss"],
})
export class CompareProductsComponent implements OnInit {
  public compareItems;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.compareItems = JSON.parse(params["item"]);
    });
    console.log("  this.detailItem", this.compareItems);
  }
}
