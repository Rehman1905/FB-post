import { useContext, useEffect, useRef, useState } from 'react';
import './App.css';
import { postContext } from './Context/Post';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Other from './OtherPage';
import { otherContext } from './Context/Like';

function App() {
  const [post, setPost] = useContext(postContext)
  const [display, setDisplay] = useState(false)
  const [displayGif, setDisplayGif] = useState(false)
  const [gif, setGif] = useState([])
  const [other, setOther] = useContext(otherContext)
  const [gifUrl, setGifUrl] = useState('')
  const text = useRef()
  const animal = useRef()
  const sharePost = () => {
    setDisplay(true)
  }
  const incluseGif = () => {
    setDisplayGif(true)
  }
  const send = () => {
    if (text.current.value.trim() === '') {
      alert('fill the input')
      return
    }
    setDisplay(false)
    setDisplayGif(false)
    setPost([...post, { text: text.current.value, img: gifUrl, liked: false, id: post.length }])
    text.current.value = ''
    setGifUrl('')
    animal.current.value = ''
    setGif([])
  }
  async function getGif(e) {
    if (e.target.value.trim() === '') {
      setGif([])
      return
    }
    await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=IunDZRBqAiaiIulBudp4Elej0Y5e6ScO&q=${e.target.value}&limit=30&offset=25&rating=&lang=en&bundle=messaging_non_clips`).then(result => {
      let gifs = result.data.data.map(gifData => gifData.images.fixed_height.url);
      setGif(gifs)
    })
  }
  const choiseGif = (e) => {
    setGifUrl(gif[e.target.id])
  }
  
  const navigate = useNavigate()
  const otherPage = (e) => {
    setOther(post[e])
    navigate('/about')
  }
  const remove=()=>{
    setGifUrl('')
  }
  return (
    <>
      <div className='container'>
        <div style={{ marginLeft: '10px' }}>
          <button onClick={sharePost}>Share Post</button>
        </div>
        <div className='divMain'>
          <div className='newPost' style={{ display: display ? 'flex' : 'none' }}>
            <input ref={text} placeholder='text' type='text'></input>
            {/* <input ref={gifUrl} placeholder='gif url' type='text'></input> */}
            <div style={{position:'relative',width:'100px',display:'flex',justifyContent:'center',alignItems:'center'}}>
              <img style={{ width: '100px',height:'100px',display: gifUrl===''? 'none':'block'}} src={gifUrl} />
              <button onClick={remove} style={{ position: 'absolute', top: '-10px',right:'-10px', width: '35px', height: '35px', borderRadius: '50%', display: gifUrl===''? 'none':'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', color: 'white',}}>X</button>
            </div>
            <button onClick={incluseGif}>Gif</button>
            <button onClick={send}>Send</button>
          </div>
          <div className='gif' style={{ display: displayGif ? 'flex' : 'none' }}>
            <input type='text' ref={animal} placeholder='animalName' className='gifInp' onChange={getGif}></input>
            <div>
              {gif.map((gifItem, index) => (
                <img onClick={choiseGif} id={index} key={index} src={gifItem} />
              ))}
            </div>
          </div>
        </div>
        <div style={{ marginLeft: '10px' }}>
          {post.map(post => (<div style={{ cursor: 'pointer' }} key={post.text} onClick={() => otherPage(post.id)} >
            <p>{post.text}</p>
            <img src={post.img} />
            {post.liked && <p>like</p>}
            {!post.liked && <p>dislike</p>}
          </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', width: '100%', height: '100vh', top: '0', left: '0', backgroundColor: 'rgba(99, 94, 94, 0.5)', backdropFilter: 'blur(10px)', zIndex: '2', display: display ? 'block' : 'none' }}></div>
    </>
  );
}

export default App;
