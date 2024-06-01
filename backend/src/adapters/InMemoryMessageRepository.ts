import { Message } from "core/Message";
import { BoundedQueue } from "core/Queue";
import { IMessageRepository } from "core/ports/MessageRepository";


class InMemoryMessageRepository implements IMessageRepository {
    private messages: BoundedQueue<Message>

    constructor(capacity: number) {
        this.messages = new BoundedQueue<Message>(capacity)
    }

    public getMessages(): ReadonlyArray<Message> {
        return this.messages.toArray() 
    }

    public saveMessage(m: Message): void {
        this.messages.enqueue(m)
    }

    public alterMessages(f: (m: Message) => Message) {
        this.messages.forEach(f) 
    }
}


export { InMemoryMessageRepository }
