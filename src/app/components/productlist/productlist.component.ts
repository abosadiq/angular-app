import { Component, OnInit } from "@angular/core";
import { ProductListService } from "../services/list.service";
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from "@angular/forms";
import { Options } from "ng5-slider";
@Component({
  selector: "app-productlist",
  templateUrl: "./productlist.component.html",
  styleUrls: ["./productlist.component.scss"],
})
export class ProductlistComponent implements OnInit {
  public lists = [];
  checkForm: FormGroup;
  public show: boolean = false;
  public show2: boolean = true;
  public show3: boolean = true;
  public buttonName: any = "Show";
  public buttonName2: any = "Show";
  public buttonName3: any = "Show";
  public compare;
  public isCampare: Boolean;
  value: number = 40;
  highValue: number = 60;
  options: Options = {
    floor: 0,
    ceil: 100,
  };
  highValue2: number = 60;
  options2: Options = {
    floor: 0,
    ceil: 100,
  };
  highValue3: number = 60;
  options3: Options = {
    floor: 0,
    ceil: 100,
  };
  compareData: Array<any> = [];
  constructor(
    // private _productListService: ProductListService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.checkForm = this.fb.group({
      compare: "false",
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.lists = JSON.parse(params["product"]);
    });
    console.log("  this.lists", this.lists);
  }

  toggle() {
    this.show = !this.show;
    if (this.show) this.buttonName = "Hide";
    else this.buttonName = "Show";
  }

  onClick(item) {
    console.log("Details", item);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        item: JSON.stringify(item),
      },
    };
    this.router.navigate(["/productdetails"], navigationExtras);
  }

  toggle2() {
    this.show2 = !this.show2;
    if (this.show2) this.buttonName2 = "Hide";
    else this.buttonName2 = "Show";
  }
  toggle3() {
    this.show3 = !this.show3;
    if (this.show3) this.buttonName3 = "Hide";
    else this.buttonName3 = "Show";
  }
  onCheckboxChange(e, item) {
    let compareItem = e.target.value;
    this.compareData.push(item);
    console.log("a 888888", e, e.target.value, this.compareData);
    this.compareData.length > 1 ? (this.isCampare = true) : false;
  }
  onCampare() {
    console.log("is campare call", this.compareData);
    let compareProducts: NavigationExtras = {
      queryParams: {
        item: JSON.stringify(this.compareData),
      },
    };
    this.router.navigate(["/compare-products"], compareProducts);
  }
}
