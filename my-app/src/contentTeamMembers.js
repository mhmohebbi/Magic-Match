import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { Typography } from 'antd';
import { Layout } from 'antd';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Carousel from './Carousel'
import { Modal } from 'antd';
import { Container, Col, Row, Image } from 'react-bootstrap';
import Form from "./registrationForm"
import Profile from './userProfile'
import ChatBot from 'react-simple-chatbot';
import 'antd/dist/antd.css';

class C extends Component {
    render(){
        var members = this.props.Members.reduce((total, m)=> {
            total.push(<Col style={{paddingTop: "20px"}} md="6"> 
                            <Profile userName={m.userName} firstName={m.firstName} lastName={m.lastName}
                                pic={m.pic}/>
                        </Col>)
            return total
        }, [])
        return(
            <Container style={{paddingTop: "50px"}}>
                    {/* <h1> ${this.props.MembersRequired} </h1> */}
                     <Row className="justify-content-md-center">
                      {members}
                    </Row>
            </Container>
        )
    }
}

export default C