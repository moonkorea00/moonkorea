import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const ChatEngine = dynamic(() =>
  import('react-chat-engine').then(module => module.ChatEngine)
);

const SupportAdmin = () => {
  const [isDOMLoaded, setIsDOMLoaded] = useState(false);

  useEffect(() => {
    setIsDOMLoaded(true);
  }, []);

  return (
    <>
      {isDOMLoaded && (
        <ChatEngine
          projectID={process.env.NEXT_PUBLIC_PROJECT_ID}
          userName={process.env.NEXT_PUBLIC_USER_NAME}
          userSecret={process.env.NEXT_PUBLIC_USER_SECRET}
          height="calc(100vh - 12px)"
        />
      )}
    </>
  );
};

export default SupportAdmin;
