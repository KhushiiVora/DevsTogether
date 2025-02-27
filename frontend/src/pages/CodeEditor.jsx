import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Editor } from "@monaco-editor/react";
import { useTheme } from "../hooks/useTheme";
import { useSocket } from "../hooks/useSocket";
import { disconnectedUserRemoved, newUserSaved } from "../state/socketSlice";
import { LANGUAGE_TEMPLATES, LANGUAGE_VERSIONS } from "../constants";
import LanguageSelector from "../components/editor/LanguageSelector";
import OutputScreen from "../components/editor/OutputScreen";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ToastContainer } from "react-toastify";
import { showInfoToast } from "../utils/toast";
import {
  StyledSection,
  stringToColor,
  StyledMenu,
  StyledMenuItem,
} from "../styles/codeEditor.styles";
import { StyledOutlinedButton } from "../styles/button.styles";
import UsersList from "../components/editor/UsersList";

function CodeEditor() {
  const editorRef = useRef();
  const languageRef = useRef();
  const { roomCode } = useParams();
  const { isDark } = useTheme();
  const { socket } = useSocket();
  const { connectedUsers } = useSelector((state) => state.socket);

  const [code, setCode] = useState(LANGUAGE_TEMPLATES["c"]);
  const [language, setLanguage] = useState("c");
  const [output, setOutput] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(socket);
    languageRef.current = language;
    // broadcasted event
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
      socket.off("disconnected");
      socket.off("code-changed");
      socket.off("language-selected");
    };
  }, []);

  const handleOnChange = (code) => {
    console.log(editorRef.current.getPosition());
    setCode(code);
    socket.emit("code-change", {
      roomCode,
      code,
    });
  };
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };
  const onSelect = (language) => {
    socket.emit("language-select", {
      roomCode,
      language,
    });
    languageRef.current = language;
    setLanguage(language);
    setCode(LANGUAGE_TEMPLATES[language]);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const toggleDrawer = (open) => {
    setIsListOpen(open);
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

  return (
    <StyledSection>
      <div className="code-editor__editor">
        <div>
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
        <div className="code-editor__output-header">
          <h2>Output:</h2>
          {connectedUsers.length ? (
            <AvatarGroup
              className={"code-editor__output-header__avatars"}
              total={connectedUsers.length}
              max={3}
              onClick={() => toggleDrawer(true)}
            >
              {connectedUsers.map((userData) => {
                return userData.picture ? (
                  <Avatar
                    className="code-editor__output-header__avatars-avatar"
                    key={userData._id}
                    alt={userData.name}
                    src={userData.picture}
                  />
                ) : (
                  <Avatar
                    className="code-editor__output-header__avatars-avatar"
                    key={userData._id}
                    alt={userData.name}
                    sx={{ bgcolor: stringToColor(userData.name) }}
                  >
                    {`${userData.name.split(" ")[0][0]}`}
                  </Avatar>
                );
              })}
            </AvatarGroup>
          ) : (
            <></>
          )}
          <IconButton
            className="code-editor__output-header-menuIcon"
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <StyledMenu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              paper: {
                style: {
                  maxHeight: 48 * 4.5,
                  width: "20ch",
                },
              },
            }}
          >
            <StyledMenuItem key="copyRoomId" onClick={handleClose}>
              Copy Room Id
            </StyledMenuItem>
            <StyledMenuItem key="leaveRoom" onClick={handleClose}>
              Leave Room
            </StyledMenuItem>
          </StyledMenu>
          <UsersList isListOpen={isListOpen} toggleDrawer={toggleDrawer} />
        </div>
        <OutputScreen isLoading={isLoading} isError={isError} output={output} />
      </div>
      <ToastContainer />
    </StyledSection>
  );
}

export default CodeEditor;
