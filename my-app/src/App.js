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
import ContentTeamMembers from './contentTeamMembers'
import ContentImages from './contentImages'
import ChatBot from 'react-simple-chatbot';
import axios from 'axios'; 
import 'antd/dist/antd.css';
import fs from 'fs';

class App extends React.Component {

  constructor(props){
    super(props)
  }

  state = { visible1: false, 
            visibleUsersList: false, 
            user: null, 
            visibleForm: false,
            userResponses: [],
            showTeamMembers: false, 
          };

  showModal = () => {
    console.log("Modal on click called!")
    this.setState((state) => {
      return {...state, visible: true}
    });
  };

  showRegistrationForm = () => {
    console.log("Handler called")
    this.setState((state) => {
      return {...state, visibleForm: true}
    });
  }

  showUsersList = () => {
    this.setState((state) => {
      return {...state, showTeamMembers: !this.state.showTeamMembers, visibleUsersList: false}
    }, ()=> {
      console.log(this.state)
    });
  }

  handleOk = () => {
    this.setState((state) => {
      return {...state, visible: false, informationAdded: true}
    });
  };

  handleOKRegistrationForm = u => {
    this.setState((state) => {
      return {...state, visibleForm: false, user: u}
    });
  }

  handleOKShowUsersList = () => {
    this.setState((state) => {
      return {...state, visibleUsersList: false}
    });
  }

  handleCancel = e => {
    console.log(e);
    this.setState((state) => {
      return {...state, visible: false}
    });
  };

  handleCancelRegistrationForm = e => {
    console.log("Registration Form should be cancelled")
    this.setState((state) => {
      return {...state, visibleForm: false}
    });
  }

  handleCancelUsersList = () => {
    this.setState((state) => {
      return {...state, visibleUsersList: false}
    });
  }

  delay = (t, v) => {
    return new Promise(function(resolve) { 
        setTimeout(resolve.bind(null, v), t)
    });
 }

  handleEnd = () => {
    this.delay(2 * 1000)
    .then(() => {
      var body =  {
        firstName: this.state.user.firstName, 
        lastName: this.state.user.lastName,
        username: this.state.user.userName,
        responses: this.state.userResponses
      }
      console.log(body)
      this.handleOk()
    })
  }

  render(){
    var conditionalButton; 
    if ((this.state.user) && (!this.state.informationAdded)){
      conditionalButton = <div>
                              <Button onClick={this.showModal} variant="contained" color="primary" style={{padding: "10px", margin: "10px"}}>
                                Tell us more about Yourself 
                              </Button>
                              <Button variant="contained" color="primary" onClick={this.showUsersList} style={{padding: "10px", margin: "10px"}}>
                                Find your Team Members
                              </Button>
                          </div>
    } else if (this.state.user) { 
      conditionalButton = <div>
                            <Button variant="contained"  onClick={this.showUsersList} color="primary" style={{padding: "10px", margin: "10px"}}>
                              Find your Team Members
                            </Button>
                          </div>
    } else {
      conditionalButton = <Button onClick={this.showRegistrationForm} variant="contained" color="primary" style={{padding: "10px", margin: "10px"}}>
                            Sign-In
                          </Button>
    }
    var avatar = null; 
    if (this.state.user){
      avatar = <Container style={{maxWidth: "1000px"}}>
                  <Profile userName={this.state.user.userName} firstName={this.state.user.firstName} lastName={this.state.user.lastName} 
                            pic="http://tss.edu.au/wp-content/uploads/2018/01/avatar.b6a87.png"
                  />
                </Container>
    }

    var firstName = this.state.user ? this.state.user.firstName : null; 

    var userRandos = [{userName: "Poppy", firstName: "Drake", lastName: "Mahbed", pic: "https://studybreaks.com/wp-content/uploads/2018/01/Drake-1.jpg"}, 
                  {userName: "JB", firstName: "Justin", lastName: "Beiber", pic: "https://www.justinbiebermusic.com/wp-content/themes/justinbieber2/images/bieber-news.png"}, 
                  {userName: "Maggie", firstName: "Megan", lastName: "Fox", pic: "https://m.media-amazon.com/images/M/MV5BMTc5MjgyMzk4NF5BMl5BanBnXkFtZTcwODk2OTM4Mg@@._V1_UY1200_CR105,0,630,1200_AL_.jpg"}]

    var users = [{userName: "Ibra", firstName: "Zlatan", lastName: "Ibrah", pic: "https://studybreaks.com/wp-content/uploads/2018/01/Drake-1.jpg"}]

    var content = <ContentImages />

    if ((this.state.showTeamMembers) && (!this.state.informationAdded)){
      content = <ContentTeamMembers Members={userRandos} />
    } else if (this.state.showTeamMembers){
      content = <ContentTeamMembers Members={userRandos.slice(0, this.state.userResponses[2])} />
    }

    var title = !this.state.user ? <Typography variant="h1" component="h2" style={{color: "white", padding:"10px", marginTop: "40px"}} gutterBottom> Magic Match </Typography> : null
    return (
      <div className="App">
            {title}
            {conditionalButton}
            <Modal
              title="Basic Modal"
              visible={this.state.visible}
              onCancel={this.handleCancel}
              footer={null}
            >
              <ChatBot
                handleEnd={this.handleEnd}
                steps={[
                  {
                    id: '1',
                    message: `How are you doing today ${firstName} ?`,
                    trigger: '2',
                  },
                  {
                    id: '2',
                    user: true, 
                    trigger: '3',
                  },
                  {
                    id: '3',
                    message: `So ${firstName}, are you excited for Hack the 6ix?`,
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
            </Modal>
            <Modal
              visible={this.state.visibleUsersList}
              onOk={this.handleOKShowUsersList}
              onCancel={this.handleCancelUsersList}
            />
            <Form
              visible={this.state.visibleForm}
              onOk={this.handleOKRegistrationForm}
              onCancel={this.handleCancelRegistrationForm}
            />
            {avatar}
            {content}
      </div>
    );
  }
}

export default App;
