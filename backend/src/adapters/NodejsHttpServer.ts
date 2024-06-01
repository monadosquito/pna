import { IMessageService } from 'core/ports/MessageService'
import { IWebSocketServer } from 'core/ports/WebSocketServer'
import { IHttpServer } from 'core/ports/HttpServer'


import http from 'http'


class NodejsHttpServer implements IHttpServer {
    private msgService: IMessageService
    private wss: IWebSocketServer
    private host: string
    private port: number


    constructor(
        msgService: IMessageService,
        wss: IWebSocketServer,
        host: string,
        port: number,
    ) {
        this.msgService = msgService
        this.wss = wss
        this.host = host 
        this.port = port
    }

    run() {
        const srv = http.createServer((req, res) => {
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
            if (req.method === 'GET') {
                const allMsgs = this.msgService.getMessages()
                req.statusCode = 200
                res.end(JSON.stringify(allMsgs))
            } else if (req.method === 'POST') {
                const bodyChunks: Buffer[] = []
                req.on('data', (chunk: Buffer) => {
                    bodyChunks.push(chunk)
                })
                req.on('end', () => {
                    try {
                        const { msgText } = JSON.parse(
                            Buffer.concat(bodyChunks).toString()
                        )
                        if (!msgText) {
                            res.statusCode = 400
                            res.end({ err: 'Message text is empty' })
                        }
                        this.msgService.addMessage(msgText)
                        this.wss.broadcast('syncMessages')
                        res.end()
                    } catch(err) {
                        res.statusCode = 400
                        res.end('Body is not in JSON format')
                    }
                })
            }
        })

        srv.listen(this.port, this.host)
    }
}


export { NodejsHttpServer }
