import { supabase } from "../api";
import "./Post.css"

function CreatePost() {
    
    const setPostInfo = async (title, context) => {
        if(title === "" || context === "") { window.alert("Missing information"); }
        else {
            await supabase
                 .from("Posts")
                 .insert({title: title, context: context, upvotes: 0, comments: []});
            window.alert("Post has been posted");
            window.location.href = "/";
        }
    }

    const handleForm = (e) => {
        e.preventDefault();
        const [inputTitle, inputContext] = [e.target[0].value, e.target[1].value];
        setPostInfo(inputTitle, inputContext);
    }

    return (
        <form className="create-post-container" onSubmit={handleForm}>
            <h2>Create your post</h2>
            <input type="text" className="title-input" placeholder="Title"/>
            <textarea type="text" className="context-input" placeholder="Details (Optional)"/>
            <button>Submit</button>
        </form>
    )
}

export default CreatePost