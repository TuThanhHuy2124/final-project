import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../api"
import { modifyDate } from "./Home"
import Upvote from "../components/Upvote"
import "./PostDetails.css"

function PostDetail() {
    const { id } = useParams();
    const [comments, setComments] = useState([])
    const [data, setData] = useState({
        id: null,
        created_at: null,
        title: null,
        context: null,
        upvotes: null,
        comments: null
    });
    
    
    useEffect(() => {
        const fetchPost = async () => {
            const post = await supabase
                        .from("Posts")
                        .select()
                        .eq("id", id);
            console.log(post);
            setData(post.data[0]);
            setComments(post.data[0].comments);
        }

        fetchPost();
    }, [])

    const postComment = async (e) => {
        e.preventDefault();
        console.log(e)
        const comment = e.target[0].value;
        const newComments = [...comments, comment];
        if(comment !== "") {
            setComments(newComments)
            await supabase
                 .from("Posts")
                 .update({ comments: newComments })
                 .eq("id", id)
        }
        e.target[0].value = "";
    }

    const deletePost = async (e) => {
        console.log(e);
        e.preventDefault();
        await supabase
             .from("Posts")
             .delete()
             .eq("id", id)
        window.location.href = "/"
    }

    return (
        <>
        {
            (data.created_at !== null) &&
            <div className="center-setter">
                <div className="post-details-container">
                    <div className="modify-post">
                        <button className="delete-post-button" onClick={deletePost}>Delete</button>
                        <Link to={"/edit/" + id}>
                            <button className="edit-post-button">Edit</button>
                        </Link>
                    </div>
                    <p className="date">{modifyDate(data.created_at)}</p>
                    <h2 className="title-details">{data.title}</h2>
                    <h3 className="context-details">{data.context}</h3>
                    <Upvote id={id} upvotes={data.upvotes}/>
                    <div className="response-section">
                        <h3 className="comment-title">Comments:</h3>
                        <ul className="comments-container">
                            {comments.map((comment, i) => <li key={i} className="comment">{comment}</li>)}
                        </ul>
                        <form className="comment-area" onSubmit={postComment}>
                            <textarea placeholder="Comment"></textarea>
                            <button>Post</button>
                        </form>
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default PostDetail