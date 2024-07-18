# Emit Cheatsheet

## Client-side

```js
// basic emit
socket.emit(/* ... */);

// with acknowledgement
socket.emit('question', (answer) => {
  // ...
});

// without compression
socket.compress(false).emit(/* ... */);

// a message that might be dropped if the low-level transport is not writable
socket.volatile.emit(/* ... */);

// with timeout
socket.timeout(5000).emit('my-event', (err) => {
  if (err) {
    // the other side did not acknowledge the event in the given delay
  }
});
```

## Reserved events

On each side, the following events are reserved and should not be used as event names by your application:

- connect

- connect_error

- disconnect

- disconnecting

- newListener

- removeListener
