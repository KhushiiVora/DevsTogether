import { useSelector } from "react-redux";
import { Drawer } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { StyledBox, stringToColor } from "../../styles/codeEditor.styles";
function UsersList(props) {
  const { isListOpen, toggleDrawer } = props;

  const { connectedUsers } = useSelector((state) => state.socket);

  return (
    <Drawer
      anchor="right"
      open={isListOpen}
      onClose={() => toggleDrawer(false)}
    >
      <StyledBox>
        <div className="code-editor__userslist">
          {connectedUsers.map((user) => (
            <div className="code-editor__user" key={user._id}>
              {user.picture ? (
                <Avatar
                  className="code-editor__user-avatar"
                  alt={user.name}
                  src={user.picture}
                />
              ) : (
                <Avatar
                  className="code-editor__user-avatar"
                  alt={user.name}
                  sx={{ bgcolor: stringToColor(user.name) }}
                >{`${user.name.split(" ")[0][0]}`}</Avatar>
              )}
              <span>{user.name}</span>
            </div>
          ))}
        </div>
      </StyledBox>
    </Drawer>
  );
}

export default UsersList;
