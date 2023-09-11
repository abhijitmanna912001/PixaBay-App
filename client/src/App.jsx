import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components";
import FeedDetail from "./components/FeedDetail";
import MainLoader from "./components/MainLoader";
import { firebaseAuth } from "./config/firebase.config";
import { HomeContainer, NewPost } from "./containers";
import SearchContainer from "./containers/SearchContainer";
import { SET_USER } from "./context/actions/userActions";
import { createNewUser } from "./sanity";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged((result) => {
      if (result) {
        console.log("User", result?.providerData[0]);
        createNewUser(result?.providerData[0]).then(() => {
          console.log("New User Created");
          dispatch(SET_USER(result?.providerData[0]));
          setInterval(() => {
            setIsLoading(false);
          }, 2000);
        });
      }
    });
  }, []);

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-start">
      {isLoading ? (
        <MainLoader />
      ) : (
        <>
          <Header />

          <main className="w-full h-full flex items-center justify-center">
            <Routes>
              <Route path="/*" element={<HomeContainer />} />
              <Route path="/newPost/*" element={<NewPost />} />
              <Route path="/feed-detail/:_id" element={<FeedDetail />} />
              <Route path="/search/:searchTerm" element={<SearchContainer />} />
            </Routes>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
