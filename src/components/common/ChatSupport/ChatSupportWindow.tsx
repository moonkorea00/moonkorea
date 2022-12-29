import * as S from './ChatSupportWindow.style';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { chatSupportState } from '@store/chatSupportState';
import ChatIcon from 'public/assets//ChatSupport/ChatSupportIcon.png';
import ChatEngine from './ChatEngine';
import ChatSupportForm from './ChatSupportForm';
import axios from 'axios';

const ChatSupportWindow = () => {
  const [isDOMLoaded, setIsDOMLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [chat, setChat] = useState(null);
  const isChatSupportVisible = useRecoilValue(chatSupportState);

  const getUserChatId = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('chat_support_user_id');
    }
  };

  useEffect(() => {
    setIsDOMLoaded(true);
  }, []);

  const getOrCreateUser = () => {
    axios
      .put(
        'https://api.chatengine.io/users',
        {
          username: getUserChatId(),
          secret: getUserChatId(),
          email: getUserChatId(),
        },
        { headers: { 'Private-Key': process.env.NEXT_PUBLIC_CLIENT_KEY } }
      )
      // .then(res => console.log(res))
      .then(({ data }) => setUser(data.email))
      .then(() =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        localStorage.setItem('chat_support_user_id', getUserChatId())
      );
  };

  const getOrCreateChat = () => {
    axios
      .put(
        'https://api.chatengine.io/chats',
        {
          usernames: [getUserChatId(), 'moonkorea'],
          title: 'WELCOME',
          is_direct_chat: true,
        },
        {
          headers: {
            'Project-ID': process.env.NEXT_PUBLIC_PROJECT_ID,
            'User-Name': getUserChatId(),
            'User-Secret': getUserChatId(),
          },
        }
      )
      // .then(res => console.log(res))
      .then(({ data }) => setChat(data.id));
  };

  const renderChatSupportWithoutCredentials = async () => {
    await getOrCreateUser();
    await getOrCreateChat();
  };
  useEffect(() => {
    getUserChatId() && renderChatSupportWithoutCredentials();
  }, []);

  return (
    <>
      {isDOMLoaded && getUserChatId() ? (
        <ChatEngine user={user} chat={chat} />
      ) : (
        <ChatSupportForm setUser={setUser} setChat={setChat} />
      )}
      <S.ChatSupportIconContainer isChatSupportVisible={isChatSupportVisible}>
        <Image
          src={ChatIcon}
          alt="Chat support"
          width={50}
          height={50}
          layout="fixed"
        />
      </S.ChatSupportIconContainer>
    </>
  );
};

export default ChatSupportWindow;
