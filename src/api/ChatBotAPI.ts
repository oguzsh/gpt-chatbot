import axios, { AxiosRequestConfig } from 'axios';

export class ChatBotAPI {
  private readonly BASE_ENDPOINT = import.meta.env.BASE_ENDPOINT;
  private readonly API_TOKEN = import.meta.env.API_TOKEN;
  private readonly ANSWER_ENDPOINT = `${this.BASE_ENDPOINT}/abc`;

  constructor() {}

  private get axiosConfig(): AxiosRequestConfig {
    return {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Api-Key': this.API_TOKEN,
      },
      method: 'GET',
      url: this.BASE_ENDPOINT,
    };
  }

  public async get() {
    try {
      return await axios(this.axiosConfig);
    } catch (error) {
      this.handleError(error);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async post(data: any) {
    try {
      const config: AxiosRequestConfig = {
        ...this.axiosConfig,
        url: this.ANSWER_ENDPOINT,
        method: 'POST',
        data: data,
      };

      return await axios(config);
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: unknown) {
    if (axios.isAxiosError(error)) {
      // Handle Axios specific errors (like response data)
      throw new Error(error.response?.data || 'Axios Error');
    } else {
      // Handle general errors
      throw new Error(JSON.stringify(error));
    }
  }
}
