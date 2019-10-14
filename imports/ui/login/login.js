import React, { Component } from 'react';
import './styles/login.css';
import {Users} from "../../api/mongoSettings";
import { Redirect } from 'react-router';
import Swal from 'sweetalert2';

export default class login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            logFunc: this.props.logFunc,
            logueado: this.props.logueado
        };
        this.changeValue = this.changeValue.bind(this);
        this.signIn = this.signIn.bind(this);
    }

    changeValue(e) {
        if (e.target.id === "username") {
            this.setState({
                username: e.target.value
            });
        } else if(e.target.id === "password") {
            this.setState({
                password: e.target.value
            });
        }
    }

    signIn(){
        let user = Users.findOne({username: this.state.username});
        if(user!=null){
            if (this.state.password == user.password){
                this.setState({
                    username: user.username,
                    logueado: true
                });
                this.state.logFunc(user)
                Swal.fire({
                    type: 'success',
                    title: 'Bienvenido de nuevo ' + user.username,
                    text: 'Diviertete en nuestra plataforma!',
                    timer: 3000
                })
            }
            else
                console.log("Username or password incorrect");
        }
        else
            console.log("Username or password incorrect");
    }

    render() {
        if (this.state.logueado) {
            return <Redirect push to="/" />;
        }
        return (
            <div className="container login-container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 login-form">
                        <h3>Ingresar</h3>

                        <div className="form-group">
                            <input id="username" type="text" className="form-control login-form-control" placeholder="Username " onChange={this.changeValue} required
                                   title="Completa este campo."/>
                        </div>
                        <div className="form-group">
                            <input id="password" type="password" className="form-control login-form-control" placeholder="Password " onChange={this.changeValue} required
                                    title="Completa este campo."/>
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btnSubmit" value="Login" onClick={this.signIn}/>
                        </div>
                        <div className="form-group">
                            <a href="#" className="btnForgetPwd">Forget Password?</a>
                        </div>

                    </div>
                    <div className="logo" />
                </div>
            </div>
        )
    }
}

