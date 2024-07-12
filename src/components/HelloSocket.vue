<script setup>
import { io } from 'socket.io-client';
import { onMounted, ref } from 'vue';

const myMsg = ref('測試通訊的訊息');
const serverMsg = ref('');
const ioIsConnected = ref(false);

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
  if (!socket || myMsg.value === '') return;
  // 觸發事件
  socket.emit('message', myMsg.value);
}
function handleMessage(msg) {
  console.log(`Message from server: ${msg}`);
  serverMsg.value = msg;
}

onMounted(() => {
  console.log('onMounted');
});
</script>

<template>
  <div>
    <div>系統：「{{ serverMsg }}」</div>
    <input type="text" v-model="myMsg" />
    <button @click="onSend" :disabled="!ioIsConnected">send</button>
  </div>
</template>

<style scoped></style>
