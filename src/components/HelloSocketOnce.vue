<script setup>
import { io } from 'socket.io-client';
import { onMounted, ref } from 'vue';

const ioIsConnected = ref(false);

const socket = io('http://localhost:3000');

// SocketIO 連接和重新連接處理
socket.on('connect', () => {
  // socket: Client Socket
  console.log(`Connected to server`);
  // 連線確認
  ioIsConnected.value = true;
  socket.emit('one-time-event');
  socket.emit('one-time-event');
  socket.emit('one-time-event');
  socket.emit('one-time-event');
  socket.emit('one-time-event');
});

// SocketIO 斷線
socket.on('disconnect', () => {
  console.log('Disconnected from server');
  // 斷線
  ioIsConnected.value = false;
});

// Mounted
onMounted(() => {
  console.log('onMounted');
});
</script>

<template>
  <div></div>
</template>

<style scoped></style>
