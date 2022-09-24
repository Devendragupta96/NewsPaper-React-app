import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageurl, url, author, date, name } = this.props;

    return (
      <div className="my-3">
        <div className="card" style={{ position: "relative" }}>
          <img
            src={
              !imageurl
                ? "https://icon-library.com/images/not-found-icon/not-found-icon-28.jpg"
                : imageurl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h6 className="card-title">
              {title}

              <span className="category position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                {name}
              </span>
            </h6>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                By {author} on {new Date(date).toGMTString()}
              </small>
            </p>
            <a href={url} className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
