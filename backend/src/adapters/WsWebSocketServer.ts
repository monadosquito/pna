import { Action } from "core/Action"
import { IMessageService } from "core/ports/MessageService"
import { IWebSocketServer } from "core/ports/WebSocketServer"

import ws from "ws";


class WsWebSocketServer implements IWebSocketServer {
    private msgService: IMessageService
    private webSocket: ws.WebSocketServer

    constructor(msgService: IMessageService, host: string, port: number) {
        this.msgService = msgService
        this.webSocket = new ws.Server({ host, port })
    }

    broadcast(act: Action) {
       this.webSocket.clients.forEach((c) => {
           c.send(act)
        })
    }

    readMessages() {
        this.webSocket.on('connection', () => {
            this.msgService.readMessages()
            this.broadcast('syncMessages')
        })
    }
}


export { WsWebSocketServer }
