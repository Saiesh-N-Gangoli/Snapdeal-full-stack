package com.snapdeal.serviceIMPL;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.snapdeal.DTO.ProductsDTO;
import com.snapdeal.entity.Category;
import com.snapdeal.entity.Products;
import com.snapdeal.exception.ResourceNotFound;
import com.snapdeal.repo.CategroyRepo;
import com.snapdeal.repo.ProductsRepo;
import com.snapdeal.service.ProductsService;

@Service
public class ProductsIMPL implements ProductsService{
	
	@Autowired
	private ProductsRepo pRepo;
	
	@Autowired
	private CategroyRepo cRepo;
	
	//inserting items to product table
	@Override
	public Products RegisterItems(Products products, int category_category_id) {
		try {
			Category category = this.cRepo.findById(category_category_id).orElseThrow(()-> new ResourceNotFound("Not found"));
			System.out.println(products.isAvailable());
			products.setCategory(category);
			Products p = this.pRepo.save(products);
			return products;
		}catch (Exception e) {
			e.printStackTrace();
		}
		return products;
	}
	
	//view list of products
	@Override
	public List<Products> viewAllProducts() {
	    List<Products> products = pRepo.findAll();
	    if (products != null) {
	        return products;
	    } else {
	        throw new RuntimeException("Products list is empty");
	    }
	}
	
	//view products by ID
	@Override
	public Products getProductsByID(int product_id) {
	    Products p = pRepo.findById(product_id).orElseThrow(() -> new ResourceNotFound("Not found"));
	    if (p != null) {
	        return p;
	    } else {
	        throw new RuntimeException("Retrieved product is not present in the database");
	    }
	}

	@Override
	public String deleteItembyID(int product_id) {
	    try {
	        pRepo.deleteById(product_id);
	        return "Delete Success";
	    } catch (EmptyResultDataAccessException ex) {
	        System.out.println("Product not found for deletion");
	        return "Product not found for deletion";
	    } catch (Exception e) {
	        System.out.println("Error occurred during deletion: " + e.getMessage());
	        return "Error occurred during deletion";
	    }
	}
	
	@Override
	public Products updateProducts(int product_id, Products products) {
		Products p = pRepo.findById(product_id).orElseThrow(()-> new ResourceNotFound("Not found"));
		p.setProduct_name(products.getProduct_name());
		p.setProduct_price(products.getProduct_price());
		p.setProduct_quantity(products.getProduct_quantity());
		p.setProduct_image(products.getProduct_image());
		p.setAvailable(products.isAvailable());
		p.setLive(products.isLive());
		p.setRatings(products.getRatings());
		p.setSecond_product_image(products.getSecond_product_image());
		p.setThird_product_image(products.getThird_product_image());
		p.setFourth_product_image(products.getFourth_product_image());
		p.setIsfeatured(products.isIsfeatured());
		Products newProducts = pRepo.save(p);
		return newProducts;
	}
	
	public Products convertEntityProducts(ProductsDTO pDto) {
		Products p = new Products();
		p.setProduct_name(pDto.getProduct_name());
		p.setProduct_price(pDto.getProduct_price());
		p.setProduct_quantity(pDto.getProduct_quantity());
		p.setProduct_image(pDto.getProduct_image());
		p.setAvailable(pDto.isAvailable());
		p.setLive(pDto.isLive());
		return p;
		
	}
	
	@Override
	public List<Products> getProductsfromCategory(int category_id) {
		Category findCategory = cRepo.findById(category_id).orElseThrow(()-> new ResourceNotFound("Category Not found"));
		List<Products> products = pRepo.findByCategory(findCategory);
		return products;
	}
	

}
