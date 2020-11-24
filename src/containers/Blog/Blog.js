import React, { Component } from "react";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";
import axios from "axios";

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null,
  };

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((response) => {
      console.log(response);
      this.setState({
        posts: response.data.slice(0, 4).map((i) => {
          return {
            ...i,
            author: "Sruba",
          };
        }),
      });
    });
  }

  postClickHandler = (id) => {
    this.setState({ selectedPostId: id });
  };

  deletePost = () => {
    this.setState((prevState) => {
      prevState.posts.splice(
        prevState.posts.findIndex((i) => i.id === prevState.selectedPostId),
        1
      );
      return {
        selectedPostId: null,
        posts: prevState.posts,
      };
    });
  };

  render() {
    const posts = this.state.posts.map((i) => (
      <Post
        key={i.id}
        title={i.title}
        author={i.author}
        postClickHandler={() => this.postClickHandler(i.id)}
      />
    ));

    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost
            id={this.state.selectedPostId}
            deletePost={this.deletePost}
            selectedPost={this.state.posts.find(
              (i) => i.id === this.state.selectedPostId
            )}
          />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
