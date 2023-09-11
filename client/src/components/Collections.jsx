import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeeds } from "../sanity";
import { SET_FEED } from "../context/actions/feedActions";
import Spinner from "./Spinner";
import MasonaryLayout from "./MasonaryLayout";

const Collections = () => {
  const [isLoading, setIsLoading] = useState(false);
  const feeds = useSelector((state) => state.feeds);
  const user = useSelector((state) => state.user);
  const [saved, setSaved] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!feeds) {
      setIsLoading(true);
      fetchFeeds().then((data) => {
        console.log(data);
        dispatch(SET_FEED(data));
        setInterval(() => {
          setIsLoading(false);
        }, 2000);
      });
    }
  }, []);

  useEffect(() => {
    if (feeds && saved.length === 0) {
      feeds?.forEach((feed) => {
        feed?.collections?.forEach((colc) => {
          if (colc._id === user?.uid) {
            setSaved((prevArray) => [...prevArray, feed]);
          }
        });
      });
    }
  }, []);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-start">
      {isLoading ? <Spinner /> : <MasonaryLayout feeds={saved} />}
    </div>
  );
};

export default Collections;
