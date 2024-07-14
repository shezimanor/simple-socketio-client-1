<script setup>
import { io } from 'socket.io-client';
import { onMounted, ref } from 'vue';

const ioIsConnected = ref(false);
const myName = ref('Ryan');
const serverMsg = ref('');

const socket = io('http://localhost:3000');

// SocketIO 連接和重新連接處理
socket.on('connect', () => {
  // socket: Client Socket
  console.log(`Connected to server`);
  // 連線確認
  ioIsConnected.value = true;
  // 註冊事件
  socket.on('message', handleMessage);
});

// SocketIO 斷線
socket.on('disconnect', () => {
  console.log('Disconnected from server');
  // 在斷線時移除事件監聽器
  socket.off('message', handleMessage);
});

// Methods
function onSend() {
  if (!socket || myName.value === '') return;
  // 觸發事件
  socket.emit('message', myName.value);
}
function handleMessage(msg) {
  console.log(`Message from server: ${msg}`);
  serverMsg.value = msg;
}

// Mounted
onMounted(() => {
  console.log('onMounted');
});
</script>

<template>
  <div>
    <div>Name: <input type="text" v-model="myName" /></div>
    <button @click="onSend" :disabled="!ioIsConnected">send</button>
  </div>
  <hr />
  <div>Server Msg: {{ serverMsg }}</div>
</template>

<style scoped></style>
