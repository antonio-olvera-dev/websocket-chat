import { WSChat } from "./WSChat";
import { WSCounter } from "./WSCounter";

const wsCounter: WSCounter = new WSCounter();
const wsChat: WSChat = new WSChat(wsCounter);