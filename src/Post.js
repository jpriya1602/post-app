import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Post(){
    const { id } = useParams()
   const [post, setPost] = useState({})
   const [isEdited, setIsEdited] = useState(false)

    useEffect(()=>{
        axios.get(`https://jsonplaceholder.typicode.com/posts?id=${id}`)
            .then(response => {
                setPost(response.data[0])
            })
            .catch(error => {
                console.log(error)
            })
    },[])

   const updatePost = async() => {
        axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, post)
            .then((response) => setPost(response.data))
            .catch(error => {
                console.log(error)
            })
   }

   return(
       <div>
           <h2>{post.title}</h2>
           <textarea style={{height:"300px",width:"600px"}} onChange={(event)=>{setPost({...post,body:event.target.value})}} value={post.body}>{post.body}</textarea>
           <br/>
           <button onClick={()=>updatePost()}>save</button>
       </div>
   )

}