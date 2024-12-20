import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class FinnhubService {
  private apiUrl = 'https://finnhub.io/api/v1';
  private apiKey = 'ctco5kpr01qjor991vr0ctco5kpr01qjor991vrg';
  public socket!: WebSocket;
  constructor() {}

  async getStockQuote(symbol: string): Promise<any> {
    const url = `${this.apiUrl}/quote?symbol=${symbol}&token=${this.apiKey}`;
    try {
    const response = await axios.get(url);
    return response; 
    }catch (error) {
    console.error('Error during prediction:', error);
    throw error;
    }
  }

  connect(symbol: string): void {
    const wsUrl = `wss://ws.finnhub.io?token=${this.apiKey}`;
    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = () => {
      console.log('WebSocket connection established');
      this.subscribeToStock(symbol);
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'trade') {
        console.log('Real-time data:', data.data);
      }
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.socket.onclose = () => {
      console.log('WebSocket connection closed');
    };
  }

  subscribeToStock(symbol: string): void {
    const payload = JSON.stringify({ type: 'subscribe', symbol });
    this.socket.send(payload);
  }

  unsubscribeFromStock(symbol: string): void {
    const payload = JSON.stringify({ type: 'unsubscribe', symbol });
    this.socket.send(payload);
  }


}
