import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";


export default function PostDashboard() {
    const [posts, setPosts] = useState([])
    const {id} = useParams();
    const [comments, setComments] = useState([])
    const [userMail, setUserMail] = useState('')
    const [todos, setTodos] = useState([])
    const [remove, setRemove] = useState(false)

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts?UserId=${id}`)
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/users?id=${id}`)
            .then(response => {
                console.log(response.data)
                let mail = response.data[0].email
                console.log(mail)
                setUserMail(mail)
            })
            .catch(error => {
                console.log(error)
            })

        axios.get(`https://jsonplaceholder.typicode.com/comments?email=${userMail}`)
            .then(response => {
                setComments(response.data);
            })
            .catch(error => {
                console.log(error);
            });

        axios.get(`https://jsonplaceholder.typicode.com/users/${id}/todos`)
            .then(response => {
                setTodos(response.data);
            })
            .catch(error => {
                console.log(error);
            });

    }, [posts]);


    const deletePost = async (id) => {
        await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`).then(() => {
            const newPosts = [...posts]
            setPosts(
                newPosts.filter((post) => post.id !== id)
            )
        })
    }

    return (
        <div>
            {console.log(posts.length)}
            <h1>Number of Posts: {posts.length}</h1>
            <h1>Number of Comments: {comments.length}</h1>
            <h1>Number of To dos: {todos.length}</h1>
            <h1>Post By authors</h1>
            <div>
                <ul>
                    {posts.map(post => (
                        <li key={post.id}>
                            <div style={{ display:"flex", justifyContent:"space-between", width:"800px", marginBottom:"10px"}} >
                                <a href={`/posts/${post.id}`} style={{marginRight:"10px"}}>{post.title}</a>
                                <button onClick={() => {
                                    setRemove((prev) => {
                                        return !prev
                                    });
                                    deletePost(post.id)
                                }}>delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}