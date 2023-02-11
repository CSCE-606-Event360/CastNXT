import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios"

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      marginRight: theme.spacing(2),
    },
}));

const logoutUser = () => {
    axios.get("/logout")
        .then((res) => {
            window.location.href = res.data.redirect_path;
        })
        .catch((err) => {
            window.alert("Error: Could not Logout " + properties?.name)
        })
}

const Header = (props) => {
    const classes = useStyles();
    return (
        <div className="header">
            <header>
                <AppBar className="appbar" style={{background: "black"}}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <img src={require("../../assets/images/logo.png")} alt="FASHIONXT" style={{ width: "200px" }} />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}></Typography>
                        <Typography color="inherit" style={{marginRight: "1%"}}>Welcome, {properties?.name}</Typography>
                        <Typography><Button id='logoutBtn' variant="contained" onClick={logoutUser}>Logout</Button></Typography>
                        
                    </Toolbar>
                </AppBar>
            </header>
        </div>
    )
}

export default Header;