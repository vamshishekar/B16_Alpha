import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
// import { MatSliderChange } from '@angular/material/slider';
import { Observable, Subscription } from 'rxjs';
import { Book } from '../models/book';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent implements OnInit {
  public bookList: Book[] = [];
  public filterCategory: Book[] = [];
  public filterPrice: Book[] = [];

  public searchText: any;
  // public filterData: any;

  @Output()
  priceValue = new EventEmitter<number>(true);

  max!: number;
  min!: number;
  step = 100;
  thumbLabel = true;
  value!: 0;

  bookList$!: Observable<Book[]>;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.showBooks();
    this.setPrice();
  }

  showBooks() {
    this.api.bookList$.subscribe((res) => {
      this.bookList = res;
      this.filterCategory = this.bookList;
    });
  }

  filterByPrice(event?: any) {
    const max = event.value;
    const min = event.source._min;

    this.filterCategory = this.bookList.filter(
      (p) => p.price <= max && p.price >= min
    );
    // this.filterPrice = this.bookList
    //   .filter((p) => p.price <= this.priceRange)
    //   .slice();
    // this.bookList=this.filterPrice;
  }

  filterCat(category: string) {
    this.filterCategory = this.bookList.filter((c: any) => {
      if (c.category == category || category == '') {
        return c;
      }
    });
  }

  setPrice() {
    this.api.bookList$.pipe().subscribe((data: Book[]) => {
      this.minValue(data);
      this.maxValue(data);
    });
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  onChange(event: any) {
    this.filterByPrice(event);

    this.priceValue.emit(event.value);
  }

  minValue(book: Book[]) {
    this.min = book.reduce((prev, curr) => {
      return prev.price < curr.price ? prev : curr;
    }).price;
  }

  maxValue(book: Book[]) {
    this.max = book.reduce((prev, curr) => {
      return prev.price > curr.price ? prev : curr;
    }).price;
  }

  // onSliderChange(val:any):void {
  //   this.filterData=this.bookList.filter((obj: { price: number; })=>obj.price >=val.lower && obj.price <=val.upper);
  //   console.log();
  //
}
