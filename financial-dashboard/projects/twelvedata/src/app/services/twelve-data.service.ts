import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class TwelveDataService {
  private apiUrl = 'https://api.twelvedata.com';
  private apiKey = '6f5635d4d7f941488773e61d3b8b8a24'; 

  constructor() { }

  async getStockQuote(symbol: string): Promise<any> {
    const url = `${this.apiUrl}/quote?symbol=${symbol}&apikey=${this.apiKey}`;
    try {
      const response = await axios.get(url);
      if (response.data.status === 'error') {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (error: any) { 
      console.error('Error fetching stock quote:', error);
      if (error.message) {
        throw new Error(`API Error: ${error.message}`); 
      } else {
        throw new Error('An unexpected error occurred.'); 
      }
    }
  }

  async getTimeSeries(symbol: string, interval: string = '1day', outputsize: number = 30): Promise<any> {
    const url = `${this.apiUrl}/time_series?symbol=${symbol}&interval=${interval}&outputsize=${outputsize}&apikey=${this.apiKey}`;
    try {
      const response = await axios.get(url);
      if (response.data.status === 'error') {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (error: any) {
      console.error('Error fetching time series:', error);
      if (error.message) {
        throw new Error(`API Error: ${error.message}`);
      } else {
        throw new Error('An unexpected error occurred.');
      }
    }
  }

  async getExchangeRate(symbol: string): Promise<any> {
    const url = `${this.apiUrl}/exchange_rate?symbol=${symbol}&apikey=${this.apiKey}`;
    try {
      const response = await axios.get(url);
      if (response.data.status === 'error') {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (error: any) {
      console.error('Error fetching exchange rate:', error);
      if (error.message) {
        throw new Error(`API Error: ${error.message}`);
      } else {
        throw new Error('An unexpected error occurred.');
      }
    }
  }
}