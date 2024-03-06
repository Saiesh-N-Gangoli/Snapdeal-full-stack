const ProductReducer = (state, action) =>{
    switch (action.type) {
        case "SET_LOAD":
            return{
                ...state,
                isLoading: true
            }

        case "MY_API":
                const featuredData = action.payload.filter((x) =>{
                    return x.featured === true;
                });
                return{
                    ...state,
                    isLoading: false,
                    products : action.payload,
                    FeaturedProducts : featuredData
                }


        case "URL_ERROR":
                return{
                    ...state,
                    isLoading: false,
                    isError: true
                }

        case "SET_SINGLE_LOAD":
                return{
                    ...state,
                    isSingle: true
                }

        case "MY_SINGLE_API":
                return{
                    ...state,
                    isSingle: true,
                    singleProduct: action.payload
                }

        case "URL_SINGLE_ERROR":
                return{
                    ...state,
                    isSingle: false,
                    isError: true
                }
            
            
    
        default:
            return{
                ...state
            }
    }
}

export default ProductReducer;