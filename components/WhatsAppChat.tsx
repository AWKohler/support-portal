// 'use client';
//
// import { useEffect, useState } from 'react';
//
// import { StreamChat, ChannelSort, ChannelFilters } from 'stream-chat';
// import { ChannelList, Chat } from 'stream-chat-react';
//
// import { Channel } from './Channel';
// import {
//   StreamTheme,
//   StreamVideo,
//   StreamVideoClient,
// } from '@stream-io/video-react-sdk';
//
// import { Video } from './Video';
// import '@stream-io/video-react-sdk/dist/css/styles.css';
// import './layout.css';
// import './styles/index.scss';
//
// import { User } from '@supabase/supabase-js';
// import ChannelListHeader from './ChannelListHeader';
//
// export default function WhatsAppChat({ user }: { user: User }) {
//   const apiKey = process.env.NEXT_PUBLIC_REACT_APP_STREAM_KEY || 'Set API Key';
//
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//
//   const chatClient = StreamChat.getInstance(apiKey);
//   const [videoClient, setVideoClient] = useState<StreamVideoClient>();
//
//   const sort: ChannelSort = { last_message_at: -1 };
//   const filters: ChannelFilters = {
//     type: 'messaging',
//     members: { $in: [user.id] },
//   };
//
//   const chatUser = chatClient.user;
//
//   useEffect(() => {
//     console.log('user', user);
//     const userId = user.id;
//     fetch('/api/create-user', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ userId: userId }),
//     }).then(async (res) => {
//       const response = await res.json();
//       console.log(response);
//
//       await chatClient.connectUser({ id: userId }, response.userToken);
//
//       const _videoClient = new StreamVideoClient({
//         apiKey,
//         user: chatUser,
//         token: response.userToken,
//       });
//
//       await _videoClient.connectUser({ id: userId }, response.userToken);
//
//       setVideoClient(_videoClient);
//
//       setIsLoading(false);
//     });
//   }, []);
//
//   return (
//     <>
//       {isLoading && (
//         <div className="text-white w-full flex items-center justify-center">
//           <p>Loading…</p>
//         </div>
//       )}
//       {!isLoading && videoClient && (
//         <div id="root">
//           <Chat client={chatClient}>
//             <StreamVideo client={videoClient}>
//               <StreamTheme as="main" className="main-container">
//                 <div className="channel-list-container">
//                   <ChannelListHeader user={chatUser} />
//                   <ChannelList
//                     sort={sort}
//                     filters={filters}
//                     showChannelSearch
//                   />
//                 </div>
//                 <Channel />
//                 <Video />
//               </StreamTheme>
//             </StreamVideo>
//           </Chat>
//         </div>
//       )}
//     </>
//   );
// }
//
// 'use client';
//
// import { useEffect, useState } from 'react';
// import { StreamChat, ChannelSort, ChannelFilters } from 'stream-chat';
// import { ChannelList, Chat } from 'stream-chat-react';
// import { Channel } from './Channel';
// import {
//   StreamTheme,
//   StreamVideo,
//   StreamVideoClient,
// } from '@stream-io/video-react-sdk';
// import { Video } from './Video';
// import '@stream-io/video-react-sdk/dist/css/styles.css';
// import './layout.css';
// import './styles/index.scss';
// import ChannelListHeader from './ChannelListHeader';
//
// export default function WhatsAppChat({ userId }: { userId: string }) {
//   const apiKey = process.env.NEXT_PUBLIC_REACT_APP_STREAM_KEY || 'Set API Key';
//
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//
//   const chatClient = StreamChat.getInstance(apiKey);
//   const [videoClient, setVideoClient] = useState<StreamVideoClient>();
//
//   const sort: ChannelSort = { last_message_at: -1 };
//   const filters: ChannelFilters = {
//     type: 'messaging',
//     members: { $in: [userId] },
//   };
//
//   const chatUser = chatClient.user;
//
//   useEffect(() => {
//     fetch('/api/create-user', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ userId: userId }),
//     }).then(async (res) => {
//       const response = await res.json();
//       console.log(response);
//
//       await chatClient.connectUser({ id: userId }, response.userToken);
//
//       const _videoClient = new StreamVideoClient({
//         apiKey,
//         user: chatUser,
//         token: response.userToken,
//       });
//
//       await _videoClient.connectUser({ id: userId }, response.userToken);
//
//       setVideoClient(_videoClient);
//
//       setIsLoading(false);
//     });
//   }, []);
//
//   // ... rest of the component remains the same
// }

