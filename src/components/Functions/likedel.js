const likedel=(postid,userid)=>{
    const url=`http://192.168.43.52:9000/api/blog/deletelike/${postid}/${userid}`;
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