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
import ContentTeamMembers from './contentTeamMembers'
import ContentImages from './contentImages'
import 'antd/dist/antd.css';

class C extends Component {
    render(){
        return(
            <ChatBot
                handleEnd={this.handleEnd}
                steps={[
                  {
                    id: '1',
                    message: `How are you doing today ${this.props.firstName} ?`,
                    trigger: '2',
                  },
                  {
                    id: '2',
                    user: true, 
                    trigger: '3',
                  },
                  {
                    id: '3',
                    message: `So ${this.props.firstName}, are you excited for Hack the 6ix?`,
                    trigger: '4',
                  },
                  {
                    id: '4', 
                    validator: (value) => {
                      this.setState((state) => {
                        return {...state, 
                                userResponses: [...this.state.userResponses, value]
                              }
                      })
                      return true; 
                    }, 
                    user: true,
                    trigger: `5`
                  }, 
                  {
                    id: '5',
                    message: `How many team mates do you already have?`,
                    trigger: `6`
                  }, {
                    id: '6', 
                    user: true, 
                    validator: (value) => {
                      this.setState((state) => {
                        return {...state, 
                                userResponses: [...this.state.userResponses, value]
                              }
                      })
                      return true; 
                    },
                    trigger: `7`
                  },
                   {
                    id: '7', 
                    message: `Don't worry! We will help you find the rest of your team!!`,
                    trigger: `8`
                  }, 
                  {
                    id: `8`,
                    message: `How many team mates are you looking for?`,
                    trigger: `9`
                  }, 
                  {
                    id: '9',
                    validator: (value) => {
                      this.setState((state) => {
                        return {...state, 
                                userResponses: [...this.state.userResponses, value]
                              }
                      })
                      return true; 
                    },
                    user: true, 
                    trigger: '10'
                  }, 
                  {
                    id: '10', 
                    message: `What areas of technology are you interested in learning more about?`,
                    trigger:'11'
                  }, 
                  {
                    id: '11',
                    validator: (value) => {
                      this.setState((state) => {
                        return {...state, 
                                userResponses: [...this.state.userResponses, value]
                              }
                      })
                      return true; 
                    },
                    user: true, 
                    trigger: '12'
                  }, 
                  {
                    id: '12', 
                    message: 'And ... what language are you most proficient in developing with?',
                    trigger: '13', 
                  },
                  {
                    id: '13',
                    validator: (value) => {
                      this.setState((state) => {
                        return {...state, 
                                userResponses: [...this.state.userResponses, value]
                              }
                      })
                      return true; 
                    },
                    user: true, 
                    trigger: '14'
                  }, 
                  {
                    id: '14', 
                    message: 'What is your level of education to date?',
                    trigger: '15'
                  }, 
                  {
                    id: '15',
                    validator: (value) => {
                      this.setState((state) => {
                        return {...state, 
                                userResponses: [...this.state.userResponses, value]
                              }
                      })
                      return true; 
                    },
                    user: true, 
                    trigger: '16'
                  }, 
                  {
                    id: '16',
                    message: 'Tell us about your experiences developing?',
                    trigger: '17'
                  }, 
                  {
                    id: '17',
                    validator: (value) => {
                      this.setState((state) => {
                        return {...state, 
                                userResponses: [...this.state.userResponses, value]
                              }
                      })
                      return true; 
                    },
                      user: true, 
                      trigger: '18'
                  }, 
                  {
                    id: '18',
                    message: 'Yay !! Got it all!',
                    trigger: '19'
                  }, 
                  {
                    id: '19',
                    message: 'We have enough intelligence to recommend your potential Hackathon winning team!!',
                    end: true
                  }
                ]}
              />
        )
    }
}

export default C