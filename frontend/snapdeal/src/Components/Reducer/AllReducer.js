const allReducer = (state, action) =>{

    switch (action.type) {
        case "LOAD_ALL":
           return{
            ...state,
            filter_products: [...action.payload],
            all_products: [...action.payload],
           };

        case "SORT_ITEMS":
            // let sortvalue = document.getElementById("sort");
            // let newvalue = sortvalue.options[sortvalue.selectedIndex].value;
            // console.log(newvalue)
            return{
                ...state,
                sort_value: action.payload
            }

        case "FILTER_ITEMS": 
        let newData;
        // let sortData = [...action.payload];

        const {filter_products, sort_value} = state;
        let sortData = [...filter_products];

        const sortItems = (a,b) =>{
            if(sort_value === "lowest"){
                return a.price - b.price;
            }

            if(sort_value === "highest"){
                return b.price - a.price;
            }

            if(sort_value === "ascend"){
                return a.name.localeCompare(b.name);
            }

            if(sort_value === "descend"){
                return b.name.localeCompare(a.name)
            }

        };

        newData = sortData.sort(sortItems);

        return{
            ...state,
            filter_products: newData
        }

            case "UPDATE_FILTERS_VALUE":
                const { name, value } = action.payload;
          
                return {
                  ...state,
                  filters: {
                    ...state.filters,
                    [name]: value,
                  },
                };
          
              case "FILTER_PRODUCTS":
                let { all_products } = state;
                let tempFilterProduct = [...all_products];
          
                const {text , category, company} = state.filters;
          
                if (text) {
                  tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.name.toLowerCase().includes(text);
                  });
                }

                if(category !== "All") {
                  tempFilterProduct = tempFilterProduct.filter((curElem) =>{
                    return curElem.category === category;
                  })
                }

                if(company !== "All") {
                  tempFilterProduct = tempFilterProduct.filter((curElem) =>{
                    return curElem.company === company;
                  })
                }
          
                return {
                  ...state,
                  filter_products: tempFilterProduct,
                };

        default:
           return state;
    }

}

export default allReducer;