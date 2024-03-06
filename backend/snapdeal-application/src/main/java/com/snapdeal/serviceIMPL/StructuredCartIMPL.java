package com.snapdeal.serviceIMPL;

import java.util.Set;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionMessage.ItemsBuilder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Service;

import com.snapdeal.DTO.CartDTO;
import com.snapdeal.DTO.Itemrequest;
import com.snapdeal.DTO.MyCartDTO;
import com.snapdeal.entity.Cart;
import com.snapdeal.entity.MyCart;
import com.snapdeal.entity.Products;
import com.snapdeal.entity.Register;
import com.snapdeal.exception.ResourceNotFound;
import com.snapdeal.repo.ProductsRepo;
import com.snapdeal.repo.RegisterRepo;
import com.snapdeal.service.StructuredCartService;

@Service
public class StructuredCartIMPL implements StructuredCartService{
	
	@Autowired
	private RegisterRepo registerRepo;
	
	@Autowired
	private ProductsRepo productsRepo;
	
	public CartDTO addItemtoCart(Itemrequest item, String emailid) {
		int product_id = item.getProduct_id();
		int product_quanity = item.getQuantity();
		Register register = this.registerRepo.findByEmail(emailid);
		Products products = this.productsRepo.findById(product_id).orElseThrow(()-> new ResourceNotFound("Product not found"));
		if(!products.isAvailable()) {
			new ResourceNotFound("Product is out of stock");
		}
		
		//Creating cart Items....
		StructuredMyCart myCart = new StructuredMyCart();
		myCart.setProducts(products);
		myCart.setProductQuanity(product_quanity);
		long totalprice = products.getProduct_quantity()* products.getProduct_price();
		myCart.setTotalPrice(totalprice);
		
		//get cart items from users...
		Cart cart = register.getCart();
		if(cart == null) {
			Cart cart2 = new Cart();
		}
		myCart.setCart(cart);
		Set<StructuredMyCart> itemsCarts = cart.getItems();
		AtomicReference<Boolean> flag = new AtomicReference<>();
		Set<MyCartStructuredMyCart> newproduct = itemsCarts.stream().map((i)->{
			if(i.getProducts().getProduct_id() == products.getProduct_id()) {
				i.setProductQuanity(product_quanity);
				i.setTotalPrice(totalprice);
				flag.set(true);				
			}
			return i;
		}).collect(Collectors.toSet());
		
		if(flag.get()) {
			itemsCarts.clear();
			itemsCarts.addAll(newproduct);
		}else {
			myCart.
		}
		

		
		
		
		return null;
	}
}
