import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  ngOnInit(): void {

  }

  sendMessage() {
    console.log("send");

    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = function(e) {

      socket.send("Mensaje para el servidor");
      const mensaje = {
        nombre: "Enrique Martínez",
        correo: "enrique@gmail.com",
        edad: 30
      };
      socket.send(JSON.stringify(mensaje));
    }

    socket.onmessage =  function(e) {

      console.log(e);

    }

  }
}
