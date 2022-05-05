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

  constructor(private currencyServices: CurrenciesService) {
    this.currencyServices
          .getData()
          .subscribe(currencies => {
            this.currencies = currencies.splice(0, 2)
            this.optionTop = this.currencies[0]?.base_ccy
            this.optionBottom = this.currencies[1]?.ccy
          });
  }

  directConvert = (baseValue: any, baseValuePerUnit: any) => baseValue / baseValuePerUnit;

  reverseConvert = (value: any, baseValuePerUnit: any) => value * baseValuePerUnit;

  calc = (value: any, fromCurrency: any, toCurrecny: any, base: any) => {
    let details = this.currencies.find(
      (i) => i.base_ccy === fromCurrency && i.ccy === toCurrecny
    );
    if (details) {
      return this.directConvert(value.target.value, details.buy);
    }
    details = this.currencies.find(
      (i) => i.ccy === fromCurrency && i.base_ccy === toCurrecny
    );
    if (details) {
      return this.reverseConvert(value.target.value, details.buy);
    }
    const middleDetails = this.currencies.find(
      (i) => i.ccy === fromCurrency && i.base_ccy === base
    );

    details = this.currencies.find(
      (i) => i.ccy === toCurrecny && i.base_ccy === base
    );

    if (middleDetails && details) {
      const middleValue = this.reverseConvert(value.target.value, middleDetails.buy);
      return this.directConvert(middleValue, details.buy);
    }

    return NaN;
  };

  ngOnInit(): void {
    
  }

}

