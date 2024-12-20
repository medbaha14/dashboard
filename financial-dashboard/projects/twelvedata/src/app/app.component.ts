import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TwelveDataService } from './services/twelve-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  symbol = 'AAPL';
  quote: any;
  timeSeriesData: any;
  exchangeRate: any;
  error: string | null = null;

  constructor(private twelveDataService: TwelveDataService) { }

  ngOnInit(): void {
   
    
    this.fetchQuote();
    this.fetchTimeSeries();
    this.fetchExchangeRate();
  }

  fetchQuote() {
    this.twelveDataService.getStockQuote(this.symbol).then(data => {
      this.quote = data;
      this.error = null;
    }).catch(err => {
      this.error = err.message;
      this.quote = null;
    });
  }

  fetchTimeSeries() {
    this.twelveDataService.getTimeSeries(this.symbol).then(data => {
      this.timeSeriesData = data;
      this.error = null;
    }).catch(err => {
      this.error = err.message;
      this.timeSeriesData = null;
    });
  }

  fetchExchangeRate() {
    this.twelveDataService.getExchangeRate("USD/EUR").then(data => {
      this.exchangeRate = data;
      this.error = null;
    }).catch(err => {
      this.error = err.message;
      this.exchangeRate = null;
    });
  }
}