import { useState } from "react"
import { supabase } from "../api";

function CreatePost() {
    const [title, setTitle] = useState("");
    const [context, setContext] = useState("");
    
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
        <form onSubmit={handleForm}>
            <label htmlFor="title-input">Title:</label>
            <input type="text" className="title-input" name="title-input"/>
            <label htmlFor="context-input">Additional Details:</label>
            <input type="text" className="context-input" name="context-input"/>
            <button>Submit</button>
        </form>
    )
}

export default CreatePost