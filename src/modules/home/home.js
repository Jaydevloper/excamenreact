import Headers from "../../components/headers/headers";
import Left from "../../components/left-content/lef";
import '../../assets/scss/container.scss'
import './site-main.scss'
import { useSelector, useDispatch } from "react-redux";
import { getPost } from "./reducer/postSlice";
import { Link} from "react-router-dom";
import { useContext, useState } from "react";
import { Contextauth } from "../../components/context/auoth-context";
import Footer from "../../components/footer/footer";
function Home (){
    const {token} = useContext(Contextauth)
    let {count,setCount} = useContext(Contextauth)
    const {timedRefresh} = useContext(Contextauth)
    const {setId} = useContext(Contextauth)
    const {open,setOpen} = useContext(Contextauth)
    const {close,setClose} = useContext(Contextauth)
    const {pointer,setPointer} = useContext(Contextauth)
    const posts = useSelector(state => state.posts.posts)
    const dispatch = useDispatch()
    dispatch(getPost())
    
    function increment(){
        setCount(count+1)
        console.log(count,);
        if(count >= Math.floor(posts.length/10)) setCount(count)
    }
    function decrement(){
        setCount(count-1)
        if (count == 0) setCount(count)
    }
    function  del(e){
        const id = e.target.dataset.id
            fetch(`https://n36-blog.herokuapp.com/posts/${id}`,{
            method:'DELETE',
            headers:{token}
        })
        timedRefresh(500)
    }
    function edit(e){
        const id = e.target.dataset.id
        setId(id)
        setOpen(!open)
        setClose(!close)
        setPointer(!pointer)
    }
    // function Data (min){
    //     let date = new Date(min);
    //     let minutes = date.getMinutes();

    // }
    // console.log(minutes); // 15
    return(
        <>
        <Headers/>
        <main className={open?"site-main site-main--open":"site-main"}>
            <div className="site-main__wrraper container">
                <Left/>
                <div className="right-content">
                      <h2 className="site-main__head">
                        Recent Posts
                      </h2>
                    <ul className="site-main__list">
                        {
                            posts.loading && <p>Loading...</p>
                        }
                        {
                            posts.error && <p>Error..{posts.error}</p>
                        }
                        {
                           posts.data && posts.data?.map(el => {
                                return(
                                    <li className="site-main__item" key={el.id} id={el.id}>
                                    <div className="site-main__item-wrraper">
                                        <p className="site-main__iteam-page">{el.title}</p>
                                        <p className="site-main__iteam-page">{el.category_name}</p>
                                    </div>
                                    <p className="site-main__page">
                                    {el.title}
                                    </p>
                                    <time className="site-main__time">{el.created_time?new Date (el.created_time).getMinutes():new Date (el.created_at).getMinutes()} minutes read</time>
                                    <Link className="site-main__link" to={`/reply/${el.id}`} ></Link>
                                    <button data-id={el.id} onClick={del} className="site-main__btn site-main__btn--del">Delete</button>
                                    <button data-id={el.id} onClick={edit}  className={open?"site-main__btn site-main__btn--edit add-content__wrraper--open":"site-main__btn site-main__btn--edit"}>Edit</button>
                                </li>
                                )
                            })
                        }
                        
                    </ul>
                    <div className="site-main__pagination-wrraper">
                    <button className="site-main__pagination site-main__pagination--prev" onClick={decrement}></button>
                    </div>
                    <div className="site-main__pagination-wrraper">
                    <button className="site-main__pagination" onClick={increment}></button>
                    </div>
                </div>
            </div>
        </main>
        <Footer/>
        </>
    )
}
export default Home;