// 'use client';
//
// import { useEffect, useState } from 'react';
// import { StreamChat, ChannelSort, ChannelFilters } from 'stream-chat';
// import { ChannelList, Chat } from 'stream-chat-react';
// import { Channel } from './Channel';
// import {
//   StreamTheme,
//   StreamVideo,
//   StreamVideoClient,
// } from '@stream-io/video-react-sdk';
// import { Video } from './Video';
// import '@stream-io/video-react-sdk/dist/css/styles.css';
// import './layout.css';
// import './styles/index.scss';
// import ChannelListHeader from './ChannelListHeader';
//
// export default function WhatsAppChat({ userId }: { userId: string }) {
//   const apiKey = process.env.NEXT_PUBLIC_REACT_APP_STREAM_KEY || 'Set API Key';
//
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [chatClient, setChatClient] = useState<StreamChat | null>(null);
//   const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(null);
//
//   const sort: ChannelSort = { last_message_at: -1 };
//   const filters: ChannelFilters = {
//     type: 'messaging',
//     members: { $in: [userId] },
//   };
//
//   useEffect(() => {
//     const initChat = async () => {
//       const client = StreamChat.getInstance(apiKey);
//
//       try {
//         const response = await fetch('/api/create-user', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ userId: userId }),
//         });
//
//         if (!response.ok) {
//           throw new Error('Failed to create user');
//         }
//
//         const { userToken } = await response.json();
//
//         await client.connectUser({ id: userId }, userToken);
//
//         const _videoClient = new StreamVideoClient({
//           apiKey,
//           user: { id: userId },
//           token: userToken,
//         });
//
//         await _videoClient.connectUser({ id: userId }, userToken);
//
//         setChatClient(client);
//         setVideoClient(_videoClient);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error initializing chat:', error);
//         setIsLoading(false);
//       }
//     };
//
//     initChat();
//
//     return () => {
//       chatClient?.disconnectUser();
//       videoClient?.disconnectUser();
//     };
//   }, [userId, apiKey]);
//
//   if (isLoading) {
//     return <div className="text-white w-full flex items-center justify-center">Loading…</div>;
//   }
//
//   if (!chatClient || !videoClient) {
//     return <div className="text-white w-full flex items-center justify-center">Failed to initialize chat</div>;
//   }
//
//   return (
//     <div id="root">
//       <Chat client={chatClient}>
//         <StreamVideo client={videoClient}>
//           <StreamTheme as="main" className="main-container">
//             <div className="channel-list-container">
//               <ChannelListHeader user={chatClient.user} />
//               <ChannelList sort={sort} filters={filters} showChannelSearch />
//             </div>
//             <Channel />
//             <Video />
//           </StreamTheme>
//         </StreamVideo>
//       </Chat>
//     </div>
//   );
// }

