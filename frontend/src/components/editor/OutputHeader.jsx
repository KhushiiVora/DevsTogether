import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import UsersList from "./UsersList";

import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { showErrorToast, showInfoToast } from "../../utils/toast";
import {
  stringToColor,
  StyledMenu,
  StyledMenuItem,
} from "../../styles/codeEditor.styles";

function OutputHeader(props) {
  const { roomCode } = props;
  const { connectedUsers } = useSelector((state) => state.socket);

  const [isListOpen, setIsListOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCopyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomCode);
      showInfoToast("Room code is copied.");
    } catch (error) {
      showErrorToast("Unable to copy Room Code!");
    }
    handleClose();
  };
  const handleLeaveRoom = () => {
    handleClose();
    navigate("/landing", { replace: true });
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const toggleDrawer = (open) => {
    setIsListOpen(open);
  };
  return (
    <div className="code-editor__output-header">
      <h2>Output</h2>
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
        <StyledMenuItem key="copyRoomId" onClick={handleCopyRoomId}>
          Copy Room Id
        </StyledMenuItem>
        <StyledMenuItem key="leaveRoom" onClick={handleLeaveRoom}>
          Leave Room
        </StyledMenuItem>
      </StyledMenu>
      <UsersList isListOpen={isListOpen} toggleDrawer={toggleDrawer} />
    </div>
  );
}

export default OutputHeader;
