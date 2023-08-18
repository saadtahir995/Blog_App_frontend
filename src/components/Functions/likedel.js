const likedel=(postid,userid)=>{
    const url=`https://blog-app-backend-peach.vercel.app/api/blog/deletelike/${postid}/${userid}`;
    return fetch(url,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'include'
    })
    .then(res=>res.json())
    .then(data=>data)
    .catch(err=>console.log(err));
}
export default likedel;