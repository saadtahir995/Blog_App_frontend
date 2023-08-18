import {React,useEffect} from 'react';
import Skeleton from 'react-loading-skeleton';

const BlogPostSkeleton = () => {
  const isDarkMode = JSON.parse(localStorage.getItem("isDarkMode"));
  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? "#333333" : "white";
  }, [isDarkMode]);
  return (
    <div className="card"style={{ backgroundColor:isDarkMode&&'#242121'}}>
      <div className="card-body">
        <Skeleton height={20} width="50%" baseColor={isDarkMode&&'#333333'} highlightColor={isDarkMode&&'rgb(44 41 41)'} />
        <Skeleton height={30} width="100%" style={{ marginTop: '10px' }} baseColor={isDarkMode&&'#333333'} highlightColor={isDarkMode&&'rgb(44 41 41)'} />
        <Skeleton count={13} style={{ marginTop: '10px' }} baseColor={isDarkMode&&'#333333'} highlightColor={isDarkMode&&'rgb(44 41 41)'} />
        <Skeleton height={200} width="100%" style={{ marginTop: '10px' }} baseColor={isDarkMode&&'#333333'} highlightColor={isDarkMode&&'rgb(44 41 41)'} />
        <div className="d-flex justify-content-between">
          <div>
            <Skeleton height={20} width="50%" baseColor={isDarkMode&&'#333333'} highlightColor={isDarkMode&&'rgb(44 41 41)'} style={{ marginTop: '10px' }} />
            <Skeleton height={20} width="30%" baseColor={isDarkMode&&'#333333'} highlightColor={isDarkMode&&'rgb(44 41 41)'} style={{ marginTop: '10px' }} />
          </div>
          <div>
            <Skeleton height={20} width="30%" baseColor={isDarkMode&&'#333333'} highlightColor={isDarkMode&&'rgb(44 41 41)'} style={{ marginTop: '10px' }} />
            <Skeleton height={20} width="30%" baseColor={isDarkMode&&'#333333'} highlightColor={isDarkMode&&'rgb(44 41 41)'} style={{ marginTop: '10px' }} />
          </div>
          
        </div>
      </div>
    </div>
  );
};


export default BlogPostSkeleton;
