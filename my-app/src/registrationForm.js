import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import {Modal, Form, Input, Radio } from 'antd';

const RegistrationForm = Form.create({name: 'form_in_modal'})(

    class extends React.Component {
        constructor(props){
            super(props)
            this.state = {
                userName: "",
                email: "",
                firstName: "",
                lastName: ""
            }
        }

        userNameChangeHandler = e => {
            this.setState({
                userName: e.target.value,
            })
        }

        emailChangeHandler = e => {
            this.setState({
                email: e.target.value,
            })
        }

        firstNameChangeHandler = e => {
            this.setState({
                firstName: e.target.value,
            })
        }

        lastNameChangeHandler = e => {
            this.setState({
                lastName: e.target.value,
            })
        }

        submitHandler = e => {
            e.preventDefault()
            console.log("Called")
            this.setState({
                userName: "",
                email: "",
                firstName: "",
                lastName: ""
            })
            this.props.onOk(this.state)
        }

        render() {
            const { visible, onCancel, form } = this.props;
            const { getFieldDecorator } = form;
                return (
                    <Modal
                        visible={visible}
                        title="Registration Form"
                        okText="Register"
                        onCancel={onCancel}
                        onOk={this.submitHandler}
                    >
                        <Container fixed>
                            <form>  
                                <TextField id="standard-title" name="username" label="Username" 
                                    value={this.state.userName} onChange={this.userNameChangeHandler}
                                    margin="normal" />
                                <br></br>
                                <TextField id="standard-location" name="location" label="Email" 
                                    value={this.state.email} onChange={this.emailChangeHandler}
                                    margin="normal" />
                                <br></br>
                                <TextField id="standard-price-per-day"  name="price-per-day" label="First Name" 
                                    value={this.state.firstName} onChange={this.firstNameChangeHandler}
                                    margin="normal" />
                                <br></br>
                                <TextField id="standard-pic" name="pic" label="Last Name" 
                                    value={this.state.lastName} onChange={this.lastNameChangeHandler}
                                    margin="normal" />
                                <br></br>
                                </form>
                        </Container>
                    </Modal>
                    );
                }

    }   
    
)

export default RegistrationForm