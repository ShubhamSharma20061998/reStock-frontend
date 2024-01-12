import {
  Container,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import logo from "../../assets/restock-high-resolution-logo-transparent.png";
import styles from "./AdminFooter.module.css";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link, useNavigate } from "react-router-dom";

const ProjectFooter = () => {
  const [quickLinks, setQuickLinks] = useState([]);
  const linkedIn = "https://www.linkedin.com/in/shubham-sharma-76861a1a0";
  const gitHub = "https://github.com/ShubhamSharma20061998";

  useEffect(() => {
    const res = localStorage.getItem("role");
    const userId = localStorage.getItem("userID");
    if (res == "admin") {
      setQuickLinks([
        { title: "Home", path: "/landingPage" },
        { title: "Create Shop", path: "/registerShop" },
        { title: "Create Product", path: "/create_product" },
      ]);
    } else if (res == "user") {
      setQuickLinks([
        { title: "Home", path: "/landingPage" },
        { title: "Orders", path: `/orders/${userId}` },
        { title: "Profile", path: `/user-profile/${userId}` },
      ]);
    }
  }, []);

  const handleClick = (title, path) => {
    if (title == "Home") {
      navigate(path);
    } else if (title == "Orders") {
      navigate(path);
    } else if (title == "Profile") {
      navigate(path);
    } else if (title == "Create Shop") {
      navigate(path);
    } else if (title == "Create Product") {
      navigate(path);
    }
  };

  const navigate = useNavigate();

  return (
    <footer className={styles.footer}>
      <Container sx={{ padding: "1.5rem" }}>
        <Grid container justifyContent={"center"} spacing={{ xs: "1rem" }}>
          <Grid item md={4} xs={12}>
            <img
              src={logo}
              alt="logo"
              className={`${styles.footerLogo} cursorPointer`}
              onClick={() => navigate("/landingPage")}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <Typography variant="h6">Quick links</Typography>
            <ul>
              {quickLinks?.map(({ title, path }, index) => (
                <li
                  key={index}
                  className="cursorPointer widthFitContent"
                  onClick={() => {
                    handleClick(title, path);
                  }}
                >
                  {title}
                </li>
              ))}
            </ul>
          </Grid>
          <Grid item md={4} xs={12}>
            <Typography variant="h6">Get in touch</Typography>
            <div>
              <Tooltip title="LinkedIn">
                <IconButton aria-label="LinkedIn">
                  <Link target="_blank" to={linkedIn}>
                    <LinkedInIcon className={styles.connectIcon} />
                  </Link>
                </IconButton>
              </Tooltip>
              <Tooltip title="Github">
                <IconButton aria-label="Github">
                  <Link target="_blank" to={gitHub}>
                    <GitHubIcon className={styles.connectIcon} />
                  </Link>
                </IconButton>
              </Tooltip>
            </div>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default ProjectFooter;
