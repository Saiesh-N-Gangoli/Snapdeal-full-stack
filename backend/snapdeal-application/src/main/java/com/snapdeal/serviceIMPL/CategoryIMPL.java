package com.snapdeal.serviceIMPL;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.snapdeal.DTO.CategoryDTO;
import com.snapdeal.entity.Category;
import com.snapdeal.exception.ResourceNotFound;
import com.snapdeal.repo.CategroyRepo;
import com.snapdeal.service.CategoryService;

@Service
public class CategoryIMPL implements CategoryService{
	
	@Autowired
	private CategroyRepo cRepo;
	
	@Autowired
	private ModelMapper mapper;
	
	//creating the category list
	@Override
	public CategoryDTO createCategoryDTO(CategoryDTO category) {
		Category cat = this.mapper.map(category, Category.class);
		Category cat2 = this.cRepo.save(cat);
		return this.mapper.map(cat2, CategoryDTO.class);
	}
	
	//view all 
	@Override
	public List<CategoryDTO> viewCategory() {
		List<Category> categories = this.cRepo.findAll();
		List<CategoryDTO> catStream = categories.stream().map(c -> this.mapper.map(c, CategoryDTO.class)).collect(Collectors.toList());
		return catStream;
	}
	
	//getting the categories
	@Override
	public CategoryDTO getCategoryByID(int category_id) {
		Category getCategory =  this.cRepo.findById(category_id).orElseThrow(()-> new ResourceNotFound("Not found"));
		return this.mapper.map(getCategory, CategoryDTO.class);
	}
	
	
	//deleting the categories
	@Override
	public void deleteCategorybyID(int category_id) {
		Category categoryNum =  this.cRepo.findById(category_id).orElseThrow(()-> new ResourceNotFound("Not found"));
		this.cRepo.delete(categoryNum);
	}
	
	//updating the category
	@Override
	public CategoryDTO updateCategory(int category_id, CategoryDTO category) {
		Category categoryDTO =  this.cRepo.findById(category_id).orElseThrow(()-> new ResourceNotFound("Not found"));
		categoryDTO.setCategory_name(category.getCategory_name());
		Category saveCategory = this.cRepo.save(categoryDTO);
		return this.mapper.map(saveCategory, CategoryDTO.class);
	}


}
