import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, NavigationExtras } from "@angular/router";
import { AlertService } from "../services/alert.service";
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from "@angular/forms";
@Component({
  selector: "app-searchbar",
  templateUrl: "./searchbar.component.html",
  styleUrls: ["./searchbar.component.scss"],
})
export class SearchbarComponent implements OnInit {
  subForm: FormGroup;
  public jsonData;
  productDropdown: any = ["All"];
  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.httpClient.get("assets/db.json").subscribe((data) => {
      console.log(data);
      this.jsonData = data;
    });
    this.subForm = this.formBuilder.group({
      subCate: ["", Validators.required],
      items: [""],
    });
  }

  changeProductDropdown(e) {
    this.val.items.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  onSearch() {
    console.log("onSearch", this.val.subCate.value);
    let searchValue = this.val.subCate.value.toLowerCase();
    let searchDropdownVal = this.val.items.value;
    console.log("allProduct", this.productDropdown, this.val.items.value);
    if (searchDropdownVal == "1: All") {
      console.log("searchDropdownVal if if", searchDropdownVal);
      let navigationExtras: NavigationExtras = {
        queryParams: {
          product: JSON.stringify(this.jsonData),
        },
      };
      this.router.navigate(["/product"], navigationExtras);
    } else if (searchValue) {
      let filterProduct = this.jsonData.filter((obj) =>
        Object.values(obj).some((val) =>
          val ? val.toString().toLowerCase().includes(searchValue) : false
        )
      );
      let navigationExtras: NavigationExtras = {
        queryParams: {
          product: JSON.stringify(filterProduct),
        },
      };
      this.router.navigate(["/product"], navigationExtras);
    } else {
      this.alertService.error("No search found");
    }
  }
  get val() {
    return this.subForm.controls;
  }
}
