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
});

// SocketIO 斷線
socket.on('disconnect', () => {
  console.log('Disconnected from server');
  // 斷線
  ioIsConnected.value = false;
});

// Methods
function onJoinGoldMedal() {
  if (!socket) return;
  socket.emit('join-gold');
  console.log(socket.id);
}
function onJoinSilverMedal() {
  if (!socket) return;
  socket.emit('join-silver');
  console.log(socket.id);
}
function onJoinBronzeMedal() {
  if (!socket) return;
  socket.emit('join-bronze');
  console.log(socket.id);
}

// Mounted
onMounted(() => {
  console.log('onMounted');
});
</script>

<template>
  <div>
    <button @click="onJoinGoldMedal">參加金牌積分賽</button>
    <button @click="onJoinSilverMedal">參加銀牌積分賽</button>
    <button @click="onJoinBronzeMedal">參加銅牌積分賽</button>
  </div>
</template>

<style scoped></style>
