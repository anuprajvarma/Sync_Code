import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { initSocket } from "./socket";
import DoubtSection from "./components/DoubtSection";
import Client from "./components/Client_avatar";
import logo from "./images/logo.webp";
import Editor from "./components/Editor";
import "./EditorPage.css";

function EditorPage() {
  const socketRef = useRef(null);
  const navigate = useNavigate();
  const codeRef = useRef(null);
  const location = useLocation();
  const [doubt, setDoubt] = useState("");
  const [allDoubts, setAllDoubts] = useState({});
  const [isChatShown, setChatShown] = useState(false);
  const [liveCode, onCodeChange] = useState("");
  const data = useParams();
  const roomId = data.id;
  const username = location.state.username;
  const [clients, setclients] = useState([]);

  const handleChat = (e) => {
    e.preventDefault();
    setChatShown(true);
    // console.log("chat info", isChatShown);
  };

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();

      socketRef.current.emit("join_room", { roomId, username });

      socketRef.current.on("joined_user", ({ clients, username, socketId }) => {
        if (username !== location.state.username) {
          toast.success(`${username} joined the room.`);
        }
        setclients(clients);

        socketRef.current.emit("sync_code", {
          code: codeRef.current,
          socketId,
        });
      });

      // Listening for doubt event
      socketRef.current.on("doubt", ({ doubts, username, socketId }) => {
        setAllDoubts(doubts);
        toast.success(`${username} asked a doubt!`);
      });

      socketRef.current.on("disconnected", ({ socketId, username }) => {
        toast.success(`${username} left the room`);
        setclients((prev) => {
          return prev.filter((clients) => clients.socketId !== socketId);
        });
      });
    };
    init();
    return () => {
      socketRef.current.disconnect();
      socketRef.current.off("disconnected");
      socketRef.current.off("joined_user");
    };
  }, []);

  async function copyRoomId() {
    // console.log(clients);
    try {
      await window.navigator.clipboard.writeText(roomId);
      toast.success("Room id has been copied to clipboard!");
    } catch (err) {
      toast.error(err);
    }
  }
  function leaveRoom() {
    navigate("/");
    toast.success("You leaved the Room");
  }

  async function askDoubt(e) {
    e.preventDefault();
    socketRef.current.emit("doubt", {
      roomId,
      username: location.state.username,
      doubt,
    });
    setDoubt("");
  }

  const downloadTxtFile = async () => {
    const element = document.createElement("a");
    const file = new Blob([liveCode], { type: "text/plain" });
    element.href = URL.createObjectURL(file);

    element.download = "main.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img className="logoImage" src={logo} alt="" />
          </div>
          <h3>Connected</h3>
          <div className="clientList">
            {clients.map((item) => (
              <Client key={item.socketId} username={item.username} />
            ))}
          </div>
        </div>
        <div className="buttons">
          <button className="btn copyBtn" onClick={copyRoomId}>
            Copy Room Id
          </button>
          <button className="btn leaveBtn" onClick={leaveRoom}>
            Leave
          </button>
        </div>
      </div>

      <div className="editorWrap">
        <Editor
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => {
            codeRef.current = code;
          }}
        />
      </div>
      <button
        className="btn doubtBtn"
        style={{ right: "140px" }}
        onClick={downloadTxtFile}
      >
        Download Code
      </button>
      <button className="btn doubtBtn" onClick={handleChat}>
        Ask a doubt?
      </button>
      {isChatShown ? (
        <DoubtSection
          status={setChatShown}
          setDoubt={setDoubt}
          doubt={doubt}
          askDoubt={askDoubt}
          allDoubts={allDoubts}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default EditorPage;
