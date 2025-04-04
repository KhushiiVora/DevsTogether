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
  const myStreamRef = useRef(null);
  const streamsRef = useRef([]);
  const { socket, connectedUsers } = useSelector((state) => state.socket);
  const [peer, setPeer] = useState(null);
  const [streams, setStreams] = useState({});

  useEffect(() => {
    if (!peer) return;

    if (isStreaming) {
      startLocalStream();
    } else {
      stopLocalStream();
    }
  }, [isStreaming, peer]);

  useEffect(() => {
    if (!socket?.id) return;

    const peerConfig = {
      host: import.meta.env.VITE_API_PEER_HOST,
      port: import.meta.env.VITE_API_PEER_PORT,
      path: import.meta.env.VITE_API_PEER_PATH,
      secure: import.meta.env.VITE_API_PEER_SECURE === "true",
      config: {
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun1.l.google.com:19302" },
        ],
      },
      debug: 3,
    };

    const peerObj = new Peer(socket.id, peerConfig);

    peerObj.on("open", (id) => {
      console.log("Peer connection ready with ID:", id);
      setPeer(peerObj);
    });

    peerObj.on("error", (error) => {
      console.error("PeerJS error:", error);
      showErrorToast("Connection error occurred");
    });

    peerObj.on("call", async (call) => {
      try {
        console.log("Incoming call from:", call.peer);

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
        call.on("error", (error) => {
          console.error("Call error:", error);
        });
      } catch (error) {
        console.error("Error handling incoming call:", error);
      }
    });

    socket.on("peer-streamed-off", ({ socketId }) => {
      setStreams((savedStreams) => {
        const newState = { ...savedStreams };
        delete newState[socketId];
        return newState;
      });
    });
    socket.on("joined", (newUser) => {
      console.log("hello");
      if (myStreamRef.current) {
        try {
          console.log("Calling user:", newUser.socketId);
          const call = peer.call(newUser.socketId, myStreamRef.current);

          call.on("stream", (userVideoStream) => {
            console.log("Got stream from:", newUser.socketId);
            if (userVideoStream)
              setStreams((savedStreams) => {
                const newState = { ...savedStreams };
                newState[call.peer] = userVideoStream;
                return newState;
              });
          });

          call.on("error", (error) => {
            console.error("Call error with user:", newUser.socketId, error);
          });
        } catch (error) {
          console.error("Error calling user:", newUser.socketId, error);
        }
      }
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
      stopLocalStream();
      peerObj.destroy();
    };
  }, [socket?.id]);

  const stopLocalStream = () => {
    if (myStreamRef.current) {
      myStreamRef.current.getTracks().forEach((track) => track.stop());
      myStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    socket.emit("peer-stream-off", { roomCode, socketId: socket.id });
  };

  const startLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      myStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        // mute for yourself
        videoRef.current.muted = true;
      }

      connectedUsers.forEach((user) => {
        if (user.socketId !== socket.id) {
          try {
            console.log("Calling user:", user.socketId);
            const call = peer.call(user.socketId, stream);

            call.on("stream", (userVideoStream) => {
              console.log("Got stream from:", user.socketId);
              if (userVideoStream)
                setStreams((savedStreams) => {
                  const newState = { ...savedStreams };
                  newState[call.peer] = userVideoStream;
                  return newState;
                });
            });

            call.on("error", (error) => {
              console.error("Call error with user:", user.socketId, error);
            });
          } catch (error) {
            console.error("Error calling user:", user.socketId, error);
          }
        }
      });
    } catch (error) {
      console.error("Media access error:", error);
      showErrorToast("Failed to access camera/microphone");
      setIsStreaming(false);
    }
  };

  useEffect(() => {
    console.log(streams);
    Object.values(streams).forEach((stream) => {
      streamsRef.current[stream.id].srcObject = stream;
    });
  }, [streams]);

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
