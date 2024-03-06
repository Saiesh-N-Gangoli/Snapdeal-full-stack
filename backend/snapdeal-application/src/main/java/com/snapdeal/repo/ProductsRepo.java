package com.snapdeal.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.snapdeal.entity.Category;
import com.snapdeal.entity.Products;

@Repository
public interface ProductsRepo extends JpaRepository<Products, Integer>{
//	public Products findById(int product);
	List<Products> findByCategory(Category category);
}
