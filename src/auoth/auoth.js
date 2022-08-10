import { useContext, useRef } from 'react';
import { Contextauth } from '../components/context/auoth-context';
import './site-auoth.scss';
function Auoth(){
    const loginRef = useRef()
    const passwordRef = useRef()
    const {setToken} = useContext(Contextauth)
    function handel(e){
        e.preventDefault();
        if (loginRef.current.value.trim() && passwordRef.current.value.trim()){
            (async function(){
                let res =  await fetch(`https://n36-blog.herokuapp.com/login?login=${loginRef.current.value}&password=${passwordRef.current.value}`,{
                method:'GET',
                headers:{'Content-Type' : 'application/json'},
            
             })
             if (res.ok){
                let data = await res.json()
                localStorage.setItem('token',data.token)
                setToken(data.token)
             }
            })()
        }
    }
    return(
    <div className="site-auoth container">
        <h2 className="site-auoth__head">
            BoburBlog
        </h2>
        <div className="site-auoth__wrraper">
        <h2 className="site-auoth__login">
         Login
        </h2>
        <form action="#"  onSubmit={handel}>
            <input className="site-auoth__input" type="text" placeholder="Login" ref={loginRef} />
            <input className="site-auoth__input" type="password" placeholder="Password" ref={passwordRef} />
            <button className="site-auoth__btn">Submit</button>
        </form>
        </div>
    </div>)
}
export default Auoth;