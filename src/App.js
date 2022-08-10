import Auoth from "./auoth/auoth";
import Home from "./modules/home/home";
import {Routes,Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Contextauth } from "./components/context/auoth-context";
import Reply from "./modules/product-single/post-id/components/reply";
function App() {
  const {token} = useContext(Contextauth)
  const {setData} = useContext(Contextauth)
  const {category} = useContext(Contextauth)
  const {search} = useContext(Contextauth)
  const {count} = useContext(Contextauth)

  const Api = (query,mount,method) =>{
  useEffect(() => {
    (async function(){
      setData({loading:true})
      let res = await fetch(`https://n36-blog.herokuapp.com/${query}`,{
          method:`${method}`,
          headers:{categoryname: category == false?'All':category}
      })
      if(!res.ok){
        setData({error:res.status})
        throw new Error(res.status)
      }
      let data = await res.json()
      return  search == false ? setData({data:data.posts,loading:false,error:null,length:data.length.count}):setData({data:data,loading:false,error:null})
  })()
  },[mount])
  }
  
  if (category == false ){
   search == false ? Api(`posts/bycategory?page=${count}`,count,"GET"):Api(`posts/search?searchValue=${search}`,search,"GET")
  }
  else  search == false ? Api(`posts/bycategory?page=${count}`,category,"GET"):Api(`posts/search?searchValue=${search}`,search,"GET")
  
  return (
   <Routes>
    <Route path="" element={token ? <Home/> : <Auoth/>}/>
    <Route path="/" element={ <Auoth/>}/>
    <Route path='/reply/:id' element={<Reply/>} />
   </Routes>
  );
}

export default App;
