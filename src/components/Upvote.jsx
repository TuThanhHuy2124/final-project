import { useEffect, useState } from "react"
import { supabase } from "../api";
import "./Upvote.css"

// eslint-disable-next-line react/prop-types
function Upvote({ id, upvotes }) {
    const [upvoteCount, setUpvoteCount] = useState(upvotes);
    useEffect(() => {setUpvoteCount(upvotes)}, [upvotes])

    const handleUpvote = async (e) => {
        e.preventDefault();
        const newUpvote = upvoteCount + 1;
        console.log(newUpvote)
        setUpvoteCount(newUpvote);
        await supabase
             .from("Posts")
             .update({ upvotes: newUpvote })
             .eq("id", id);
    }

    return (
        <div className="upvote-container">
            <p>❤️</p>
            <button className="upvote" onClick={handleUpvote}>{upvoteCount}</button>
        </div>
    )
}

export default Upvote