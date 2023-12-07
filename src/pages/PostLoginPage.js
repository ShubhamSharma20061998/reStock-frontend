import React, { useEffect, useState } from "react";
import AdminLandingPage from "./AdminLandingPage";
import UserLandingPage from "./UserLandingPage";

const PostLoginPage = () => {
  const [role, setRole] = useState("");
  useEffect(() => {
    const res = localStorage.getItem("role");
    setRole(res);
  }, []);
  return (
    <div>{role == "admin" ? <AdminLandingPage /> : <UserLandingPage />}</div>
  );
};

export default PostLoginPage;
