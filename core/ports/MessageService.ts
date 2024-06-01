import { Message } from '@core/Message'


interface IMessageService {
    getMessages: () => ReadonlyArray<Message>
    readMessages: () => void
    addMessage: (text: string) => void
}


export type { IMessageService }
