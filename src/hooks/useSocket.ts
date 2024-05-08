import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = (serverUrl: string): Socket | null => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(serverUrl, { autoConnect: false });
    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [serverUrl]);

  return socketRef.current;
};
