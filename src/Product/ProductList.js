import React, { Component } from 'react';
import axios from 'axios';
import { makeStyles, withStyles, createTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import red from '@material-ui/core/colors/red';
import images from "./images";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));


class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  
  componentDidMount() {
    var self = this;
    axios.get(process.env.REACT_APP_BE_URL + 'all-listings', {
      headers: {
        'Authorization': `Bearer ${this.props.token}` 
      }
    }).then(function(response){
      self.setState({ products: [...response.data.data]});
    });
  }

  handleChatClick(id,e) {
    var self = this;
    var data = {
      'listing_id' : id
    };

    axios.post(process.env.REACT_APP_BE_URL + 'startChat', data, {
      headers: {
        'Authorization': `Bearer ${this.props.token}` 
      }
    }).then(function(response){
      self.props.setActive('chat', response.data.data.chat_id)
    });
  }



  render() {
    const theme = createTheme({
      palette: {
        primary: red,
      },
    });
    const styles = {
        card: {
          minWidth:100,
          maxWidth: 365,
          padding: theme.spacing(2),
          textAlign: 'center',
          color: theme.palette.secondary.dark,
          media: {
            height: 200,
          }
        }
      };
    return (
        <Container>
          <Grid container spacing={1}>
          {this.state.products.map(product => {
            let image = images["p" + product.listing_id];
            return (
                  <Grid item xs={12} sm={4} key={product.listing_id}>
                    <Card className={String(product.listing_id)} style = {styles.card}>
                      <CardActionArea>
                        <CardMedia
                          component = "img"
                          className={String(product.listing_id)}
                          title={product.title}
                          style = {styles.card.media}
                          image = {image}
                          
                        >
                        </CardMedia>
                        <CardContent>
                          <Typography gutterBottom variant="h3" component="h2">
                            {product.title}
                          </Typography>
                          <Typography variant="h4" color="textPrimary" component="h4">
                            ${product.price}<br></br>
                            Category: {product.category}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                            {product.description}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                            Listing By: {product.username}<br></br>
                            Listed Date: {product.listed_date}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button size="small" color="primary" onClick={this.handleChatClick.bind(this,product.listing_id)}>
                          Chat
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
            );
          })}
          </Grid>
        </Container>
    );
  }
}


export default withStyles(useStyles)(ProductList);



