import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalArticles: 0,
    };
  }

  async componentDidMount() {
    this.updateNews();
  }

  updateNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9eeee78a1fb049ab899c3d9c37451594&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let response = await fetch(url);
    let data = await response.json();
    console.log(data, this.state.page);
    this.setState({
      articles: data.articles,
      totalArticles: data.totalResults,
      loading: false,
    });
  };

  handlePrevClick = async () => {
    await this.setState({
      page: this.state.page - 1,
    });
    this.updateNews();
  };

  handleNextClick = async () => {
    if (
      !(
        this.state.page + 1 >
        Math.ceil(this.state.totalArticles / this.props.pageSize)
      )
    ) {
      await this.setState({
        page: this.state.page + 1,
      });
      this.updateNews();
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: "35px 0px" }}>
          NewsPaper - Top Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles?.map((ele) => {
              return (
                <div className="col-md-3" key={ele.url}>
                  <NewsItem
                    title={ele.title ? ele.title : ""}
                    description={
                      ele.description ? ele.description.slice(0, 90) : ""
                    }
                    imageurl={ele.urlToImage ? ele.urlToImage : ""}
                    url={ele.url ? ele.url : ""}
                    author={ele.author ? ele.author : "Unknown"}
                    date={ele.publishedAt ? ele.publishedAt : ""}
                    name={ele["source"].name ? ele["source"].name : "Unknown"}
                  />
                </div>
              );
            })}
        </div>
        <div className="d-flex justify-content-center">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-light"
            align="centre"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalArticles / this.props.pageSize)
            }
            type="button"
            className="btn btn-secondary"
            align="centre"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
