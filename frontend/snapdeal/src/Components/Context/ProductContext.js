import axios from "axios";
import {createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/ProductReducer"

const myContext = createContext();
const API = "https://api.pujakaitem.com/api/products";

const AppProvider = ({children}) =>{

    const initialState = {
        isLoading : false,
        isError : false,
        products : [],
        FeaturedProducts : [],
        isSingle : false,
        singleProduct: {}
    }

    //using useReducer for maintaining states
    const[state, dispatch] = useReducer(reducer, initialState);

    const getProducts = async (url) =>{
        dispatch({type: "SET_LOAD"});
        try{
            const response = await axios.get(url);
            // console.log(response);
            //my products will be stored in the products..
            const products = await response.data;
            // console.log(products)
            dispatch({type: "MY_API" , payload: products});
        } catch(error){
            dispatch({type: "URL_ERROR"});
        }
        
    }

    const getSingleProduct = async (url) =>{
        try {
            dispatch({type: "SET_SINGLE_LOAD"});
            const response = await axios.get(url);
            const singleProduct = await response.data;
            dispatch({type: "MY_SINGLE_API" , payload: singleProduct});
        } catch (error) {
            dispatch({type: "URL_SINGLE_ERROR"});
        }
    }

    useEffect(() =>{
        getProducts(API);
    }, []);

    return (<myContext.Provider value={{...state, getSingleProduct}}>
        {children}
    </myContext.Provider>);

};

//for avoiding the imports in other files, im creating a custom hook.. 
const useProduct = () =>{
    return useContext(myContext);
}

export {AppProvider, myContext, useProduct};