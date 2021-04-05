import React from "react";

function Comment(props) {
  console.log(" 커멘트 프롭스", props);
  return (
    <div style={{ width: "85%", margin: "2rem auto" }}>
      <h2>Replies</h2>
      <hr />

      {props.commentLists &&
        props.commentLists.map((comment, index) => {
          !comment.responseTo && (
            <>
              <SingleComment
                refreshFunction={props.refreshFunction}
                comment={comments}
                postId={videoId}
              />
              <ReplyComment
                refreshFunction={props.refreshFunction}
                parentCommentId={comments._id}
                commentLists={props.commentLists}
                postId={videoId}
              />
            </>
          );
        })}
    </div>
  );
}

export default Comment;
