<script setup>
import { io } from 'socket.io-client';
import { onMounted, ref } from 'vue';

const myMsg = ref('測試通訊的訊息');
const userProfile = ref({
  name: 'Ryan',
  age: 25,
  job: 'Software Engineer'
});
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
  // 斷線
  ioIsConnected.value = false;
  // 在斷線時移除事件監聽器
  socket.off('message', handleMessage);
});

// Methods
function onSend() {
  if (!socket || myMsg.value === '') return;
  // 觸發事件
  socket.emit('message', myMsg.value);
}
function onGreeting() {
  if (!socket || myMsg.value === '') return;
  // 觸發事件
  socket.emit('greeting', 'Good to see you, Server!');
}
function onSendUserInfo() {
  if (!socket || myMsg.value === '') return;
  // emit args: https://socket.io/docs/v4/client-api/#socketemiteventname-args
  // The ack argument is optional and will be called with the server answer.
  // 觸發事件
  socket.emit('send-user-info', userProfile.value, (ack) => {
    console.log('server response: ', ack);
  });
}
function onSendTimeoutEvent() {
  if (!socket || myMsg.value === '') return;
  // emit args: https://socket.io/docs/v4/client-api/#sockettimeoutvalue
  // 觸發事件
  socket.timeout(3000).emit('timeout-event', (err, ack) => {
    if (err) {
      // the server did not acknowledge the event in the given delay
      // 簡易的實現 err: Server side 不要寫 ackCallback 就好
      console.error(err);
    } else {
      console.log('server response: ', ack);
    }
  });
}
function onCancelAllEvents() {
  socket.emit('cancel-all-events');
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
    <div>系統：「{{ serverMsg }}」</div>
    <input type="text" v-model="myMsg" />
    <button @click="onSend" :disabled="!ioIsConnected">send</button>
    <hr />
    <button @click="onGreeting" :disabled="!ioIsConnected">greeting</button>
    <hr />
    <pre>
      User: {{ userProfile }}
    </pre>
    <input type="text" v-model="userProfile.name" />
    <input type="number" v-model="userProfile.age" />
    <input type="text" v-model="userProfile.job" />
    <button @click="onSendUserInfo" :disabled="!ioIsConnected">
      send user info
    </button>
    <hr />
    <button @click="onSendTimeoutEvent" :disabled="!ioIsConnected">
      send timeout event
    </button>
    <hr />
    <button @click.once="onCancelAllEvents" :disabled="!ioIsConnected">
      cancel all events
    </button>
  </div>
</template>

<style scoped></style>
