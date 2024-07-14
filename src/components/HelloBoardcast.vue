<script setup>
import { io } from 'socket.io-client';
import { onMounted, ref } from 'vue';

const ioIsConnected = ref(false);
const myName = ref('Ryan');
const myScore = ref(100);
const currentScoreBoard = ref({});

const socket = io('http://localhost:3000');

// SocketIO 連接和重新連接處理
socket.on('connect', () => {
  // socket: Client Socket
  console.log(`Connected to server`);
  // 連線確認
  ioIsConnected.value = true;
  // 註冊事件
  socket.on('user-score', showScoreBoard);
});

// SocketIO 斷線
socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

// Methods
function onSendUserScore() {
  if (!socket || myName.value === '') return;
  // 觸發事件
  socket.emit('user-score', { name: myName.value, score: myScore.value });
}
function showScoreBoard(userScores) {
  currentScoreBoard.value = userScores;
}

// Mounted
onMounted(() => {
  console.log('onMounted');
});
</script>

<template>
  <div>
    <div>Name: <input type="text" v-model="myName" /></div>
    <div>Score: <input type="number" v-model="myScore" /></div>
    <button @click="onSendUserScore" :disabled="!ioIsConnected">
      Send Score
    </button>
  </div>
  <hr />
  <div>
    <div v-for="(item, key) in currentScoreBoard" :key="key">
      <span>{{ item.name }}</span
      >: <span>{{ item.score }}</span>
    </div>
  </div>
</template>

<style scoped></style>
