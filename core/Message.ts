type UnreadMessage = {
    read: false
    text: string
}

type ReadMessage = {
    read: true
    text: string
}

type Message = UnreadMessage | ReadMessage


const newMessage = (text: string): UnreadMessage => ({ text, read: false })

const readMessage = ({ text }: Message): ReadMessage => ({ text, read: true })

export type { UnreadMessage, ReadMessage, Message }
export { newMessage, readMessage }
