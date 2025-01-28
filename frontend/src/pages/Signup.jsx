import axios from "../axiosConfig";

function Signup() {
  async function ping() {
    const response = await axios.get("/signup");
    console.log(response);
  }
  return <div>{ping()}</div>;
}

export default Signup;
