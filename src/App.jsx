import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/landing/Landing";
import List from "./components/list/List";
import Detail from "./components/detail/Detail";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
// import Chat from "./components/chat/Chat";

const App = () => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('token')
    if (loggedIn) {
      console.log("Logged In");
      setUser(true);
    } else {
      setUser(false);
      console.log('user logged out')
    }

    return () => {
      console.log("Empty");
    };
  }, []);

  return (
    <div className="container">
      {/* {user ? (
        <>
          <List />
          <Landing />
          <Login />
          <Chat />
          {<Detail /> }
        </>
      ) : (
        <Login />
      )} */}
      <Notification />

      <Router>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/lists" element={<List />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
