import { Component } from "react";
import "./Home.css";
import { Posts } from "../../components/Posts";
import { loadPosts } from "../../utils/load-post";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput/TextInput";

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postPerPage: 2,
    searchValue: "",
  };

  async componentDidMount() {
    await this.loadPosts();
  }
  loadPosts = async () => {
    const { page, postPerPage } = this.state;
    const postsAndPhoto = await loadPosts();
    this.setState({
      posts: postsAndPhoto.slice(page, postPerPage),
      allPosts: postsAndPhoto,
    });
  };
  loadMorePosts = () => {
    const { page, postPerPage, allPosts, posts } = this.state;
    const nextPage = page + postPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage);
    posts.push(...nextPosts);
    this.setState({ posts, page: nextPage });
  };
  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  };

  render() {
    const { posts, page, postPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postPerPage >= allPosts.length;
    const filteredPosts = !!searchValue
      ? allPosts.filter((post) => {
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
        })
      : posts;

    return (
      <section className="container">
        <div className="search-container">
          {!!searchValue && <h1>Search value: {searchValue}</h1>}
          <TextInput
            handleChange={this.handleChange}
            searchValue={searchValue}
          />
        </div>
        {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}
        {filteredPosts.length === 0 && <p>não existem post</p>}

        <div className="button-container">
          {!searchValue && (
            <Button
              text="ALGUMA COISA"
              actionButton={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}

export default Home;
