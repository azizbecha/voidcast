// utils/broadcast.ts
export const authChannel = new BroadcastChannel('auth');

export const broadcastLogout = () => {
  authChannel.postMessage({ type: 'LOGOUT' });
};

export const onLogout = (callback: () => void) => {
  authChannel.onmessage = (message) => {
    console.log(message)
    if (message.data.type === 'LOGOUT') {
      callback();
    }
  };
};
