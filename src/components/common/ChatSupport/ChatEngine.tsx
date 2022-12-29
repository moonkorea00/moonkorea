import dynamic from 'next/dynamic';
import styled from 'styled-components';

interface ChatEngineProps {
  user: string;
  chat: string;
}

const ChatEngineWrapper = dynamic(() =>
  import('react-chat-engine').then(module => module.ChatEngineWrapper)
) as React.ComponentType<{ children: React.ReactNode }>;

const Socket = dynamic(() =>
  import('react-chat-engine').then(module => module.Socket)
);

const ChatFeed = dynamic(() =>
  import('react-chat-engine').then(module => module.ChatFeed)
);

const ChatEngine = ({ user, chat }: ChatEngineProps) => {
  return (
    <Container>
      <ChatEngineWrapper>
        <Socket
          projectID={process.env.NEXT_PUBLIC_PROJECT_ID}
          userName={user}
          userSecret={user}
        />
        <ChatFeed activeChat={chat} />
      </ChatEngineWrapper>
    </Container>
  );
};

export default ChatEngine;

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
