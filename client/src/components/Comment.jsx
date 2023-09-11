import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Spinner } from "../components";
import { addToComments, fetchFeedDetail, fetchFeeds } from "../sanity";
import { SET_FEED } from "../context/actions/feedActions";

const Comment = ({ feed, user, setFeed }) => {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(5);

  const dispatch = useDispatch();

  const saveComment = async (event) => {
    if (event.key === "Enter") {
      if (comment) {
        setIsLoading(true);
        setComment("");
        addToComments(feed?._id, user?.uid, comment).then(() => {
          fetchFeedDetail(feed?._id).then((newData) => {
            setFeed(newData[0]);

            fetchFeeds().then((data) => {
              dispatch(SET_FEED(data));
            });

            setInterval(() => {
              setIsLoading(false);
            }, 2000);
          });
        });
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-start justify-start gap-2">
      <div className="w-full flex gap-3 items-center justify-center">
        <img
          src="https://cdn.pixabay.com/photo/2017/10/04/07/43/autumn-2815427_960_720.jpg"
          alt=""
          className="w-16 h-16 rounded-full object-cover shadow-md"
        />
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          type="text"
          placeholder="Add your comment"
          className="w-full px-2 py-2 h-20 rounded-md shadow-inner text-base text-primary border border-gray-100"
          onKeyDown={saveComment}
        />
      </div>

      <div className="w-full flex flex-col items-center justify-center gap-2">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {feed?.comments ? (
              feed?.comments?.slice(0, index).map((msg) => (
                <div
                  key={msg._id}
                  className="w-full flex gap-3 items-start justify-start"
                >
                  <img
                    src={msg?.users?.photoURL}
                    alt=""
                    className="w-16 h-16 rounded-full object-cover shadow-md"
                  />
                  <div className="flex w-full flex-col items-start justify-start gap-2">
                    <div className="flex w-full items-center justify-between">
                      <p className="text-lg text-primary font-semibold">
                        {msg?.users?.displayName}
                      </p>

                      <p>{moment(msg?._createdAt).fromNow()}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No Comments</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
