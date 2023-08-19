import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Input, Card } from '@nextui-org/react';
import { ChatBotService } from '../services/ChatBotService';
import { MessageType } from '../types';
import { Message as MessageObject } from '../models/message';
import { Loading } from './Loading';
import Message from './Message';


const ChatBox = () => {
    const [loading, setLoading] = useState(false);
    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState<MessageType[]>([]);
    const chatBotService = useMemo(() => new ChatBotService(), [])

    useEffect(() => {
        const initialMessage = new MessageObject('bot', "Hi! How can I help you?");
        setMessages([initialMessage]);
    }, []);

    const handleSend = useCallback(async () => {
        if (inputMessage.trim() === '') return;

        const userMessage = new MessageObject('user', inputMessage);
        setMessages((prev) => [...prev, userMessage]);
        setInputMessage('');  // Clear the input field
        setLoading(true);

        try {
            const botResponse = await chatBotService.getAnswer(inputMessage);
            setMessages((prev) => [...prev, botResponse]);
        } finally {
            setLoading(false);
        }
    }, [inputMessage, chatBotService]);

    return (
        <Card className="mx-auto w-full max-w-screen-md">
            <div className="overflow-y-auto min-h-full p-4">
                { messages?.map((message, index) => (
                    <Message key={ index } { ...message } />
                )) }
                { loading && <Loading /> }
            </div>
            <div className="mt-4 flex p-4">
                <Input
                    className="flex-grow"
                    value={ inputMessage }
                    onChange={ e => setInputMessage(e.target.value) }
                    onKeyDown={ e => e.key === 'Enter' && handleSend() }
                    placeholder="Type a message..."
                />
                <Button isLoading={ loading } variant='solid' color='primary' onClick={ handleSend } className="ml-2">Send</Button>
            </div>
        </Card>
    );
}

export default ChatBox;
