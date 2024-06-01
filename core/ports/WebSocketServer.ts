import { Action } from '@core/Action'


interface IWebSocketServer {
    broadcast: (action: Action) => void
    readMessages: () => void
}


export type { IWebSocketServer }
