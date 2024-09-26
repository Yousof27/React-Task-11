import './form.css'
import { useState, useEffect } from "react"

export default function Form() {
    const [posts, setPosts] = useState();
    const [postId, setPostId] = useState(1);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(data => setPosts(data));
    }, [])

    return (
        <>
            <div className='btns'>
                <button onClick={() => setPostId(n => Math.min((n + 1), 100))}>+</button>
                <button onClick={() => setPostId(n => Math.max((n - 1), 1))}>-</button>
            </div>

            {posts?.map(p => p.id === postId
                &&
                <li key={p.id}>
                    <h2>{p.id}: {p.title}</h2>
                    <p>{p.body}</p>
                </li>
            )}
        </>
    )
}
