import { Message, newMessage, readMessage } from 'core/Message'
import { IMessageRepository } from 'core/ports/MessageRepository'
import { IMessageService } from 'core/ports/MessageService'


class MessageService implements IMessageService {
    private repository: IMessageRepository

    constructor(repository: IMessageRepository) {
        this.repository = repository
    }

    public getMessages(): ReadonlyArray<Message> {
        return this.repository.getMessages()
    }

    public readMessages() {
        this.repository.alterMessages(readMessage)
    }
    
    public addMessage(text: string): void {
        const message = newMessage(text)
        this.repository.saveMessage(message)
    }
}


export { MessageService }
