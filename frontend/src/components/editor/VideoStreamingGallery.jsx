import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Peer } from "peerjs";

import { showErrorToast } from "../../utils/toast";

import { IoClose } from "react-icons/io5";
import { StyledIconButton } from "../../styles/button.styles";

function VideoStreamingGallery(props) {
  const { toggleGallery, isStreaming, setIsStreaming, roomCode, className } =
    props;
  const videoRef = useRef();
  const myStreamRef = useRef();
  const streamsRef = useRef([]);
  const { socket, connectedUsers } = useSelector((state) => state.socket);
  const [peer, setPeer] = useState(null);
  const [streams, setStreams] = useState({});

  useEffect(() => {
    if (isStreaming) {
      callAllConnectedUsers();
    } else {
      console.log(myStreamRef.current?.getTracks());
      myStreamRef.current?.getTracks()[0].stop();
      myStreamRef.current?.getTracks()[1].stop();
      socket.emit("peer-stream-off", { roomCode, socketId: socket.id });
    }
  }, [isStreaming]);

  useEffect(() => {
    const peerConfig = {
      host: import.meta.env.VITE_API_PEER_HOST,
      port: import.meta.env.VITE_API_PEER_PORT,
      path: import.meta.env.VITE_API_PEER_PATH,
      secure: import.meta.env.VITE_API_PEER_SECURE === "true",
      config: {
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun1.l.google.com:19302" },
          { urls: "stun:stun2.l.google.com:19302" },
          { urls: "stun:stun3.l.google.com:19302" },
          { urls: "stun:stun4.l.google.com:19302" },
        ],
      },
      debug: 3,
    };

    const peerObj = new Peer(socket.id, peerConfig);
    setPeer(peerObj);

    peerObj.on("open", (id) => {
      console.log("My peer ID is: " + id);
    });

    peerObj.on("error", (error) => {
      console.error("PeerJS error:", error);
    });

    peerObj.on(
      "call",
      (call) => {
        console.log("call receiving.....", call);
        // asnwer call with your stream
        call.answer(myStreamRef.current);
        call.on("stream", (remoteStream) => {
          console.log("on receive call", remoteStream);
          if (remoteStream)
            setStreams((savedStreams) => {
              const newState = { ...savedStreams };
              newState[call.peer] = remoteStream;
              return newState;
            });
        });
      },
      (error) => {
        console.log("error in receiving call", error);
      }
    );

    socket.on("peer-streamed-off", ({ socketId }) => {
      setStreams((savedStreams) => {
        const newState = { ...savedStreams };
        delete newState[socketId];
        return newState;
      });
    });

    socket.on("disconnected", ({ socketId }) => {
      console.log("disconnected", socketId);
      setStreams((savedStreams) => {
        const newState = { ...savedStreams };
        delete newState[socketId];
        return newState;
      });
    });

    return () => {
      peerObj.disconnect();
      peerObj.destroy();
      console.log(myStreamRef.current?.getTracks());
      myStreamRef.current?.getTracks()[0].stop();
      myStreamRef.current?.getTracks()[1].stop();
    };
  }, []);

  const callAllConnectedUsers = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      videoRef.current.srcObject = stream;
      myStreamRef.current = stream;
      // mute for yourself
      videoRef.current.muted = true;

      connectedUsers.forEach((user) => {
        if (user.socketId !== socket.id) sendStream(user, stream);
      });

      socket.on("joined", (newUser) => {
        console.log("hello");
        sendStream(newUser, stream);
      });
    } catch (error) {
      console.log(error);
      showErrorToast("Permission Denied");
      setIsStreaming(false);
    }
  };

  useEffect(() => {
    console.log(streams);
    Object.values(streams).forEach((stream) => {
      streamsRef.current[stream.id].srcObject = stream;
    });
  }, [streams]);

  const sendStream = (user, stream) => {
    const call = peer.call(user.socketId, stream);
    console.log("calling........", call);
    call.on("stream", (userVideoStream) => {
      console.log("on calling user", userVideoStream);
      if (userVideoStream)
        setStreams((savedStreams) => {
          const newState = { ...savedStreams };
          newState[call.peer] = userVideoStream;
          return newState;
        });
    });
    call.on("close", () => {
      console.log("closed connection");
      setStreams((savedStreams) => {
        const newState = { ...savedStreams };
        delete newState[call.peer];
        return newState;
      });
    });
  };

  return (
    <div className={`code-editor__gallery ${className}`}>
      <div className="code-editor__gallery-header">
        <h2>Streams</h2>
        <StyledIconButton onClick={() => toggleGallery(false)}>
          <IoClose />
        </StyledIconButton>
      </div>
      <div className="code-editor__video-container">
        {isStreaming && <video key={socket.id} ref={videoRef} autoPlay></video>}
        {Object.values(streams).length
          ? Object.values(streams).map((stream) => (
              <video
                key={stream.id}
                ref={(element) => (streamsRef.current[stream.id] = element)}
                autoPlay
              ></video>
            ))
          : !isStreaming && <p>No one is streaming</p>}
      </div>
    </div>
  );
}

export default VideoStreamingGallery;