// 'use client';
//
// import { useEffect, useState } from 'react';
// import { StreamChat, ChannelSort, ChannelFilters } from 'stream-chat';
// import { ChannelList, Chat } from 'stream-chat-react';
// import { Channel } from './Channel';
// import {
//   StreamTheme,
//   StreamVideo,
//   StreamVideoClient,
// } from '@stream-io/video-react-sdk';
// import { Video } from './Video';
// import '@stream-io/video-react-sdk/dist/css/styles.css';
// import './layout.css';
// import './styles/index.scss';
// import ChannelListHeader from './ChannelListHeader';
// import { useUser } from '@clerk/nextjs';
//
// export default function WhatsAppChat({ userId }: { userId: string }) {
//   const apiKey = process.env.NEXT_PUBLIC_REACT_APP_STREAM_KEY || 'Set API Key';
//
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [chatClient, setChatClient] = useState<StreamChat | null>(null);
//   const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(null);
//   const { user } = useUser();
//
//   const sort: ChannelSort = { last_message_at: -1 };
//   const filters: ChannelFilters = {
//     type: 'messaging',
//     members: { $in: [userId] },
//   };
//
//   useEffect(() => {
//     const initChat = async () => {
//       const client = StreamChat.getInstance(apiKey);
//
//       try {
//         const response = await fetch('/api/create-user', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ userId: userId }),
//         });
//
//         if (!response.ok) {
//           throw new Error('Failed to create user');
//         }
//
//         const { userToken } = await response.json();
//
//         await client.connectUser(
//           {
//             id: userId,
//             name: user?.emailAddresses[0].emailAddress,
//             image: user?.imageUrl,
//           },
//           userToken
//         );
//
//         const _videoClient = new StreamVideoClient({
//           apiKey,
//           user: {
//             id: userId,
//             name: user?.emailAddresses[0].emailAddress,
//             image: user?.imageUrl,
//           },
//           token: userToken,
//         });
//
//         await _videoClient.connectUser({
//           id: userId,
//           name: user?.emailAddresses[0].emailAddress,
//           image: user?.imageUrl,
//         }, userToken);
//
//         setChatClient(client);
//         setVideoClient(_videoClient);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error initializing chat:', error);
//         setIsLoading(false);
//       }
//     };
//
//     if (user) {
//       initChat();
//     }
//
//     return () => {
//       chatClient?.disconnectUser();
//       videoClient?.disconnectUser();
//     };
//   }, [userId, apiKey, user]);
//
//   if (isLoading) {
//     return <div className="text-white w-full flex items-center justify-center">Loading…</div>;
//   }
//
//   if (!chatClient || !videoClient) {
//     return <div className="text-white w-full flex items-center justify-center">Failed to initialize chat</div>;
//   }
//
//   return (
//     <div id="root">
//       <Chat client={chatClient}>
//         <StreamVideo client={videoClient}>
//           <StreamTheme as="main" className="main-container">
//             <div className="channel-list-container">
//               <ChannelListHeader user={chatClient.user} />
//               {/*<ChannelList*/}
//               {/*  sort={sort}*/}
//               {/*  filters={filters}*/}
//               {/*  showChannelSearch*/}
//               {/*  options={{*/}
//               {/*    state: true,*/}
//               {/*    watch: true,*/}
//               {/*    presence: true,*/}
//               {/*  }}*/}
//               {/*  Preview={(props) => (*/}
//               {/*    <ChannelPreviewCustom {...props} />*/}
//               {/*  )}*/}
//               {/*/>*/}
//
//               <ChannelList
//                 sort={sort}
//                 filters={filters}
//                 showChannelSearch
//                 options={{
//                   state: true,
//                   watch: true,
//                   presence: true,
//                 }}
//                 Preview={ChannelPreviewCustom}
//               />
//             </div>
//             <Channel />
//             <Video />
//           </StreamTheme>
//         </StreamVideo>
//       </Chat>
//     </div>
//   );
// }
//
// // Custom ChannelPreview component to display user names instead of IDs
// // const ChannelPreviewCustom = (props: any) => {
// //   const { channel } = props;
// //   const { name, image } = channel.state.members[channel.state.members.keys().next().value].user;
// //
// //   return (
// //     <div className="channel-preview">
// //       <img src={image} alt={name} className="channel-preview__avatar" />
// //       <div className="channel-preview__name">{name}</div>
// //     </div>
// //   );
// // };
//
// import { useChannelPreviewInfo, useChatContext } from 'stream-chat-react';
//
// const ChannelPreviewCustom = (props: any) => {
//   const { channel } = props;
//   const { client } = useChatContext();
//   const { displayImage, displayTitle } = useChannelPreviewInfo(props);
//
//   return (
//     <div className="channel-preview">
//       <img src={displayImage} alt={displayTitle} className="channel-preview__avatar" />
//       <div className="channel-preview__name">{displayTitle}</div>
//     </div>
//   );
// };




