import Upvote from "./Upvote"
import "./Post.css"

// eslint-disable-next-line react/prop-types
function Post({ id, title, upvotes, created_at }) {
    return (
        <div className="post">
            <p>{created_at}</p>
            <h2 className="title">{title}</h2>
            <Upvote id={id} upvotes={upvotes}/>
            <button onClick={() => {window.location.href = `/post-detail/${id}`}}>More details</button>
        </div>
    )
}

export default Post