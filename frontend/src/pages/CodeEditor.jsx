import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { throttle } from "lodash";
import { Editor, useMonaco } from "@monaco-editor/react";
import { useTheme } from "../hooks/useTheme";
import { useSocket } from "../hooks/useSocket";
import { disconnectedUserRemoved, newUserSaved } from "../state/socketSlice";
import { LANGUAGE_TEMPLATES, LANGUAGE_VERSIONS } from "../constants";
import VideoStreamingGallery from "../components/editor/VideoStreamingGallery";
import LanguageSelector from "../components/editor/LanguageSelector";
import OutputHeader from "../components/editor/OutputHeader";
import OutputScreen from "../components/editor/OutputScreen";
import { ToastContainer } from "react-toastify";
import { showInfoToast, showSuccessToast } from "../utils/toast";
import { LuGalleryVerticalEnd } from "react-icons/lu";
import { FaVideo, FaVideoSlash } from "react-icons/fa";
import { StyledSection, applyCursorStyles } from "../styles/codeEditor.styles";
import {
  StyledOutlinedButton,
  StyledIconButton,
} from "../styles/button.styles";

function CodeEditor() {
  const monaco = useMonaco();
  const editorRef = useRef();
  const languageRef = useRef();
  const remoteCursorsRef = useRef({});
  const { roomCode } = useParams();
  const { isDark } = useTheme();
  const { socket } = useSocket();
  const { user } = useSelector((state) => state.user);

  const [code, setCode] = useState(LANGUAGE_TEMPLATES["c"]);
  const [language, setLanguage] = useState("c");
  const [output, setOutput] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(socket);
    languageRef.current = language;
    showSuccessToast("Welcome to " + roomCode + "!");
    // broadcasted events
    socket.on("joined", (newUser) => {
      console.log(newUser.socketId, newUser.name);
      dispatch(newUserSaved(newUser));
      showInfoToast(`${newUser.name} joined!`);
      socket.emit("sync-code", {
        socketId: newUser.socketId,
        code: editorRef.current.getValue(),
        language: languageRef.current,
      });
    });
    socket.on("disconnected", ({ socketId, username }) => {
      dispatch(disconnectedUserRemoved(socketId));
      showInfoToast(`${username} left!`);
    });
    socket.on("code-changed", ({ code }) => {
      setCode(code);
    });
    socket.on("language-selected", ({ language }) => {
      setLanguage(language);
      setCode(LANGUAGE_TEMPLATES[language]);
    });
    // if error then need to remove this
    return () => {
      console.log("unmounted");
      socket.disconnect();
      socket.off("joined");
      socket.off("code-changed");
      socket.off("language-selected");
      socket.off("cursor-info");
      socket.off("disconnected");
    };
  }, []);

  useEffect(() => {
    if (monaco) {
      socket.on("cursor-info", (data) => {
        showRemoteCursor(data);
      });
    }
  }, [monaco]);

  const showRemoteCursor = ({ socketId, username, position }) => {
    const decorations = [
      {
        range: new monaco.Range(
          position.lineNumber,
          position.column,
          position.lineNumber,
          position.column
        ),
        options: {
          className: `remote-cursor--${socketId}`,
          afterContentClassName: `remote-cursor-label--${socketId}`,
        },
      },
    ];
    // editorRef.current.deltaDecorations([], decorations);

    remoteCursorsRef.current[socketId] = editorRef.current.deltaDecorations(
      remoteCursorsRef.current[socketId] || [],
      decorations
    );

    applyCursorStyles(socketId, username);
  };

  const handleOnChange = (code) => {
    setCode(code);
    socket.emit("code-change", {
      roomCode,
      code,
    });
  };
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
    editorRef.current.onDidChangeCursorPosition((event) => {
      const position = editorRef.current.getPosition();
      if (!position) return;
      if (
        remoteCursorsRef.current[socket.id] &&
        remoteCursorsRef.current[socket.id].lineNumber === position.lineNumber
      ) {
        return;
      }
      sendCursorPosition(position);
    });
  };
  const sendCursorPosition = throttle((position) => {
    socket.emit("cursor-move", {
      socketId: socket.id,
      username: user.name,
      roomCode,
      position,
    });
  }, 200);
  const onSelect = (language) => {
    socket.emit("language-select", {
      roomCode,
      language,
    });
    languageRef.current = language;
    setLanguage(language);
    setCode(LANGUAGE_TEMPLATES[language]);
  };

  const executeCode = async (event) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://emkc.org/api/v2/piston/execute",
        {
          language,
          version: LANGUAGE_VERSIONS[language],
          files: [
            {
              content: code,
            },
          ],
        }
      );
      console.log(response.data);
      const { run: result } = response.data;
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleGallery = (state) => {
    setIsGalleryOpen(state);
  };

  const toggleStream = () => {
    if (!isStreaming) {
      toggleGallery(true);
    }
    setIsStreaming(!isStreaming);
  };

  return (
    <StyledSection>
      <VideoStreamingGallery
        toggleGallery={toggleGallery}
        isStreaming={isStreaming}
        setIsStreaming={setIsStreaming}
        roomCode={roomCode}
        className={isGalleryOpen ? "display" : ""}
      />
      <div className="code-editor__editor">
        <div className="code-editor__controls">
          <div>
            <StyledOutlinedButton
              className={`${isGalleryOpen ? "hide" : ""}`}
              onClick={() => toggleGallery(true)}
            >
              <LuGalleryVerticalEnd /> View streams
            </StyledOutlinedButton>
            <StyledIconButton onClick={toggleStream}>
              {isStreaming ? (
                <FaVideoSlash className="video-icon" />
              ) : (
                <FaVideo className="video-icon" />
              )}
            </StyledIconButton>
          </div>
          <LanguageSelector language={language} onSelect={onSelect} />
          <StyledOutlinedButton disabled={isLoading} onClick={executeCode}>
            Run Code
          </StyledOutlinedButton>
        </div>
        <Editor
          height="90vh"
          theme={`vs-${isDark ? "dark" : "light"}`}
          language={language}
          defaultValue={LANGUAGE_TEMPLATES[language]}
          value={code}
          onChange={handleOnChange}
          onMount={onMount}
        />
      </div>
      <div className="code-editor__output">
        <OutputHeader roomCode={roomCode} />
        <OutputScreen isLoading={isLoading} isError={isError} output={output} />
      </div>
      <ToastContainer />
    </StyledSection>
  );
}

export default CodeEditor;
