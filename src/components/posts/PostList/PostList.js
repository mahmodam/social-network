import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPosts } from "../../../actions/post";
import Spinner from "../../layout/Spinner/Spinner";
import PostForm from "../PostForm/PostForm";
import PostItem from "../PostItem/PostItem";

function PostList({ getPosts, post: { posts, loading } }) {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="large text-primary">Posts</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Welcome to the community
          </p>
          <PostForm />
          <div className="posts">
            {posts.map((post) => (
              <PostItem key={post._id} post={post} />
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

export default connect(mapStateToProps, { getPosts })(PostList);
