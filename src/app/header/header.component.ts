import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrenciesService } from '../currencies.service';
import { Currency } from '../currency/currency';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currencies: Currency[] = [];

  constructor(private currencyServices: CurrenciesService) {

    this.currencyServices
          .getData()
          .subscribe(currencies => this.currencies = currencies.splice(0, 2))
  }



  ngOnInit(): void {

  }

}
