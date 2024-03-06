package com.snapdeal.service;

import java.util.List;

import com.snapdeal.DTO.CategoryDTO;


public interface CategoryService {

	List<CategoryDTO> viewCategory();
	CategoryDTO getCategoryByID(int product_id);
	void deleteCategorybyID(int category_id);
	CategoryDTO updateCategory(int category_id, CategoryDTO category);
	CategoryDTO createCategoryDTO(CategoryDTO category);
}
