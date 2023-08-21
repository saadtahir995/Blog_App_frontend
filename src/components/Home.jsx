import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/Home.css";
import CommentBox from "./CommentBox";
import BlogPostMaker from "./BlogPostMaker";
import { IoIosCreate } from "react-icons/io";
import { BiUserCircle, BiLogOut } from "react-icons/bi";
import Profile from "./Profile";
import { AiFillLike,AiFillEdit} from "react-icons/ai";
import { FaComments } from "react-icons/fa";
import Navbar from "./Navbar";
import { useMediaQuery } from "react-responsive";
import DeleteConfirmation from "./DeleteConfirmation";
import 'react-loading-skeleton/dist/skeleton.css'
import BlogPostSkeleton from "./BlogPostSkeleton";
import PostedTime from "./PostedTime";
import HandleLikeDelete from './Functions/likedel.js'
import { MdOutlineDarkMode } from 'react-icons/md';
import jwt_decode from "jwt-decode";
import { set } from "date-fns";

export default function Home() {
  const navigate = useNavigate();
  const [Postmsg, setPostmsg] = useState("");
  const [Username, setUsername] = useState("");
  const [Id, setId] = useState();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userdata, setUserData] = useState({
    username: "",
    userid: "",
  });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    } else {
      const token=localStorage.getItem("token");
    const decoded=jwt_decode(token);
    setUserData({username:decoded.username,userid:decoded.id})
    setId(decoded.id);
      dispatch({
        type: "Personalizedname",
        payload: decoded.username,
      });
    }
    
    const storedDarkMode = JSON.parse(localStorage.getItem("isDarkMode"));
    setIsDarkMode(storedDarkMode);
    
    return () => {
      document.body.style.backgroundColor = null;
      document.body.style.color = null;
    }

    //api call to get all posts
  }, []);
  useEffect(() => {
    const fetchPosts = async () => {
      const id = userdata.userid;
      const url = `https://blog-app-backend-peach.vercel.app/api/blog/getallposts/${id}`;
      const response = await fetch(url, { credentials: "include" });
      const data = await response.json();
      setTimeout(() => {
        dispatch({ type: "LOADINGOFF" });
      }, 2000);
      dispatch({ type: "PostData", payload: data.rows });
    };
    if(userdata.userid){
    fetchPosts();}
  }, [userdata]);
  const HandlePostSubmit = async (postData) => {
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ postData }),
    };
    const url = "https://blog-app-backend-peach.vercel.app/api/blog/postmaker";
    const response = await fetch(url, options);
    const data = await response.json();

    setPostmsg(data.message);
  };

  const InitialState = {
    isLoggedin: false,
    isLoading: true,
    error: false,
    ShowComments: false,
    ShowPostMake: false,
    ShowProfile: false,
    Personalizedname: "",
    PostData: [],
    PostShowcomments: Array.from({ length: 1000 }, () => false),
    isLiked: Array.from({ length: 1000 }, () => false),
    ShowEdit: Array.from({ length: 1000 }, () => false),
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        return { ...state, isLoggedin: true, isLoading: false, error: false };
      case "LOADINGOFF":
        return { ...state, isLoading: false, error: false };
      case "ERROR":
        return { ...state, error: true, isLoading: false, isLoggedin: false };
      case "ShowComments":
        const newShowComments = [...state.PostShowcomments];
        newShowComments[action.payload] = true;
        return { ...state, PostShowcomments: newShowComments };
      case "HideComments":
        const newShowCommentss = [...state.PostShowcomments];
        newShowCommentss[action.payload] = false;
        return { ...state, PostShowcomments: newShowCommentss };
      case "ShowPostMake":
        return { ...state, ShowPostMake: true };
      case "HidePostMake":
        return { ...state, ShowPostMake: false };
      case "ShowProfile":
        return { ...state, ShowProfile: true };
      case "HideProfile":
        return { ...state, ShowProfile: false };
      case "Personalizedname":
        return { ...state, Personalizedname: action.payload };
      case "PostData":
        return { ...state, PostData: action.payload };
      case "Like":
        const newisLiked = [...state.isLiked];
        newisLiked[action.payload] = true;
        return { ...state, isLiked: newisLiked };
      case "Dislike":
        const newisLikedd = [...state.isLiked];
        newisLikedd[action.payload] = false;
        return { ...state, isLiked: newisLikedd };
      case "DeletePost":
        //const newPostData = [...state.PostData];
        //newPostData.splice(action.payload, 1)
         newPostData = state.PostData.filter((post, index) => index !== action.payload);

        return { ...state, PostData: newPostData };

      default:
        return state;
    }
  };
  const HandlePostdelete = async (postId, itemid) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    };
    const url = `https://blog-app-backend-peach.vercel.app/api/blog/deletepost/${postId}`;
    const response = await fetch(url, options);
    await response.json();
    dispatch({ type: 'DeletePost', payload: itemid })
  }

  const [state, dispatch] = useReducer(reducer, InitialState);
  const triggeroffprofile = () => {
    dispatch({ type: "HideProfile" });
  };
  const triggeronprofile = () => {
    setUsername(userdata.username);
    setId(userdata.userid);
    dispatch({ type: "ShowProfile" });
  };
  useEffect(() => {
    if (Postmsg) {
      setTimeout(() => {
        setPostmsg("");
      }, 5000);
    }
  }, [Postmsg]);

  return (
<div className={`${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {state.isLoading ? (
        <BlogPostSkeleton />
      ) : (
        <>
          {state.ShowProfile ? (
            <Profile username={Username} triggeroff={triggeroffprofile} userid={Id}/>
          ) : (
            <>
              
                <Navbar triggeron={triggeronprofile} />
                <div>
                <div className="toggle-button-container">
  <MdOutlineDarkMode
    className={`dark-mode-icon ${isDarkMode ? "dark-mode" : "light-mode"}`}
    onClick={() => {setIsDarkMode(!isDarkMode)
      localStorage.setItem("isDarkMode", JSON.stringify(!isDarkMode));
    }}
  />
</div>
                <h1 className="text-center mt-3">
                  Welcome {state.Personalizedname}
                </h1>
                <IoIosCreate
                  style={{ width: "4rem", height: "4rem", marginLeft: "6%" }}
                  onClick={() => {
                    if (state.ShowPostMake) {
                      dispatch({ type: "HidePostMake" });
                    } else {
                      dispatch({ type: "ShowPostMake" });
                    }
                  }}
                />
                {Postmsg && (
                  <div className="alert alert-success" role="alert">
                    {Postmsg}
                  </div>
                )}
                {state.ShowPostMake ? (
                  <BlogPostMaker onSubmit={HandlePostSubmit}uid={userdata.userid}/>
                ) : null}
                <BiLogOut
                  style={{
                    position: "absolute",
                    top: isMobile ? "2.5%" : "3%",
                    left: isMobile ? "91%" : "95%",
                    width: "2rem",
                    height: "2rem",
                    color:'white'
                  }}
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/");
                  }}
                />
                <div className="container mt-3">
                  <div className="d-flex flex-column align-items-center">
                    {state.PostData.map((item, index) => {
                      const commentcountadd=()=>{
                        item.comment_count=item.comment_count+1;
                      }
                      const commentcountsub=()=>{
                        item.comment_count=item.comment_count-1;
                      }
                      return (
                        <>
                          <div className="col-sm-6" key={index+1}>
                            <div className="card" key={index+2}>
                            <div className={`card-body ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
                                {item.author_id ==
                                  userdata.userid ? (
                                  <>
                                    <DeleteConfirmation onDelete={HandlePostdelete} postId={item.post_id} itemid={item._id} />
                                    <AiFillEdit style={{height:'2rem',width:'2rem'}} onClick={()=>{
                                      navigate(`/editpost/${item.post_id}`)

                                    }}/>

                                  </>
                                ) : null} <br />
                                Posted : <PostedTime publishDate={item.published_date} />
                                <h6 className="card-title">
                                  <BiUserCircle
                                    style={{
                                      width: "1.9rem",
                                      height: "1.9rem",
                                    }}
                                    onClick={() => {
                                      setUsername(item.username);
                                      setId(item.author_id);
                                      dispatch({ type: "ShowProfile" });
                                    }}
                                  />
                                  {item.username}#{item.author_id}
                                </h6>
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text" style={{color: isDarkMode&&'white'}}>{item.content}</p>
                                <span>Comments:{item.comment_count}</span>
                                <FaComments
                                  style={{
                                    width: isMobile ? "10%" : "7%",
                                    height: isMobile ? "10%" : "7%",
                                  }}
                                  onClick={() => {
                                    if (state.PostShowcomments[index]) {
                                      dispatch({
                                        type: "HideComments",
                                        payload: index,
                                      });
                                    } else {
                                      dispatch({
                                        type: "ShowComments",
                                        payload: index,
                                      });
                                    }
                                  }}
                                />
                                <span>Likes:{item.like_count}</span>{" "}
                                <AiFillLike
                                  style={{
                                    width: isMobile ? "10%" : "7%",
                                    height: isMobile ? "10%" : "7%",
                                    color: item.is_liked_by_current_user || state.isLiked[index]
                                      ? "blue"
                                      : null,
                                  }}
                                  onClick={() => {
                                    const options = {
                                      method: "POST",
                                      headers: {
                                        "Content-type": "application/json",
                                      },
                                      credentials: "include",
                                      body: JSON.stringify({
                                        postId: item.post_id,
                                        authorid: userdata.userid,
                                      }),
                                    };
                                    const url =
                                      "https://blog-app-backend-peach.vercel.app/api/blog/addlike";
                                    fetch(url, options)
                                      .then((response) => response.json())
                                      .then((data) => {
                                        if (data.message === "Already Liked") {
                                          item.is_liked_by_current_user=0;
                                          dispatch({"type":"Dislike","payload":index})

                                          item.like_count = item.like_count - 1;
                                          HandleLikeDelete(item.post_id,userdata.userid,)
                                        } else {
                                          dispatch({"type":"Like","payload":index})
                                          item.like_count = item.like_count + 1;
                                        }
                                      });
                                  }}
                                />
                                {state.PostShowcomments[index] ? (
                                  <CommentBox postId={item.post_id} commentcountadd={commentcountadd} commentcountsub={commentcountsub}
                                  Uid={userdata.userid}
                                  Uname={userdata.username}
                                  />
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <br />
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
