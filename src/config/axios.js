import axios from "axios";
const Axios = axios.create({
  baseURL: "https://restock-np5e.onrender.com",
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});
export default Axios;
