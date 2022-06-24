export interface ChatI {
  id?: string;
  name: string;
  message: string;
}
export interface CounterI {
  allMessagesSentFromBackend: number;
  allMessagesReceivedFromFrontend: number;
}
