import { useContext } from "react"
import { otherContext } from "./Context/Like"
import { postContext } from "./Context/Post"
import './App.css';
import { useNavigate } from "react-router-dom";
export default function Other(e) {
    const [post, setPost] = useContext(postContext)
    const [other, setOther] = useContext(otherContext)
    console.log(post)

    const like = () => {
        setOther(prevOther => ({ ...prevOther, liked: true }));
        setPost(prevPosts => prevPosts.map(post => {
            if (post.id === other.id) {
                return { ...post, liked: true };
            }
            return post;
        }));
    }

    const unlike = () => {
        setOther(prevOther => ({ ...prevOther, liked: false }));
        setPost(prevPosts => prevPosts.map(post => {
            if (post.id === other.id) {
                return { ...post, liked: false };
            }
            return post;
        }));
    }
    const navigate=useNavigate()
    const back=()=>{
        navigate('/')
    }
    return (
        <>
            <div style={{ marginLeft: '10px' }}>
                <div style={{ cursor: 'pointer' }}>
                    <p style={{fontSize:'30px'}}>{other.text}</p>
                    <img src={other.img} />
                    <div>
                        <button onClick={like} style={{backgroundColor:other.liked? 'green':'#FFF'}}>Like</button>
                        <button onClick={unlike} style={{ backgroundColor: other.liked ? '#FFF' : 'red' }}>UnLike</button>
                    </div>
                </div>
                <button onClick={back}>Back</button>
            </div>
        </>
    )
}