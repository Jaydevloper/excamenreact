import { createContext, useState,   } from "react"
export const Contextauth = createContext()
export const AuthProvider = ({children}) =>{
    const [token,setToken] = useState( localStorage.getItem('token') ||null)
    const [post,setData] = useState({data:[], loading:false,error:null,length:NaN})
    const [category,setCategory] = useState([])
    const [search,setSearch] = useState([])
    const [filters,setFilter] = useState([])
    const [editid,setId] = useState([])
    const [open,setOpen] = useState(false)
    const [close,setClose] = useState(false)
    const [pointer,setPointer] = useState(false)
    let [count,setCount] = useState(0)
    function timedRefresh(timeoutPeriod) {
        setTimeout("location.reload(true);",timeoutPeriod);
    }
    return <Contextauth.Provider  value={{token,setToken,post,setData,category,setCategory,search,setSearch,filters,setFilter,timedRefresh,count,setCount,editid,setId,open,setOpen,close,setClose,pointer,setPointer}}>{children}</Contextauth.Provider>
}
