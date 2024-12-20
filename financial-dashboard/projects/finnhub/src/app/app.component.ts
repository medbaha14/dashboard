import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from '@angular/core';
import { ApexOptions } from 'ng-apexcharts';
import { FinnhubService } from './service/finnhub.service';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FinnhubService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit, OnDestroy {
  public chartOptions!: Partial<ApexOptions>;
  private chart!: ApexCharts;
  private stockSymbol: string = 'AAPL';

  constructor(private finnhubService: FinnhubService) {}

  ngOnInit(): void {
    this.initializeChart();
    this.finnhubService.connect(this.stockSymbol);
    this.finnhubService.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'trade' && data.data?.length) {
        this.updateChart(data.data[0]);
      }
    };
  }

  ngOnDestroy(): void {
    this.finnhubService.unsubscribeFromStock(this.stockSymbol);
    this.finnhubService.socket.close();
    this.chart.destroy(); 
  }

  private initializeChart(): void {
    this.chartOptions = {
      chart: {
        type: 'line',
        animations: {
          enabled: true,
          dynamicAnimation: {
            speed: 1000,
          },
        },
        id: 'chart',
      },
      title: {
        text: 'Real-Time Stock Prices',
      },
      xaxis: {
        type: 'datetime',
        labels: {
          datetimeUTC: false,
        },
      },
      yaxis: {
        title: {
          text: 'Price',
        },
      },
      series: [
        {
          name: this.stockSymbol,
          data: [],
        },
      ],
    };

    this.chart = new ApexCharts(document.getElementById('chart'), this.chartOptions);
    this.chart.render();
  }

  private updateChart(data: any): void {
    const time = data.t * 1000;
    const price = data.p;

    this.chart.appendData([
      {
        name: this.stockSymbol,
        data: [{ x: time, y: price }],
      },
    ]);
  }
}
