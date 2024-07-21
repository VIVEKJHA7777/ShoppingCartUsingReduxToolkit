import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE:'idle',
    ERROR:'error',
    LOADING:'loading'
});

const productSlice = createSlice({
  name: "product",
  initialState:{
    data:[],
    status: STATUSES.IDLE,  
  },
  //rducer are pure function you don't have to do api call in reducers
  reducers:{
    //  setProducts(state,action){
    //  state.data= action.payload;
    // },
    // setStatus(state,action){
    //     state.status= action.payload;
    // }
    
  },
  extraReducers: (builder)=>{
    builder
    .addCase(fetchproduct.pending,(state,action)=>{
       state.status= STATUSES.LOADING; 
    })
    .addCase(fetchproduct.fulfilled,(state,action)=>{
        state.data= action.payload;
        state.status= STATUSES.IDLE;
    })
    .addCase(fetchproduct.rejected,(state,action)=>{
        state.status= STATUSES.ERROR;
    })
  }
})

//Thunks
//the word thunk is a programming term that means a piece of code that does some delayed work
//Rather than execute some logic now we can write a function body or code that can be use dto perform the work later

export const {setProducts,setStatus} = productSlice.actions;
export default productSlice.reducer;

//thunk function
// export function fetchproduct(){
//     return async function fetchproductThunk(dispatch,getState) {
//         dispatch(setStatus(STATUSES.LOADING));
//         try{
//         const res= await fetch('https://fakestoreapi.com/products');
//         const data= await res.json();
//         dispatch(setProducts(data));
//         dispatch(setStatus(STATUSES.IDLE));
//         }
//         catch(err){
//           console.log(err);
//           dispatch(setStatus(STATUSES.ERROR));
//         }
//     }
// }


//redux toolkit thunk

export const fetchproduct =  createAsyncThunk('products/ftech', async ()=>{
     const res= await fetch('https://fakestoreapi.com/products');
      const data= await res.json();

      return data;
})

