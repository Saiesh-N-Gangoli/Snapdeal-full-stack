import { useAllProduct } from "../Context/FullProductContext";
import Navigation from "../Navigation/Navigation";
import AllProducts from "./AllProducts";
import "./ProductList.css";
import BelowFooter from "../Footer/BelowFooter";
const ProductList = () => {
  const { filter_products , productSort} = useAllProduct();
  console.log(productSort)

  // const {filters:{category}, all_products, updateFilterValue} = useAllProduct();
    // console.log(category);
    // console.log(updateFilterValue.CategoryData)
  
    // const getData = (data, property) =>{
    //   let value = data.map((x)=>{
    //       return x[property]
    //   })
    //   return (value = ["All", ...new Set(value)])
    // }

    // const CategoryData = getData(all_products, "category");
    // const CategoryCompany = getData(all_products, "company");

//   console.log(filter_products.length);
  return (
    <>
      <Navigation />
      <div className="container contains">
        <section>
          <div className="Sort-but">
            {/* <p>{`${filter_products.length} products available`}</p> */}
            <div className="sort-items">
               <div style={{"display": "flex"}}>
               {/* <form action="#" className="Forns" style={{"border" : "1px solid black"}}>
                <label htmlFor="sort"></label>
                    <select name="sort" id="sort" onClick={productSort} className="formselect">
                        <option value="highest">Price(high to low)</option>
                        <option value="lowest">Price(low to high)</option>
                        <option value="ascend">Sort (A-Z)</option>
                        <option value="descend">Sort (Z-A)</option>
                    </select>
                </form> */}
                <div className="sort-items">
                {/* <form action="#" className="zero" style={{"border" : "1px solid black"}}>
                <label htmlFor="sort"></label>
                    <select name="sort" id="sort" onClick={productSort} className="formselect">
                        <option value="highest">All (Category)</option>
                        <option value="lowest">Mobile</option>
                        <option value="ascend">Computer</option>
                        <option value="descend">Accessories</option>
                        <option value="descend">Watch</option>
                    </select>
                </form> */}

                <div className="sort-items">
                {/* <form action="#" className="zero" style={{"border" : "1px solid black"}}>
                <label htmlFor="sort"></label>
                    <select name="category" id="sort" className="formselect" onClick={updateFilterValue}>
                        {CategoryData.map((x, index)=>{
                            return <option key={index} name="category" value={x}>{x}</option> 
                        })}
                    </select>
                </form> */}
               </div>

               </div>
               <div className="sort-items">
                {/* <form action="#" className="zero" style={{"border" : "1px solid black", "marginLeft": "7px"}}>
                <label htmlFor="sort"></label>
                    <select name="company" id="sort" className="formselect" onClick={updateFilterValue}>
                        {CategoryCompany.map((x, index)=>{
                            return <option key={index} name="company" value={x}>{x}</option> 
                        })}
                    </select>
                </form> */}
               </div>
            </div>
            </div>
          </div>
          <div>
            <AllProducts products={filter_products} />
          </div>
        </section>
      </div>
      <div className="Footeres">
      <BelowFooter/>
      </div>
    </>
  );
};

export default ProductList;
