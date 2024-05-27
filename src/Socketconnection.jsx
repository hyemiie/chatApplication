import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const ConnectSocket = (url) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(url);
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, [url]);

  return socket;
};

export default ConnectSocket;
