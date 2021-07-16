import React, { Component } from 'react';
import axios from 'axios';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    maxWidth: 345,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    media: {
      height: 140,
    }
  },
}));

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
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
    return (
        <Container>
          <Grid container spacing={1}>
          {this.state.products.map(product => {
            return (
                  <Grid item xs={12} sm={4} key={product.listing_id}>
                    <Card className={product.listing_id}>
                      <CardActionArea>
                        <CardMedia
                          className={product.listing_id}
                          image="/images/1.jpg"
                          title={product.title}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h3" component="h2">
                            {product.title}
                          </Typography>
                          <Typography variant="h4" color="colorPrimary" component="h4">
                            ${product.price}<br></br>
                            Category: {product.category}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                            {product.description}
                          </Typography>
                          <Typography variant="body3" color="textSecondary" component="p">
                            Deprioritized: {product.deprioritized}
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



