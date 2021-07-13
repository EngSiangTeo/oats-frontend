import React from "react";
import "./ChatList.css";
export default ({ chats }) => (
  <ul>
    {chats.map(chat => {
      return (
        <div>
          <div className="row show-grid">
            <div className="col-xs-12">
              <div className="chatMessage">
                <div className="box">
                  <p><b>{chat.username}</b></p>
                  <p>{chat.message}</p>
                </div>
                <div className="imageHolder">
                {/*{<img src={avatar} className="img-responsive avatar" alt="logo" />}*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    })}
  </ul>
);