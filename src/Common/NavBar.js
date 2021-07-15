import React, { Component } from 'react';

class NavBar extends Component {

  handleChatClick(page, e) {
    this.props.setActive(page);
  }

  render() {
    return (
        <section>
          <div >
            <button onClick={this.handleChatClick.bind(this,'product')}>Products</button>
            <button onClick={this.handleChatClick.bind(this,'conversation')}>Chats</button>
          </div>
        </section>
    );
  }
}

export default NavBar;