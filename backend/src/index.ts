import { WSChat } from "./WSChat";
import { WSCounter } from "./WSCounter";

const wsChat: WSChat = new WSChat();
const wsCounter: WSCounter = new WSCounter(wsChat.counter);