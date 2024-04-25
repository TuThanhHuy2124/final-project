import { useEffect, useState } from "react";
import { supabase } from "../api";
import { useParams } from "react-router-dom";

function Edit() {
    const { id } = useParams()
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
                              .eq("id", id)
            setData(post.data[0])
        }

        fetchPost()
    }, [])

    const editPostInfo = async (title, context) => {
        if(title === "" || context === "") { window.alert("Missing information"); }
        else {
            await supabase
                 .from("Posts")
                 .update({title: title, context: context})
                 .eq("id", id)
            window.alert("Post has been editted");
            window.location.href = "/";
        }
    }

    const handleForm = (e) => {
        e.preventDefault();
        const [inputTitle, inputContext] = [e.target[0].value, e.target[1].value];
        editPostInfo(inputTitle, inputContext);
    }

    return (
        <form onSubmit={handleForm}>
            <label htmlFor="title-input">Title:</label>
            <input type="text" className="title-input" name="title-input" placeholder={data.title}/>
            <label htmlFor="context-input">Additional Details:</label>
            <input type="text" className="context-input" name="context-input" placeholder={data.context}/>
            <button>Edit</button>
        </form>
    )
}

export default Edit