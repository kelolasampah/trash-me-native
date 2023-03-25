import io from "socket.io-client";
import axios from "axios";
// import baseURL from "../assets/common/baseURL";

import '../assets/common/global'

let socket;

export const initiateSocket = (channel, nickname) => {
 socket = io(`${global.baseurl}/namespace`, {
   //query: { channel, nickname },
    //path: '/sampah' 
 });

  console.log("Connecting to socket");
  socket.on("hello", (data) => {
        console.log(data);
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