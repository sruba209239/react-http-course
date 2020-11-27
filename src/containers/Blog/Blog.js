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
    error: false,
  };

  componentDidMount() {
    axios
      .get("/posts")
      .then((response) => {
        console.log(response);
        this.setState({
          posts: response.data.slice(0, 4).map((i) => {
            return {
              ...i,
              author: "Sruba",
            };
          }),
        });
      })
      .catch((e) => {
        this.setState({ error: true });
      });
  }

  postClickHandler = (id) => {
    this.setState({ selectedPostId: id });
  };

  render() {
    let posts = <p style={{ textAlign: "center" }}>something went wrong! </p>;
    if (!this.state.error) {
      posts = this.state.posts.map((i) => (
        <Post
          key={i.id}
          title={i.title}
          author={i.author}
          postClickHandler={() => this.postClickHandler(i.id)}
        />
      ));
    }

    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost
            id={this.state.selectedPostId}
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
