import { MessageType } from '../types';

export class Message implements MessageType {
  type: 'bot' | 'user';
  text: string;

  constructor(type: 'bot' | 'user', text: string) {
    this.type = type;
    this.text = text;
  }
}
