import { Component, OnInit } from '@angular/core';
import { Currency } from '../currency/currency';
import { CurrenciesService } from '../currencies.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {

  currencies: Currency[] = [];
  currencyTop?: any = null;
  currencyBottom?: any = null;
  optionTop?: any;
  optionBottom?: any;
  finalValue?: any

  constructor(private currencyServices: CurrenciesService) {
    this.currencyServices
          .getData()
          .subscribe(currencies => {
            this.currencies = currencies.splice(0, 2)
            this.optionTop = this.currencies[0]?.base_ccy
            this.optionBottom = this.currencies[1]?.ccy
          });
  }

  changeTop(top: any): void {
    if (this.optionTop === "UAH" && this.optionBottom === "USD") {
      this.currencyBottom = (top.target.value / +this.currencies[0].buy).toFixed(3);
    } else if (this.optionTop === "UAH" && this.optionBottom === "EUR") {
      this.currencyBottom = (top.target.value / +this.currencies[1].buy).toFixed(3);
    } else if (this.optionTop === "USD" && this.optionBottom === "EUR") {
      this.currencyBottom = ((+this.currencies[1].buy * top.target.value)/+this.currencies[0].buy).toFixed(3)
    } else if (this.optionTop === "EUR" && this.optionBottom === "USD") {
      this.currencyBottom = ((+this.currencies[0].buy * top.target.value)/+this.currencies[1].buy).toFixed(3)
    } else if (this.optionTop === "USD" && this.optionBottom === "UAH") {
      this.currencyBottom = (top.target.value * +this.currencies[0].buy).toFixed(3);
    } else if (this.optionTop === "EUR" && this.optionBottom === "UAH") {
      this.currencyBottom = (top.target.value * +this.currencies[1].buy).toFixed(3);
    } else {
      this.currencyBottom = top.target.value
    }
  }

  changeBottom(bottom: any): void {
    if (this.optionBottom === "UAH" && this.optionTop === "USD") {
      this.currencyTop = (bottom.target.value / +this.currencies[0].buy).toFixed(3);
    } else if (this.optionBottom === "UAH" && this.optionTop === "EUR") {
      this.currencyTop = (bottom.target.value / +this.currencies[1].buy).toFixed(3);
    } else if (this.optionBottom === "USD" && this.optionTop === "EUR") {
      this.currencyTop = ((+this.currencies[1].buy * bottom.target.value)/+this.currencies[0].buy).toFixed(3)
    } else if (this.optionBottom === "EUR" && this.optionTop === "USD") {
      this.currencyTop = ((+this.currencies[0].buy * bottom.target.value)/+this.currencies[1].buy).toFixed(3)
    } else if (this.optionBottom === "USD" && this.optionTop === "UAH") {
      this.currencyTop = (bottom.target.value * +this.currencies[0].buy).toFixed(3);
    } else if (this.optionBottom === "EUR" && this.optionTop === "UAH") {
      this.currencyTop = (bottom.target.value * +this.currencies[1].buy).toFixed(3);
    } else {
      this.currencyTop = bottom.target.value
    }
  }

  ngOnInit(): void {

  }

}

