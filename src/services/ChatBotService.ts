import { ChatBotAPI } from '../api/ChatBotAPI';
import { Message } from '../models/message';

export class ChatBotService {
  private chatBotAPI: ChatBotAPI;

  constructor() {
    this.chatBotAPI = new ChatBotAPI();
  }

  public async getAnswer(message: string): Promise<Message> {
    try {
      const axiosResponse = await this.chatBotAPI.post({ text: message });
      const reply =
        axiosResponse?.data?.reply || "Sorry, I couldn't understand that.";

      return new Message('bot', reply);
    } catch (error) {
      return new Message('bot', "Sorry, I couldn't process that.");
    }
  }
}
