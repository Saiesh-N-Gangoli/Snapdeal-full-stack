import { createContext, useContext, useEffect, useReducer } from "react";
import { useProduct } from "./ProductContext";
import reducer from '../Reducer/AllReducer'

const AllProducts = createContext();

const initialState = {
    filter_products: [],
    all_products: [],
    sort_value : "lowest",
    filters: {
        text: "",
        category: "All",
        company: "All"
    }
};

export const AllProductsContext = ({children}) =>{
    const {products} = useProduct();
    // console.log(products)

    const [state, dispatch] = useReducer(reducer, initialState);

    //sorting products
    const productSort = (event) =>{
        let uservalue = event.target.value;
        dispatch({type: "SORT_ITEMS", payload: uservalue})
    }

    const updateFilterValue = (event) => {
        let name = event.target.name;
        let value = event.target.value;
    
        return dispatch({ type: "UPDATE_FILTERS_VALUE", payload: { name, value } });
      };


    useEffect(()=>{
        dispatch({ type: "FILTER_PRODUCTS" });
        dispatch({type: "FILTER_ITEMS"})
    }, [products, state.sort_value, state.filters])

    
    useEffect(()=>{
        dispatch({type: "LOAD_ALL", payload: products})
    }, [products])
    

    return(
        <AllProducts.Provider value={{...state, productSort, updateFilterValue}}>
        {children}
        </AllProducts.Provider>
    )
}

export const useAllProduct = () =>{
    return useContext(AllProducts);
}