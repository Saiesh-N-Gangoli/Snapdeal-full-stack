package com.snapdeal.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.snapdeal.entity.Category;
import com.snapdeal.entity.Products;

public interface CategroyRepo extends JpaRepository<Category, Integer>{
	
}
