import io from 'socket.io-client';
import axios from 'axios';
import {showNotification} from '../helpers/NotificationHelper';
// import baseURL from "../assets/common/baseURL";

import '../assets/common/global';

let socket;

export const initiateSocket = (topic, user) => {
  socket = io(`${global.endpoint}`, {
    reconnectionDelayMax: 10000,
    path: '/sio/v1',
    query: {topic: topic},
    auth: {
      id: user.userId,
      isAdmin: user.isAdmin,
    },
  });
  socket.on('connect', () => {
    console.log('Connected to : ' + global.endpoint);
  });

  socket.on(topic, data => {
    const {channel, message} = data;
    if (data) {
      //console.log(data);
      if (channel === 'info') {
        //console.log(channel);
        showNotification('Pesanan Masuk', message, message);
      }
      if (channel === 'order' && user.isAdmin) {
        //console.log(channel);
        showNotification(
          'Pesanan Masuk',
          `Nomor pesanan #${message.id}`,
          `Pesanan dari ${message.phone} untuk dikirim ke ${message.shippingAddress1}, ${message.village}, ${message.district}, ${message.regency}`,
        );
      }
      //console.log('done');
    }
  });

  //if (socket && channel) {
  //socket.emit("CHANNEL_JOIN", channel);
  //}
};

// export const switchChannel = (prevChannel, channel) => {
//  if (socket) {
//    socket.emit("CHANNEL_SWITCH", { prevChannel, channel });
//  }
// };
// export const subscribeToMessages = (callback) => {
//  if (!socket) {
//    return;
//  }

//  socket.on("NEW_MESSAGE", (data) => {
//    callback(null, data);
//  });
// };

// export const sendMessage = (data) => {
//  if (!socket) {
//    return;
//  }

//  socket.emit("MESSAGE_SEND", data);
// };

// export const fetchChannels = async () => {
//  const response = await axios.get(`${SOCKET_URL}/getChannels`);

//  return response.data.channels;
// };

// export const fetchChannelMessages = async (channel) => {
//  const response = await axios.get(
//    `${SOCKET_URL}/channels/${channel}/messages`
//  );

// return response.data.allMessages;
//};
