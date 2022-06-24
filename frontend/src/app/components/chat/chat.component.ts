import { Component, OnInit } from '@angular/core';
import { WsChatService } from 'src/app/services/ws-chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  name: string = "";
  message: string = "";

  constructor(public wsChatService: WsChatService) { }

  ngOnInit(): void {

  }

  sendMessage() {
    if (this.name === "" || this.message === "") {
      window.alert("You must fill in the fields")
      return;
    }
    this.wsChatService.sendMessage({
      name: this.name,
      message: this.message
    })
    this.message = "";
  }


}
