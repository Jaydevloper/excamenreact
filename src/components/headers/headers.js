import {  useContext, useEffect, useRef, useState} from "react";
import { NavLink } from "react-router-dom";
import { Contextauth } from "../context/auoth-context";
import './site-header.scss';
import './site-logo.scss';
import './site-nav.scss';
function Headers (){
    const {filters,setFilter} = useContext(Contextauth)
    const searchRef = useRef()
    const {setCategory} = useContext(Contextauth)
    const {setSearch} = useContext(Contextauth)
    const [menu,setMenu] = useState(false)
       useEffect(() =>{
        fetch(`https://n36-blog.herokuapp.com/categories`,{
            method:"GET",
            headers:{'Content-Type' : 'application/json'}
        })
        .then(res => res.json())
        .then(data => setFilter(data))
       },[])
       function handle(e){
        setCategory(e.target.name)
    }
    function change (){
        setSearch(searchRef.current.value)
    }
    return (
        <header className="site-header container">
            <div className="site-header__content-wrraper">
            <div className="site-header__wrraper">
                <NavLink className="site-logo" to={'/'}>BoburBlog</NavLink>
                
                
               <div className="site-header__burger" onClick={()=> setMenu(!menu)}>
               <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="4" y1="8.5" x2="28" y2="8.5" stroke="black"/>
                <line x1="4" y1="15.5" x2="28" y2="15.5" stroke="black"/>
                <line x1="4" y1="22.5" x2="28" y2="22.5" stroke="black"/>
                </svg>
               </div>
            </div>
            <nav className={menu?"site-nav site-nav--open":"site-nav"}>
                    <div className={menu?"site-nav__wrraper site-nav__wrraper--open":"site-nav__wrraper"}>
                     <NavLink className={menu?"site-logo site-logo--response site-logo--open ":"site-logo site-logo--response"} to={'/'}>BoburBlog</NavLink>
                     <div onClick={()=> setMenu(false)}>
                     <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0.646447" y1="14.6464" x2="14.6464" y2="0.646447" stroke="black"/>
                    <line x1="0.341159" y1="0.634472" x2="15.3412" y2="14.6345" stroke="black"/>
                    </svg>
                     </div>
                    </div>
                    <ul className="site-header__list">
                        {
                                filters?.map(el =><li className="site-header__list-item" id={el.id} key={el.id} ><NavLink className='site-header__list-link' to={'/'} onClick = {handle} name={el.category_name}>{el.category_name}</NavLink></li> )

                        }
                    </ul>
                </nav>
            <div className="site-header__content">
                <input className="site-header__input" type="search" placeholder="Search" ref={searchRef} onChange={change} />
                <div className="site-header__img">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.331 11.0715L15.8859 14.6313C16.0447 14.8079 16.0368 15.0783 15.8681 15.2454L15.246 15.8684C15.1626 15.9526 15.049 16 14.9305 16C14.812 16 14.6985 15.9526 14.615 15.8684L11.0601 12.3085C10.9618 12.21 10.8726 12.1028 10.7935 11.9881L10.127 11.0982C9.02413 11.9801 7.6546 12.4602 6.24327 12.4598C3.33502 12.4699 0.807867 10.461 0.157951 7.62231C-0.491966 4.78365 0.90881 1.87288 3.53098 0.613257C6.15315 -0.646363 9.29689 0.0813446 11.101 2.36555C12.9052 4.64977 12.8882 7.88086 11.0601 10.1459L11.9489 10.76C12.0877 10.849 12.2159 10.9535 12.331 11.0715ZM1.79968 6.23008C1.79968 8.68763 3.78915 10.6799 6.24329 10.6799C7.42181 10.6799 8.55206 10.2111 9.3854 9.37656C10.2187 8.54206 10.6869 7.41024 10.6869 6.23008C10.6869 3.77252 8.69743 1.78027 6.24329 1.78027C3.78915 1.78027 1.79968 3.77252 1.79968 6.23008Z" fill="white"/>
                </svg>
                </div>
                </div>
            </div>
        </header>
    )
}
export default Headers;