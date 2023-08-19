import { User } from '@nextui-org/react';
import { MessageType } from '../types';

const Message = (props: MessageType) => {
    const { type, text } = props;

    const isUserTypeBot = type === 'bot';

    const botView = <User
        name="Assistant"
        className='font-semibold'
        avatarProps={ {
            src: "https://ui-avatars.com/api/?name=Assistant&background=2563eb&color=ffffff"
        } }
    />

    const userView = <User
        name="Customer"
        className='font-semibold'
        avatarProps={ {
            src: "https://ui-avatars.com/api/?name=Customer&background=475569&color=f1f5f9"
        } }
    />

    const component = isUserTypeBot ? botView : userView
    const messageBoxLocationStyle = isUserTypeBot ? 'justify-start' : 'justify-end'
    const identifierStyle = isUserTypeBot ? 'text-blue-900 bg-blue-100' : 'text-slate-900 bg-slate-100'

    return (
        <div className={ `flex ${messageBoxLocationStyle}` }>
            <div className={ `p-4 inline-block rounded-lg my-4 ${identifierStyle}` }>
                <div className="p-2 break-words">
                    { component }
                    <p className="max-w-lg">{ text }</p>
                </div>
            </div>
        </div>
    );
}

export default Message;
