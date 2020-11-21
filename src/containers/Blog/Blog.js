import React, { Component } from "react";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";
import axios from "axios";

class Blog extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.data = [];
  //   }

  state = {
    posts: []
  }

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((response) => {
      console.log(response);
      this.setState({
        posts: response.data.slice(0, 4).map(i => {
          return {
            ...i,
            author: "Sruba"
          }
        })
      });
    });
  }

  render() {
    const posts = this.state.posts.map(i => <Post key={i.id} title={i.title} author={i.author} />);

    return (
      <div>
        <section className="Posts">
          {posts}
        </section>
        <section>
          <FullPost />
        </section>
        <section>
          <NewPost />
        </section>
        {/* {JSON.stringify(this.data)} */}
      </div>
    );
  }
}

export default Blog;