//
// 'use client';
//
// import { useEffect, useState } from 'react';
// import { StreamChat, ChannelSort, ChannelFilters } from 'stream-chat';
// import { ChannelList, Chat, useChannelPreviewInfo } from 'stream-chat-react';
// import { Channel } from './Channel';
// import {
//   StreamTheme,
//   StreamVideo,
//   StreamVideoClient,
// } from '@stream-io/video-react-sdk';
// import { Video } from './Video';
// import '@stream-io/video-react-sdk/dist/css/styles.css';
// import './layout.css';
// import './styles/index.scss';
// import ChannelListHeader from './ChannelListHeader';
// import { useUser } from '@clerk/nextjs';
//
// export default function WhatsAppChat({ userId }: { userId: string }) {
//   const apiKey = process.env.NEXT_PUBLIC_REACT_APP_STREAM_KEY || 'Set API Key';
//
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [chatClient, setChatClient] = useState<StreamChat | null>(null);
//   const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(null);
//   const { user } = useUser();
//
//   const sort: ChannelSort = { last_message_at: -1 };
//   const filters: ChannelFilters = {
//     type: 'messaging',
//     members: { $in: [userId] },
//   };
//
//   useEffect(() => {
//     const initChat = async () => {
//       const client = StreamChat.getInstance(apiKey);
//
//       try {
//         const response = await fetch('/api/create-user', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ userId: userId }),
//         });
//
//         if (!response.ok) {
//           throw new Error('Failed to create user');
//         }
//
//         const { userToken } = await response.json();
//
//         await client.connectUser(
//           {
//             id: userId,
//             name: user?.emailAddresses[0].emailAddress,
//             image: user?.imageUrl,
//           },
//           userToken
//         );
//
//         const _videoClient = new StreamVideoClient({
//           apiKey,
//           user: {
//             id: userId,
//             name: user?.emailAddresses[0].emailAddress,
//             image: user?.imageUrl,
//           },
//           token: userToken,
//         });
//
//         await _videoClient.connectUser({
//           id: userId,
//           name: user?.emailAddresses[0].emailAddress,
//           image: user?.imageUrl,
//         }, userToken);
//
//         setChatClient(client);
//         setVideoClient(_videoClient);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error initializing chat:', error);
//         setIsLoading(false);
//       }
//     };
//
//     if (user) {
//       initChat();
//     }
//
//     return () => {
//       chatClient?.disconnectUser();
//       videoClient?.disconnectUser();
//     };
//   }, [userId, apiKey, user]);
//
//   const ChannelPreviewCustom = (previewProps: any) => {
//     const { displayImage, displayTitle } = useChannelPreviewInfo(previewProps);
//
//     return (
//       <div className="channel-preview">
//         <img src={displayImage} alt={displayTitle} className="channel-preview__avatar" />
//         <div className="channel-preview__name">{displayTitle}</div>
//       </div>
//     );
//   };
//
//   if (isLoading) {
//     return <div className="text-white w-full flex items-center justify-center">Loading…</div>;
//   }
//
//   if (!chatClient || !videoClient) {
//     return <div className="text-white w-full flex items-center justify-center">Failed to initialize chat</div>;
//   }
//
//   return (
//     <div id="root">
//       <Chat client={chatClient}>
//         <StreamVideo client={videoClient}>
//           <StreamTheme as="main" className="main-container">
//             <div className="channel-list-container">
//               <ChannelListHeader user={chatClient.user} />
//               <ChannelList
//                 sort={sort}
//                 filters={filters}
//                 showChannelSearch
//                 options={{
//                   state: true,
//                   watch: true,
//                   presence: true,
//                 }}
//                 Preview={ChannelPreviewCustom}
//               />
//             </div>
//             <Channel />
//             <Video />
//           </StreamTheme>
//         </StreamVideo>
//       </Chat>
//     </div>
//   );
// }


