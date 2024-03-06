package com.snapdeal.serviceIMPL;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.snapdeal.entity.MyCart;
import com.snapdeal.entity.Products;
import com.snapdeal.exception.ResourceNotFound;
import com.snapdeal.repo.CartRepo;
import com.snapdeal.service.MyCartService;

@Service
public class MyCartIMPL implements MyCartService{
	
	@Autowired
	private CartRepo cartRepo;
	
	 @Override
	    public String addData(MyCart myCart) {
	        // Check if the product is already in the cart
	       MyCart existingProduct = cartRepo.findByProductName(myCart.getProductName());

	        if (existingProduct != null) {
	             //If the product already exists, update the quantity
	            existingProduct.setProductQuanity(existingProduct.getProductQuanity() + myCart.getProductQuanity());
	            cartRepo.save(existingProduct);
	        } else {
	            // If the product is not in the cart, save
	            cartRepo.save(myCart);
	        }

	        return "Success";
	    }

    @Override
    public List<MyCart> viewAllCart() {
    	List<MyCart> carts = cartRepo.findAll();
		return carts;
    }

    @Override
	public String deleteCartItembyID(int cart_id) {
		cartRepo.deleteById(cart_id);
		return "Delete Success";
	}
    
    @Override
    public String deleteAllCart() {
    	cartRepo.deleteAll();
    	return "All cart deleted";
    }
	
    
	@Override
	public MyCart updateQuantity(int cart_id, MyCart myCart) {
		MyCart myCart2 = cartRepo.findById(cart_id).orElseThrow(()-> new ResourceNotFound("Not found"));
		myCart2.setProductQuanity(myCart.getProductQuanity());
		MyCart myCart3 = cartRepo.save(myCart2);
		return myCart3;
	}
}
