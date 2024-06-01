import { Message } from 'core/Message'

import cs from './Chat.module.css'

import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';


type ChatProps = {
    elemClass: string
}


const Chat = ({ elemClass }: ChatProps) => {
    const [ msgToSend, setMsgToSend ] = useState('')
    const qryClient = useQueryClient()
    const getAllMsgs = async () =>
        fetch('http://localhost:8001')
            .then(res => res.json())
    const { data: msgs, error, isLoading } = useQuery<Message[]>(
        'msgs',
        getAllMsgs
    )
    const addNewMsg = async (msgText: string) =>
        fetch('http://localhost:8001', {
            method: 'POST',
            body: JSON.stringify({ msgText }),
        })
    const addNetMsgMut = useMutation('msgs', addNewMsg)

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8000')
        ws.onmessage = (ev) => {
            const act = ev.data

            switch(act) {
                case 'syncMessages': {
                    qryClient.invalidateQueries({ queryKey: [ 'msgs' ] })
                }
            }
        }

        return () => {
            ws.onopen = () => {
                ws.close()
            }
        }
    }, [ qryClient ])

    const updMsg: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
        const msg = ev.target.value
        setMsgToSend(msg)
    }
    const sendMsg: React.MouseEventHandler<HTMLButtonElement> = () => {
        if (msgToSend) {
            addNetMsgMut.mutate(msgToSend)
            setMsgToSend('')
        }
    }

    const Err =
        <span className={cs.err}>
            Error fetching messages
        </span>

    if (error) return <>{Err}</>

    const Load =
        <span className={cs.load}>
            Loading...
        </span>

    if (isLoading) return <>{Load}</>

    const Msgs = msgs!.map(({ text, read }, i) =>
        <div
            className={`${cs.chat__msg} ${!read ? cs.msg_unread : ''}`}
            key={i}
        >
            <span> {text} </span>
            <span> {read ? 'Read' : 'Unread'} </span>
        </div>
    )


    return (
        <section className={`${cs.chat} ${elemClass}`}>
            <div className={cs.chat__msgs}>
                {Msgs}
            </div>
            <div>
                <input
                    onChange={updMsg}
                    className={cs['chat__text-inp']}
                    value={msgToSend}
                    placeholder='Message...' 
                />
                <button onClick={sendMsg} className={cs.chat__btn} >
                    Send Message
                </button>
            </div>
        </section>
    );
}

export { Chat }
