import React, { Component } from 'react';
import axios from 'axios';

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
      // self.setState({ products: [...response.data.data]});
      console.log(response);
      // self.props.setActive('chat')
    });
    // this.props.setActive('chat',id);
  }

  render() {
    return (
        <section>
          {this.state.products.map(product => {
            return (
              <div key={product.listing_id}>
                <p><b>Deprioritized: {product.deprioritized.toString()}</b></p>
                <p>Product: {product.listing_id}</p>
                <p>Title: {product.title}</p>
                <p>Description: {product.description}</p>
                <p>Category: {product.category}</p>
                <p>Price: {product.price}</p>
                <p>Listing By: {product.username}</p>
                <p>Date: {product.listed_date}</p>
                <button onClick={this.handleChatClick.bind(this,product.listing_id)}>Chat with User</button>
              </div>
            );
          })}
        </section>
    );
  }
}

export default ProductList;