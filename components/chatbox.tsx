import { useState, useEffect } from 'react';
import { StreamChat } from 'stream-chat';
import {
  Chat, Channel, ChannelHeader, MessageInput, MessageInputSmall, VirtualizedMessageList, Window, CustomClasses,
} from 'stream-chat-react';
import { chakra, useColorMode } from '@chakra-ui/react';
import { generateUsername } from 'friendly-username-generator';

const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoicm91Z2gtbW91bnRhaW4tNyJ9.h1wQ9JRATPSatNVAaP5hHnhCFsH_wbEk-FZWMl8HoEI';

// chatClient.connectUser(
//   {
//     id: 'rough-mountain-7',
//     name: 'rough-mountain-7',
//     image: 'https://getstream.io/random_png/?id=rough-mountain-7&name=rough-mountain-7',
//   },
//   userToken,
// );
const customClasses : CustomClasses = {
  chat: 'str-chat custom-chat',
};
// chat?: string;
// chatContainer?: string;
// channel?: string;
// channelList?: string;
// message?: string;
// messageList?: string;
// thread?: string;
// threadList?: string;
// virtualMessage?: string;
// virtualizedMessageList?: string;

function App() {
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [guestName, setGuestName] = useState(null);
  const { colorMode } = useColorMode();
  useEffect(() => {
    const initChat = async () => {
      const client = StreamChat.getInstance('mjw2r826p25b');
      // open the WebSocket connection to start receiving events
      const name = generateUsername();
      await client.setGuestUser({ id: name, name });
      // client.connectUser(
      //   {
      //     id: 'rough-mountain-7',
      //     name: 'rough-mountain-7',
      //     image: 'https://getstream.io/random_png/?id=rough-mountain-7&name=rough-mountain-7',
      //   },
      //   userToken,
      // );
      const createdChannel = client.channel('livestream', 'home', {
        image: 'https://goo.gl/Zefkbx',
        name: 'PTE Earnings',
      });
      setChatClient(client);
      setChannel(createdChannel);
      setGuestName(name);
    };

    initChat();

    // close the WebSocket connection when component dismounts
    // return () => chatClient.disconnectUser();
  }, []);
  if (!chatClient) return null;

  return (
    <Chat customClasses={customClasses} darkMode={colorMode === 'dark'} client={chatClient} theme="livestream">
      <Channel channel={channel}>
        <Window>
          <ChannelHeader live />
          <VirtualizedMessageList defaultItemHeight={50} />
          <MessageInput Input={MessageInputSmall} noFiles focus />
        </Window>
      </Channel>
    </Chat>
  );
}

export default App;
