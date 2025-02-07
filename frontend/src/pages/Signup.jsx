import axios from "../axiosConfig";

function Signup() {
  async function ping() {
    const response = await axios.get("/signup");
    console.log(response);
  }
  async function logInWithGoogle() {
    console.log("in logInWithGoogle");
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
  }
  return (
    <div>
      <button onClick={logInWithGoogle}>Log In With Google</button>
    </div>
  );
}

export default Signup;
