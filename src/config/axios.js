import axios from "axios";
const Axios = axios.create({
  baseURL: "http://localhost:3090",
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});
export default Axios;
