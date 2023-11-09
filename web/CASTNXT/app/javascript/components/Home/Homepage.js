import React, {Component} from "react"
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";

class Homepage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            signUpName: "",
            signUpEmail: "",
            signUpPassword: "",
            signUpConfirmPassword: "",
            signUpRole: "USER",
            loginEmail: "",
            loginPassword: "",
            forgotEmail: "",
            nameError: false,
            emailError: false,
            passwordError: false,
            passwordErrorText: "",
            tabValue: 0,
            status: "",
            message: "",
            disableSubmit: false
        }
    }

    handleTabChange = (event, value) => {
        this.setState({
            tabValue: value
        })
    }

    handleChange = (e, value) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    signUp = () => {
        let errors = false
        let email = this.state.signUpEmail
        let emailValid = email.toLowerCase() .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                                
        if(!emailValid) {
            this.setState({
                emailError: true
            })
            errors = true
        }
        
        if(this.state.signUpPassword !== this.state.signUpConfirmPassword) {
            this.setState({
                passwordError: true,
                passwordErrorText: "The passwords must match"
            })
            errors = true
        }
        else if(this.state.signUpPassword.length < 8) {
            this.setState({
                passwordError: true,
                passwordErrorText: "The minimum length of the password is 8 characters"
            })
            errors = true
        }
        
        // If there are no errors, call sign up api to add the new user
        if(!errors) {
            this.setState({
                disableSubmit: true
            })
            
            let name = this.state.signUpName
            let email = this.state.signUpEmail
            let password = this.state.signUpPassword
            let role = this.state.signUpRole
            
            //Make API call
            axios.post("/home/signup", {
                name: name,
                email: email,
                password: password,
                type: role
            })
            .then((res) => {
                this.setState({
                    status: true,
                    message: ""
                })
                
                window.location.href = res.data.redirect_path;
                console.log(res.data.redirect_path)
            })
            .catch((err) => {
                this.setState({
                    disableSubmit: false,
                    status: false,
                    message: err.response.data.comment
                })
                if(err.response.data.comment==="Account Created Sucessfully - Login now!"){
                    setTimeout(function() {
                        location.reload();
                     }, 1000);
                }
            })
        }
    }

    login = () => {
        let email = this.state.loginEmail
        let password = this.state.loginPassword
        
        this.setState({
            disableSubmit: true
        })
        
        axios.post("/home/login", {
                email: email,
                password: password
            })
            .then((res) => {
                this.setState({
                    status: true,
                    message: ""
                })
                
                window.location.href = res.data.redirect_path;
            })
            .catch((err) => {
                this.setState({
                    disableSubmit: false,
                    status: false,
                    message: err.response.data.comment
                })
            })
    }

    forgot = () => {
        let email = this.state.forgotEmail
        
        this.setState({
            disableSubmit: true
        })
        //abc123
        axios.post("/home/forgotPassword", {
                email: email
            })
            .then((res) => {
                this.setState({
                    status: true,
                    message: ""
                })
                
                window.location.href = res.data.redirect_path;
            })
            .catch((err) => {
                this.setState({
                    disableSubmit: false,
                    status: false,
                    message: err.response.data.comment
                })
            })
    }

    render() {

        let imageStyle = { 
            padding: "1.2%", 
            textAlign: "center", 
            backgroundColor:"black", 
            display: "inline-block"
        }

        return (
            <div>
                <div className="container">
                    <div style={imageStyle} className="centered">
                        <img src={require("../../assets/images/logo.png")} alt="FASHIONXT" style={{ width: "300px" }} />
                    </div>
                    <div className="row" style={{ color: "white" }}>
                        <div className="col-md-6 offset-md-3 login-box">
                            <div>
                                <Tabs variant="fullWidth" value={this.state.tabValue} onChange={this.handleTabChange} centered>
                                    <Tab style={{focus: "color: #719ECE"}} label="Login" />
                                    <Tab label="Sign Up" />
                                    <Tab label="Forgot Password" />
                                </Tabs>
                                <hr style={{ color: "black" }} />
                            </div>

                            {this.state.tabValue === 0 &&
                                <div className="login-background">
                                    <TextField focused style={{ width: "60%" }} name="loginEmail" 
                                        type="email" label="Email" value={this.state.loginEmail} onChange={this.handleChange} /><br /><br />
                                    <TextField focused style={{ width: "60%" }} name="loginPassword" 
                                        type="password" label="Password" value={this.state.loginPassword} onChange={this.handleChange} /><br /><br />
                                    <Button disabled={this.state.disableSubmit} variant="contained" onClick={this.login}>Login</Button>
                                    
                                    {(this.state.status !== "" && !this.state.status) &&
                                        <div>
                                            <br />
                                            <span style={{color: "red"}}>{this.state.message}</span>
                                        </div>
                                    }
                                </div>
                            }

                            {this.state.tabValue === 1 &&
                                <div className="login-background" style={{overflowY: "auto"}}>
                                    <FormControl style={{ textAlign: "center", color: "black" }}>
                                        <FormLabel>Welcome to CastNXT! Please select your role</FormLabel>
                                        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                            <RadioGroup
                                                row
                                                name="signUpRole"
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                defaultValue="USER"
                                                onChange={this.handleChange}
                                            >
                                                <FormControlLabel value="USER" control={<Radio />} label="User" />
                                                <FormControlLabel value="ADMIN" control={<Radio />} label="Admin" />
                                                <FormControlLabel value="CLIENT" control={<Radio />} label="Client" />
                                            </RadioGroup>
                                        </div>
                                    </FormControl>
                                    <br /><br />
                                    <TextField size="small" focused style={{ width: "60%" }} name="signUpName" type="text" label="Name" value={this.state.signUpName} 
                                        onChange={this.handleChange} /><br /><br />
                                        
                                    <TextField size="small" focused style={{ width: "60%" }} name="signUpEmail" type="email" label="Email" value={this.state.signUpEmail} 
                                        error={this.state.emailError} helperText={this.state.emailError ? "Enter a valid email address" : ""} 
                                        onChange={this.handleChange} /><br /><br />
                                            
                                    <TextField size="small" focused style={{ width: "60%" }} name="signUpPassword" type="password" label="Password" value={this.state.signUpPassword} 
                                        error={this.state.passwordError} helperText={this.state.passwordError ? this.state.passwordErrorText : ""} 
                                        onChange={this.handleChange} /><br /><br />
                                            
                                    <TextField size="small" focused style={{ width: "60%" }} name="signUpConfirmPassword" type="password" label="Confirm Password" value={this.state.signUpConfirmPassword} 
                                        error={this.state.passwordError} helperText={this.state.passwordError ? this.state.passwordErrorText : ""} 
                                        onChange={this.handleChange} /><br /><br />
                                    
                                    <Button disabled={this.state.disableSubmit} className="sign-up-button" variant="contained" onClick={this.signUp}>Sign Up</Button>
                                    
                                    {(this.state.status !== "" && !this.state.status) &&
                                        <div>
                                            <br />
                                            <span style={{color: "red"}}>{this.state.message}</span>
                                        </div>
                                    }
                                </div>
                            }

                            {this.state.tabValue === 2 &&
                                <div className="login-background">
                                    <TextField focused style={{ width: "60%" }} name="forgotEmail" 
                                        type="email" label="Email" value={this.state.forgotEmail} onChange={this.handleChange} /><br /><br />
                                    <Button disabled={this.state.disableSubmit} variant="contained" onClick={this.forgot}>Reset Password</Button>
                                    
                                    {(this.state.status !== "" && !this.state.status) &&
                                        <div>
                                            <br />
                                            <span style={{color: "red"}}>{this.state.message}</span>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Homepage