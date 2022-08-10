import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useContext } from "react";
import { Contextauth } from "../../../components/context/auoth-context";
const name = 'post'
export const getPost = createAsyncThunk(
    'posts/getPost',
    
  function(){
    const {post} = useContext(Contextauth)
    // console.log(post);
        // let res = await fetch('https://n36-blog.herokuapp.com/posts/bycategory?page',{
        //     method:"GET",
        //     headers:{categoryname: 'All'}
        // })
        // let data = await res.json()
        // // return  data.posts
        return post      
           
    }
)
const initialState = {
    posts:[
        {
            title:"Nima gap"
        },
        {
            title:"Nidasfd"
        },
        {
            title:"Nimfasp"
        }
    ]
}
const postSlice = createSlice({
    name,
    initialState,
    extraReducers:{
        [getPost.fulfilled]:(state,action) => {
            state.posts = action.payload
        }   
    }
})
export default postSlice.reducer