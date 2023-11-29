import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:3090",
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});
