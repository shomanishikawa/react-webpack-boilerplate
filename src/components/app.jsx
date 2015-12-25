import React from 'react';

const data = [
  {id: 1, author: "Sddhoma Nishikawa", text: "This is one comment"},
  {id: 2, author: "Jrdan dfdf", text: "This is *another* comment"}
];

export default class Comment extends React.Component {
  render() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    );
  }
};

export default class CommentList extends React.Component {
  render() {
    let commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
}

export default class CommentForm extends React.Component {
  render() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    )
  }
}

export default class CommentBox extends React.Component {
  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.props.data} />
        <CommentForm />
      </div>
    )
  }
}

export default class App extends React.Component {
  render() {
    return(
      <div>
        <h1>HOT TEST</h1>
        <CommentBox data={data} />
      </div>
    )
  }
}