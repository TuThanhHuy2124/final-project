import { useEffect, useState } from "react"
import { supabase } from "../api"
import Post from "../components/Post"
import "./Home.css"

export const modifyDate = (dateStr) => {
        const date = new Date(dateStr);
        const formattedDate = date.toLocaleString('en-US');
        return formattedDate;
    }

function Home() {
    const [orderByCreatedTime, setOrderByCreatedTime] = useState(true);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            let fetchedPosts
            if(orderByCreatedTime) {
                fetchedPosts = await supabase
                                    .from("Posts")
                                    .select()
                                    .order('created_at', {ascending: false});
            }
            else {
                fetchedPosts = await supabase
                                    .from("Posts")
                                    .select()
                                    .order('upvotes', {ascending: false});
            }
            console.log(fetchedPosts);
            setPosts(fetchedPosts.data);
            setFilteredPosts(fetchedPosts.data);
        }

        fetchPosts();
    }, [orderByCreatedTime])

    const search = (e) => {
        e.preventDefault();
        const searched = e.target.value
        if(e.target.value === "") {setFilteredPosts(posts)}
        else {
            const filtered = posts.filter((post) => {
                const title = post.title.toLowerCase()
                return title.includes(searched)
            })
            setFilteredPosts(filtered)
        }
    }

    return (
        <div className="home-page">
            <input className="searchbar" placeholder="Search" onChange={search}></input>
            <div className="order-selection-container">
                <p>Order By: </p>
                <button className={"created-time-option"} onClick={(e) => {
                    e.preventDefault();
                    setOrderByCreatedTime(true);
                }}>Created Time</button>
                <button className="upvotes-button" onClick={(e) => {
                    e.preventDefault();
                    setOrderByCreatedTime(false);
                }}>Upvotes</button>
            </div>
            <div className="posts">
                {filteredPosts.map((data, i) => <Post key={i} 
                                            id={data.id}
                                            title={data.title}
                                            upvotes={data.upvotes}
                                            created_at={modifyDate(data.created_at)}/>)}
            </div>
        </div>
    )
}

export default Home