import { useContext, useEffect, useRef, useState } from "react";
import { Contextauth } from "../../components/context/auoth-context";
import  './add-content.scss'; 
function Add (){
    const {filters} = useContext(Contextauth)
    const {token} = useContext(Contextauth)
    const {timedRefresh} = useContext(Contextauth)
    const {editid} = useContext(Contextauth)
    const {open,setOpen} = useContext(Contextauth)
    const {close} = useContext(Contextauth)
    const {pointer} = useContext(Contextauth)
    const category = useRef()
    const title = useRef()
    const body = useRef()
    const [editnone,setNone] = useState(false)
    const Api = (query,method)=>{
        fetch(`https://n36-blog.herokuapp.com/${query}`,{
                method:`${method}`,
                headers:{
                    token:token,
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    imageUrl: "https://source.unsplash.com/352x300", 
                    categoryName: category.current.value,
                    title: title.current.value,
                    body: body.current.value
                    
                })
            })
            .then(res => res.json())
            .then(data => console.log(data))
    }

    function addpost (){
            Api('posts',"POST")
            timedRefresh(500)
    }
    function editpost(){
        Api(`posts/${editid}`,'PUT')
        timedRefresh(500)
    }

    function handle(){
        setOpen(!open)
        setNone(!editnone)
    }
    return(
        <>
        <button className={pointer?"add-content__btn add-content__btn--none":"add-content__btn"} onClick={handle} >addposts</button>
           <div className={open?`add-content__wrraper add-content__wrraper--open`:`add-content__wrraper`}>
           <input className="add-content__input" type="text" ref={title} placeholder={'title'}/>
            <input className="add-content__input" type="text" ref={body} placeholder={'body'}/>
           <select className="add-content__select"  ref={category}>
                {
                    filters.slice(0,4).map(el => <option key={el.id}>{el.category_name}</option>)
                }
            </select>
            <button className={close?"add-content__add add-content__add--close ":"add-content__add"} onClick={addpost}>Add</button>
            <button className={editnone?"add-content__add add-content__edit add-content__add--close":"add-content__add add-content__edit"} onClick={editpost}>Edit</button>
           </div>
        </>
    )
}
export default Add