// 'use client';
//
// import { useEffect, useState } from 'react';
// import { StreamChat, ChannelSort, ChannelFilters } from 'stream-chat';
// import { ChannelList, Chat, useChannelPreviewInfo } from 'stream-chat-react';
// import { Channel } from './Channel';
// import {
//   StreamTheme,
//   StreamVideo,
//   StreamVideoClient,
// } from '@stream-io/video-react-sdk';
// import { Video } from './Video';
// import '@stream-io/video-react-sdk/dist/css/styles.css';
// import './layout.css';
// import './styles/index.scss';
// import ChannelListHeader from './ChannelListHeader';
// import { useUser } from '@clerk/nextjs';
//
// export default function WhatsAppChat({ userId }: { userId: string }) {
//   const apiKey = process.env.NEXT_PUBLIC_REACT_APP_STREAM_KEY || 'Set API Key';
//
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [chatClient, setChatClient] = useState<StreamChat | null>(null);
//   const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(null);
//   const { user } = useUser();
//
//   const sort: ChannelSort = { last_message_at: -1 };
//   const filters: ChannelFilters = {
//     type: 'messaging',
//     members: { $in: [userId] },
//   };
//
//
//   useEffect(() => {
//     const initChat = async () => {
//       const client = StreamChat.getInstance(apiKey);
//
//       try {
//         const response = await fetch('/api/create-user', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ userId: userId }),
//         });
//
//         if (!response.ok) {
//           throw new Error('Failed to create user');
//         }
//
//         const { userToken } = await response.json();
//
//         await client.connectUser(
//           {
//             id: userId,
//             name: user?.emailAddresses[0].emailAddress,
//             image: user?.imageUrl,
//           },
//           userToken
//         );
//
//         const _videoClient = new StreamVideoClient({
//           apiKey,
//           user: {
//             id: userId,
//             name: user?.emailAddresses[0].emailAddress,
//             image: user?.imageUrl,
//           },
//           token: userToken,
//         });
//
//         await _videoClient.connectUser({
//           id: userId,
//           name: user?.emailAddresses[0].emailAddress,
//           image: user?.imageUrl,
//         }, userToken);
//
//         setChatClient(client);
//         setVideoClient(_videoClient);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error initializing chat:', error);
//         setIsLoading(false);
//       }
//     };
//
//     if (user) {
//       initChat();
//     }
//
//     // No cleanup function
//   }, [userId, apiKey, user]);
//
//
//   // useEffect(() => {
//   //
//   //   let isMounted = true;
//   //   const initChat = async () => {
//   //     const client = StreamChat.getInstance(apiKey);
//   //
//   //     try {
//   //       const response = await fetch('/api/create-user', {
//   //         method: 'POST',
//   //         headers: {
//   //           'Content-Type': 'application/json',
//   //         },
//   //         body: JSON.stringify({ userId: userId }),
//   //       });
//   //
//   //       if (!response.ok) {
//   //         throw new Error('Failed to create user');
//   //       }
//   //
//   //       const { userToken } = await response.json();
//   //
//   //       await client.connectUser(
//   //         {
//   //           id: userId,
//   //           name: user?.emailAddresses[0].emailAddress,
//   //           image: user?.imageUrl,
//   //         },
//   //         userToken
//   //       );
//   //
//   //       const _videoClient = new StreamVideoClient({
//   //         apiKey,
//   //         user: {
//   //           id: userId,
//   //           name: user?.emailAddresses[0].emailAddress,
//   //           image: user?.imageUrl,
//   //         },
//   //         token: userToken,
//   //       });
//   //
//   //       await _videoClient.connectUser({
//   //         id: userId,
//   //         name: user?.emailAddresses[0].emailAddress,
//   //         image: user?.imageUrl,
//   //       }, userToken);
//   //
//   //
//   //
//   //       // if (isMounted) {
//   //       //   setChatClient(client);
//   //       //   setVideoClient(_videoClient);
//   //       //   setIsLoading(false);
//   //       // }
//   //
//   //       setChatClient(client);
//   //       setVideoClient(_videoClient);
//   //       setIsLoading(false);
//   //
//   //
//   //     } catch (error) {
//   //       console.error('Error initializing chat:', error);
//   //       setIsLoading(false);
//   //     }
//   //   };
//   //
//   //   if (user) {
//   //     initChat();
//   //   }
//   //
//   //   // return () => {
//   //   //   chatClient?.disconnectUser();
//   //   //   videoClient?.disconnectUser();
//   //   // };
//   //
//   //   // return () => {
//   //   //   const disconnect = async () => {
//   //   //     if (chatClient) {
//   //   //       setChatClient(null);
//   //   //       await chatClient.disconnectUser();
//   //   //     }
//   //   //     if (videoClient) {
//   //   //       setVideoClient(null);
//   //   //       await videoClient.disconnectUser();
//   //   //     }
//   //   //   };
//   //   //   disconnect();
//   //   // };
//   //
//   //
//   //   // return () => {
//   //   //   isMounted = false;
//   //   //   chatClient?.disconnectUser();
//   //   //   videoClient?.disconnectUser();
//   //   // };
//   //
//   // }, [userId, apiKey, user]);
//
//   const ChannelPreviewCustom = (previewProps: any) => {
//     const { displayImage, displayTitle } = useChannelPreviewInfo(previewProps);
//
//     return (
//       <div className="channel-preview">
//         <img src={displayImage} alt={displayTitle} className="channel-preview__avatar" />
//         <div className="channel-preview__name">{displayTitle}</div>
//       </div>
//     );
//   };
//
//   if (isLoading) {
//     return <div className="text-white w-full flex items-center justify-center">Loading…</div>;
//   }
//
//   if (!chatClient || !videoClient) {
//     return <div className="text-white w-full flex items-center justify-center">Failed to initialize chat</div>;
//   }
//
//   return (
//     <div id="root">
//       <Chat client={chatClient}>
//         <StreamVideo client={videoClient}>
//           <StreamTheme as="main" className="main-container">
//             <div className="channel-list-container">
//               <ChannelListHeader user={chatClient.user} />
//               <ChannelList
//                 sort={sort}
//                 filters={filters}
//                 showChannelSearch
//                 options={{
//                   state: true,
//                   watch: true,
//                   presence: true,
//                 }}
//                 Preview={ChannelPreviewCustom}
//               />
//             </div>
//             <Channel />
//             <Video />
//           </StreamTheme>
//         </StreamVideo>
//       </Chat>
//     </div>
//   );
// }



