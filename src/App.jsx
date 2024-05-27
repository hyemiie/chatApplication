import Chat from "./components/chat/Chat";
import List from "./components/list/List";
import Detail from "./components/detail/Detail";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { useEffect, useState } from "react";
const App = () => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (localStorage.length > 0) {
      console.log("Logged In");
      setUser(true);
    } else {
      setUser(false);
      alert("User not logged In");
    }

    return () => {
      console.log("Empty");
    };
  });

  return (
    <div className="container">
      {user ? (
        <>
          {" "}
          <List />
          <Chat />
          <Detail />
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
};

export default App;
