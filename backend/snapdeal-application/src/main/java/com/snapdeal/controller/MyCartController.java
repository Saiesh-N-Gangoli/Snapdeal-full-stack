package com.snapdeal.controller;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.snapdeal.DTO.MyCartDTO;
import com.snapdeal.entity.MyCart;
import com.snapdeal.entity.Products;
import com.snapdeal.service.MyCartService;

@RestController
@RequestMapping("/")
@CrossOrigin
public class MyCartController {
	
	@Autowired
	private MyCartService myCartService;
	
	@PostMapping("/addtomycart")
	public ResponseEntity<String> addProductToCart(@RequestBody MyCart myCart) {
//		if (myCartService.existsInCart(myCart)) {
//            return ResponseEntity.badRequest().body("Product already exists in the cart.");
//        }else {
	    String result = myCartService.addData(myCart);
	    return ResponseEntity.ok(result);
//        }
	}
	
	@GetMapping("/viewmycart")
	public ResponseEntity<List<MyCart>> viewCart(){
		List<MyCart> carts = myCartService.viewAllCart();
		return new ResponseEntity<List<MyCart>>(carts, HttpStatus.ACCEPTED);
	}
	
	@DeleteMapping("deletecartitem/{cart_id}")
	public ResponseEntity<String> deleteItemsbyID(@PathVariable int cart_id) {
		myCartService.deleteCartItembyID(cart_id);
		return new ResponseEntity<String>(HttpStatus.OK);
	}
	
	@DeleteMapping("/deleteallcart")
	public ResponseEntity<String> deleteAllItems(){
		myCartService.deleteAllCart();
		return new ResponseEntity<String>(HttpStatus.OK);
	}
	
	
	
	@PutMapping("updatequantity/{cart_id}")
	public ResponseEntity<MyCart> updatebyID(@PathVariable int cart_id,@RequestBody MyCart myCart) {
		MyCart mycart = myCartService.updateQuantity(cart_id, myCart);
		System.out.println();
		return new ResponseEntity<MyCart>(mycart, HttpStatus.ACCEPTED);
	}

}
