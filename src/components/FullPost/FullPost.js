import React, { Component } from "react";
import axios from "axios";
import "./FullPost.css";

class FullPost extends Component {
  state = {
    loadedPost: null,
  };

  deletePost = () => {
    axios
      .delete(
        "https://jsonplaceholder.typicode.com/posts/" + this.state.loadedPost.id
      )
      .then((response) => {
        console.log(response);
      });
  };

  componentDidUpdate() {
    if (
      this.props.id &&
      ((this.state.loadedPost && this.state.loadedPost.id !== this.props.id) ||
        !this.state.loadedPost)
    ) {
      axios
        .get("https://jsonplaceholder.typicode.com/posts/" + this.props.id)
        .then((response) => {
          console.log(response);
          this.setState({ loadedPost: response.data });
        });
    }
  }

  render() {
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
    if (this.props.id) {
      post = <p style={{ textAlign: "center" }}>Loading!</p>;
    }
    if (this.state.loadedPost) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            <button className="Delete" onClick={this.deletePost}>
              Delete
            </button>
          </div>
        </div>
      );
    }
    return post;
  }
}

export default FullPost;
