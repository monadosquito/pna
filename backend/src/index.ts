import { InMemoryMessageRepository } from '@adapters/InMemoryMessageRepository'
import { MessageService } from '@adapters/MessageService'
import { NodejsHttpServer } from '@adapters/NodejsHttpServer'
import { WsWebSocketServer } from '@adapters/WsWebSocketServer'


const MSGS_CAPACITY = 9
const WS_HOST = process.env.WS_HOST || 'localhost'
const WS_PORT = process.env.WS_PORT && +process.env.WS_PORT || 8000
const HTTP_HOST = process.env.HTTP_HOST || 'localhost'
const HTTP_PORT = process.env.HTTP_PORT && +process.env.HTTP_PORT || 8001

const msgRepo = new InMemoryMessageRepository(MSGS_CAPACITY)
const msgService = new MessageService(msgRepo)
const wsServer = new WsWebSocketServer(msgService, WS_HOST, WS_PORT)
wsServer.readMessages()
const httpServer = new NodejsHttpServer(
    msgService,
    wsServer,
    HTTP_HOST,
    HTTP_PORT,
)
httpServer.run()
