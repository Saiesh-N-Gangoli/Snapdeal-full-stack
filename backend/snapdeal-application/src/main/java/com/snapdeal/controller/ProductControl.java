package com.snapdeal.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.snapdeal.entity.Products;
import com.snapdeal.serviceIMPL.ProductsIMPL;

@RestController
@RequestMapping("/")
@CrossOrigin("*")
public class ProductControl {
	
	@Autowired
	private ProductsIMPL pImpl;
	
	//created products here
	@PostMapping("/createproducts/{category_category_id}")
	public ResponseEntity<Products> createproduct(@RequestBody Products products, @PathVariable int category_category_id ){
		System.out.println(products.isAvailable());
		System.out.println(products.isLive());
		pImpl.RegisterItems(products, category_category_id);
		System.out.println("Hello...");
		return new ResponseEntity<Products>(products, HttpStatus.CREATED);
	}
	
	//got all the items here
	@GetMapping("/viewproducts")
	public ResponseEntity<List<Products>> viewProducts(){
		List<Products> products = pImpl.viewAllProducts();
		return new ResponseEntity<List<Products>>(products, HttpStatus.ACCEPTED);
	}
	
	//got items by id
	@GetMapping("viewproducts/{product_id}")
	public ResponseEntity<Products> viewProductsbyID(@PathVariable int product_id) {
		Products products = pImpl.getProductsByID(product_id);
		return new ResponseEntity<Products>(products, HttpStatus.OK);
	}
	
	//delete items by id
	@DeleteMapping("delete/{product_id}")
	public ResponseEntity<String> deleteItemsbyID(@PathVariable int product_id) {
	    try {
	        pImpl.deleteItembyID(product_id);
	        return new ResponseEntity<>("Delete Success", HttpStatus.OK);
	    } catch (EmptyResultDataAccessException ex) {
	        return new ResponseEntity<>("Product not found for deletion", HttpStatus.NOT_FOUND);
	    } catch (Exception e) {
	        return new ResponseEntity<>("Error during deletion", HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
	
	//updated products here
	@PutMapping("update/{product_id}")
	public ResponseEntity<Products> updatebyID(@PathVariable int product_id,@RequestBody Products products) {
		Products products2 = pImpl.updateProducts(product_id, products);
		System.out.println(products);
		return new ResponseEntity<Products>(products2, HttpStatus.ACCEPTED);
	}
	
	//get products by category
	@GetMapping("procategory/{category_id}")
	public ResponseEntity<List<Products>> getpProductsByCategory(@PathVariable int category_id){
		List<Products> products = pImpl.getProductsfromCategory(category_id);
		return new ResponseEntity<List<Products>>(products, HttpStatus.ACCEPTED);
	}

}
