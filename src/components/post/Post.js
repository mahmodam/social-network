import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getPost } from "../../actions/post";
import Spinner from "../layout/Spinner/Spinner";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

function Post({ getPost, ...props }) {
  const { id } = useParams();

  useEffect(() => {
    getPost(id);
  }, [getPost, id]);

  return (
    <>
      {props.post.loading || props.post.post === null ? (
        <Spinner />
      ) : (
        <>
          <Link to="/posts" className="btn">
            Back To Posts
          </Link>
          <div className="post bg-white p-1 my-1">
            <div>
              <Link to={`/profile/${props.post.post.user}`}>
                <img
                  className="round-img"
                  src={props.post.post.avatar}
                  alt=""
                />
                <h4>{props.post.post.name}</h4>
              </Link>
            </div>
            <div>
              <p className="my-1">{props.post.post.text}</p>
              <p className="post-date">
                Posted on{" "}
                <Moment format="YYYY/MM/DD">{props.post.post.date}</Moment>
              </p>
            </div>
          </div>
          <CommentForm postId={props.post.post._id} />
          <div className="comments">
            {props.post.post.comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                postId={props.post.post._id}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
