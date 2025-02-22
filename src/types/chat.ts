
export interface ChatMessage {
  type: string;
  content: string;
  options?: string[];
}

export interface ChatResponse {
  [key: string]: ChatMessage;
}
