import { useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ChatSupportForm = ({ setUser, setChat }) => {
  const usernameRef = useRef(null);

  const getOrCreateUser = cb => {
    axios
      .put(
        'https://api.chatengine.io/users',
        {
          username: usernameRef.current?.value,
          secret: usernameRef.current?.value,
          email: usernameRef.current?.value,
        },
        { headers: { 'Private-Key': process.env.NEXT_PUBLIC_CLIENT_KEY } }
      )
      // .then(res => console.log(res))
      // .then(({ data }) => setUser(data.email))
      .then(res => cb(res.data.email))
      .then(() =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        localStorage.setItem('chat_support_user_id', usernameRef.current?.value)
      );
  };

  const getOrCreateChat = cb => {
    axios
      .put(
        'https://api.chatengine.io/chats',
        {
          usernames: [usernameRef.current?.value, 'moonkorea'],
          // title: 'WELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOME',
          is_direct_chat: true,
        },
        {
          headers: {
            'Project-ID': process.env.NEXT_PUBLIC_PROJECT_ID,
            'User-Name': usernameRef.current?.value,
            'User-Secret': usernameRef.current?.value,
          },
        }
      )
      // .then(res => console.log(res))
      // .then(({ data }) => setChat(data.id));
      .then(res => cb(res.data.id));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!usernameRef.current) return;
    await getOrCreateUser();
    await getOrCreateChat();
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="이름" ref={usernameRef} autoFocus />
      </form>
    </Container>
  );
};

export default ChatSupportForm;

export const Container = styled.div`
  position: fixed;
  bottom: 116px;
  right: 50px;
  width: 380px;
  height: 520px;
  background-color: #f0f0f0;
  border-radius: 12px;
  /* border: 2px solid #BED2E9; */
  overflow: hidden;

  box-shadow: 0px 0px 16px 6px rgba(0, 0, 0, 0.33);
`;
