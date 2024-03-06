package com.snapdeal.service;

import java.util.List;

import com.snapdeal.entity.Products;

public interface ProductsService{
	
//	Products RegisterItems(Products p);
	List<Products> viewAllProducts();
	Products getProductsByID(int product_id);
	String deleteItembyID(int product_id);
	Products updateProducts(int product_id, Products products);
	Products RegisterItems(Products products, int category_category_id);
	List<Products> getProductsfromCategory(int category_id);
}
