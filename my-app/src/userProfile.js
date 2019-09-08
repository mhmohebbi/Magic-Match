import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import 'antd/dist/antd.css';

var cardStyle = {
    maxWidth: "35%",
    marginRight: "auto",
    marginLeft: "auto",
  }

  var cardMediaStyle = {
    paddingTop: "30.25%",
    width: "50%",
    marginRight: "auto",
    marginLeft: "auto",
  }

class Profile extends Component {
    render(){ 
        return (
                <Card style={cardStyle}>
                    <CardContent>
                        <CardMedia
                            style={cardMediaStyle}   
                            image={this.props.pic}
                        />
                        <Typography variant="h5" component="h2">
                            {this.props.userName}
                        </Typography>
                        <Typography variant="body2" component="p">
                            First Name: {this.props.firstName}
                        </Typography>
                        <Typography variant="body2" component="p">
                            Last Name: {this.props.lastName}
                        </Typography>
                    </CardContent>
                </Card>
        )
    }
}

export default Profile