//
// 'use client';
//
// import { useEffect, useState } from 'react';
// import { StreamChat, ChannelSort, ChannelFilters } from 'stream-chat';
// import {
//   ChannelList,
//   Chat,
//   ChannelPreviewUIComponentProps,
//   Avatar,
//   useChatContext
// } from 'stream-chat-react';
// import { Channel } from './Channel';
// import {
//   StreamTheme,
//   StreamVideo,
//   StreamVideoClient,
// } from '@stream-io/video-react-sdk';
// import { Video } from './Video';
// import '@stream-io/video-react-sdk/dist/css/styles.css';
// import './layout.css';
// import './styles/index.scss';
// import ChannelListHeader from './ChannelListHeader';
// import { useUser } from '@clerk/nextjs';
//
// const ChannelPreviewCustom = (props: ChannelPreviewUIComponentProps) => {
//   const { channel, setActiveChannel } = props;
//   const { client } = useChatContext();
//
//   const members = Object.values(channel.state.members).filter(
//     ({ user }) => user?.id !== client.userID
//   );
//   const otherMember = members[0]?.user;
//
//   const displayName = otherMember?.name || otherMember?.id || 'Unknown User';
//   const displayImage = otherMember?.image;
//
//   const handleClick = () => {
//     if (setActiveChannel) {
//       setActiveChannel(channel);
//     }
//   };
//
//   return (
//     <div className="channel-preview__container" onClick={handleClick}>
//       <Avatar
//         image={displayImage}
//         name={displayName}
//         size={32}
//         shape="rounded"
//       />
//       <div className="channel-preview__content">
//         <p className="channel-preview__name">{displayName}</p>
//       </div>
//     </div>
//   );
// };
//
// export default function WhatsAppChat({ userId }: { userId: string }) {
//   const apiKey = process.env.NEXT_PUBLIC_REACT_APP_STREAM_KEY || 'Set API Key';
//
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [chatClient, setChatClient] = useState<StreamChat | null>(null);
//   const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(null);
//   const { user } = useUser();
//
//   const sort: ChannelSort = { last_message_at: -1 };
//   const filters: ChannelFilters = {
//     type: 'messaging',
//     members: { $in: [userId] },
//   };
//
//   useEffect(() => {
//     const initChat = async () => {
//       const client = StreamChat.getInstance(apiKey);
//
//       try {
//         const response = await fetch('/api/create-user', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ userId: userId }),
//         });
//
//         if (!response.ok) {
//           throw new Error('Failed to create user');
//         }
//
//         const { userToken } = await response.json();
//
//         await client.connectUser(
//           {
//             id: userId,
//             name: user?.emailAddresses[0].emailAddress,
//             image: user?.imageUrl,
//           },
//           userToken
//         );
//
//         const _videoClient = new StreamVideoClient({
//           apiKey,
//           user: {
//             id: userId,
//             name: user?.emailAddresses[0].emailAddress,
//             image: user?.imageUrl,
//           },
//           token: userToken,
//         });
//
//         await _videoClient.connectUser({
//           id: userId,
//           name: user?.emailAddresses[0].emailAddress,
//           image: user?.imageUrl,
//         }, userToken);
//
//         setChatClient(client);
//         setVideoClient(_videoClient);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error initializing chat:', error);
//         setIsLoading(false);
//       }
//     };
//
//     if (user) {
//       initChat();
//     }
//
//     // No cleanup function
//   }, [userId, apiKey, user]);
//
//   if (isLoading) {
//     return <div className="text-white w-full flex items-center justify-center">Loading…</div>;
//   }
//
//   if (!chatClient || !videoClient) {
//     return <div className="text-white w-full flex items-center justify-center">Failed to initialize chat</div>;
//   }
//
//   return (
//     <div id="root">
//       <Chat client={chatClient}>
//         <StreamVideo client={videoClient}>
//           <StreamTheme as="main" className="main-container">
//             <div className="channel-list-container">
//               {/*@ts-ignore*/}
//               <ChannelListHeader user={chatClient.user} />
//               <ChannelList
//                 sort={sort}
//                 filters={filters}
//                 showChannelSearch
//                 options={{
//                   state: true,
//                   watch: true,
//                   presence: true,
//                 }}
//                 Preview={(previewProps: ChannelPreviewUIComponentProps) => (
//                   <ChannelPreviewCustom {...previewProps} />
//                 )}
//               />
//             </div>
//             <Channel />
//             <Video />
//           </StreamTheme>
//         </StreamVideo>
//       </Chat>
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import { StreamChat, ChannelSort, ChannelFilters } from 'stream-chat';
import {
  ChannelList,
  Chat,
  ChannelPreviewUIComponentProps,
  Avatar,
  useChatContext
} from 'stream-chat-react';
import { Channel } from './Channel';
import {
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-sdk';
import { Video } from './Video';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import './layout.css';
import './styles/index.scss';
import ChannelListHeader from './ChannelListHeader';
import { useUser } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';

const ChannelPreviewCustom = (props: ChannelPreviewUIComponentProps) => {
  const { channel, setActiveChannel } = props;
  const { client } = useChatContext();

  const members = Object.values(channel.state.members).filter(
    ({ user }) => user?.id !== client.userID
  );
  const otherMember = members[0]?.user;

  const displayName = otherMember?.name || otherMember?.id || 'Unknown User';
  const displayImage = otherMember?.image;

  const handleClick = () => {
    if (setActiveChannel) {
      setActiveChannel(channel);
    }
  };

  return (
    <div className="channel-preview__container" onClick={handleClick}>
      <Avatar
        image={displayImage}
        name={displayName}
        size={32}
        shape="rounded"
      />
      <div className="channel-preview__content">
        <p className="channel-preview__name">{displayName}</p>
      </div>
    </div>
  );
};

// export default function WhatsAppChat({ userId }: { userId: string }) {
//   const apiKey = process.env.NEXT_PUBLIC_REACT_APP_STREAM_KEY || 'Set API Key';
//   const searchParams = useSearchParams();
//   const channelId = searchParams.get('channelId');
//
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [chatClient, setChatClient] = useState<StreamChat | null>(null);
//   const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(null);
//   const [activeChannel, setActiveChannel] = useState<any>(null);
//   const { user } = useUser();
//
//   const sort: ChannelSort = { last_message_at: -1 };
//   const filters: ChannelFilters = {
//     type: 'messaging',
//     members: { $in: [userId] },
//   };
//
//   useEffect(() => {
//     const initChat = async () => {
//       const client = StreamChat.getInstance(apiKey);
//
//       try {
//         const response = await fetch('/api/create-user', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ userId: userId }),
//         });
//
//         if (!response.ok) {
//           throw new Error('Failed to create user');
//         }
//
//         const { userToken } = await response.json();
//
//         await client.connectUser(
//           {
//             id: userId,
//             name: user?.fullName || user?.username || userId,
//             image: user?.imageUrl,
//           },
//           userToken
//         );
//
//         const _videoClient = new StreamVideoClient({
//           apiKey,
//           user: {
//             id: userId,
//             name: user?.fullName || user?.username || userId,
//             image: user?.imageUrl,
//           },
//           token: userToken,
//         });
//
//         await _videoClient.connectUser({
//           id: userId,
//           name: user?.fullName || user?.username || userId,
//           image: user?.imageUrl,
//         }, userToken);
//
//         setChatClient(client);
//         setVideoClient(_videoClient);
//
//         // Set the active channel if channelId is provided
//         if (channelId) {
//           const channel = client.channel('messaging', channelId);
//           await channel.watch();
//           setActiveChannel(channel);
//         }
//
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error initializing chat:', error);
//         setIsLoading(false);
//       }
//     };
//
//     if (user) {
//       initChat();
//     }
//
//     return () => {
//       chatClient?.disconnectUser();
//       videoClient?.disconnectUser();
//     };
//   }, [userId, apiKey, user, channelId]);

export default function WhatsAppChat({ userId }: { userId: string }) {
  const apiKey = process.env.NEXT_PUBLIC_REACT_APP_STREAM_KEY || 'Set API Key';

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(null);
  const [activeChannel, setActiveChannel] = useState<any>(null);
  const { user } = useUser();

  const sort: ChannelSort = { last_message_at: -1 };
  const filters: ChannelFilters = {
    type: 'messaging',
    members: { $in: [userId] },
  };

  useEffect(() => {
    const initChat = async () => {
      const client = StreamChat.getInstance(apiKey);

      try {
        const response = await fetch('/api/create-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: userId }),
        });

        if (!response.ok) {
          throw new Error('Failed to create user');
        }

        const { userToken } = await response.json();

        await client.connectUser(
          {
            id: userId,
            name: user?.emailAddresses[0].emailAddress,
            image: user?.imageUrl,
          },
          userToken
        );

        const _videoClient = new StreamVideoClient({
          apiKey,
          user: {
            id: userId,
            name: user?.emailAddresses[0].emailAddress,
            image: user?.imageUrl,
          },
          token: userToken,
        });

        await _videoClient.connectUser({
          id: userId,
          name: user?.emailAddresses[0].emailAddress,
          image: user?.imageUrl,
        }, userToken);

        setChatClient(client);
        setVideoClient(_videoClient);
        setIsLoading(false);

        // Add event listener for new channels
        const handleNewChannel = (event: any) => {
          const { channel } = event;
          setActiveChannel(channel);
        };

        client.on('channel.created', handleNewChannel);

        // Cleanup function
        return () => {
          client.off('channel.created', handleNewChannel);
        };
      } catch (error) {
        console.error('Error initializing chat:', error);
        setIsLoading(false);
      }
    };

    if (user) {
      initChat();
    }

    // No cleanup function for disconnecting clients
  }, [userId, apiKey, user]);

  if (isLoading) {
    return <div className="text-white w-full flex items-center justify-center">Loading…</div>;
  }

  if (!chatClient || !videoClient) {
    return <div className="text-white w-full flex items-center justify-center">Failed to initialize chat</div>;
  }

  // @ts-ignore
  // @ts-ignore
  return (
    <div id="root">
      <Chat client={chatClient}>
        <StreamVideo client={videoClient}>
          <StreamTheme as="main" className="main-container">
            <div className="channel-list-container">
              {/*@ts-ignore*/}
              <ChannelListHeader user={chatClient.user} />
              <ChannelList
                sort={sort}
                filters={filters}
                showChannelSearch
                options={{
                  state: true,
                  watch: true,
                  presence: true,
                }}
                Preview={(previewProps: ChannelPreviewUIComponentProps) => (
                  <ChannelPreviewCustom {...previewProps} />
                )}
                //@ts-ignore
                setActiveChannel={setActiveChannel}
              />
            </div>
            {/*@ts-ignore*/}
            <Channel channel={activeChannel} />
            <Video />
          </StreamTheme>
        </StreamVideo>
      </Chat>
    </div>
  );
}