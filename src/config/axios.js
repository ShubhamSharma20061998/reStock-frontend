import axios from "axios";
const Axios = axios.create({
  baseURL: "https://restock-np5e.onrender.com",
  // baseURL: "http://localhost:3090",
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});
export default Axios;
