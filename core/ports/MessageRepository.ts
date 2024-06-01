import { Message } from '@core/Message'


interface IMessageRepository {
    getMessages: () => ReadonlyArray<Message>
    saveMessage: (m: Message) => void
    alterMessages: (f: (m: Message) => Message) => void
}


export { IMessageRepository }
