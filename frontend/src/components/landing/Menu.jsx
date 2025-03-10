import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useLogout } from "../../hooks/useLogout";
import SpinnerIcon from "../atoms/SpinnerIcon";
import { showErrorToast } from "../../utils/toast";
import { TbLogout } from "react-icons/tb";
function Menu() {
  const { isLoading, logout } = useLogout();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    const { status, message } = logout();
    if (status == 500) {
      showErrorToast(message);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="landing__menu">
      <h4>{user.name}</h4>
      <p>{user.email}</p>
      <div className="separator"></div>
      <div className="logout" onClick={handleLogout}>
        {isLoading ? (
          <>
            <SpinnerIcon className="logout-spinner" />
            Logging out
          </>
        ) : (
          <>
            <TbLogout />
            Logout
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
export default Menu;
