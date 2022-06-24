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


    socket.onclose = function(event) {
      if (event.wasClean) {
        alert(`[close] Conexión cerrada limpiamente, código=${event.code} motivo=${event.reason}`);
      } else {
        // ej. El proceso del servidor se detuvo o la red está caída
        // event.code es usualmente 1006 en este caso
        alert('[close] La conexión se cayó');
      }
    };

    socket.onerror = function(error:any) {
      alert(`[error] ${error.message}`);
    };

  }
}
