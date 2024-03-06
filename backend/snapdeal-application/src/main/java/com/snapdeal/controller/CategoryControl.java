package com.snapdeal.controller;

import java.util.List;

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

import com.snapdeal.DTO.CategoryDTO;
import com.snapdeal.serviceIMPL.CategoryIMPL;

@RestController
@CrossOrigin("*")
@RequestMapping("/")
public class CategoryControl {
	
	@Autowired
	private CategoryIMPL cImpl;
	
	
	//created categories here
	@PostMapping("/createcat")
	public ResponseEntity<CategoryDTO> createCategory(@RequestBody CategoryDTO categoryDTO) {
		CategoryDTO categoryDTO2 = this.cImpl.createCategoryDTO(categoryDTO);
		return new ResponseEntity<CategoryDTO>(categoryDTO2, HttpStatus.ACCEPTED);
	}
	
	//got all the category here
	@GetMapping("/viewcategory")
	public ResponseEntity<List<CategoryDTO>> viewCategory(){
		List<CategoryDTO> catList = cImpl.viewCategory();
		return new ResponseEntity<List<CategoryDTO>>(catList, HttpStatus.ACCEPTED);
	}
	
	//got category by id
	@GetMapping("viewcategory/{category_id}")
	public ResponseEntity<CategoryDTO> viewCategorybyID(@PathVariable int category_id) {
		CategoryDTO category = cImpl.getCategoryByID(category_id);
		return new ResponseEntity<CategoryDTO>(category, HttpStatus.OK);
	}
	
	//delete category by id
	@DeleteMapping("deletecat/{category_id}")
	public ResponseEntity<String> deleteCategorybyID(@PathVariable int category_id) {
		cImpl.deleteCategorybyID(category_id);
		return new ResponseEntity<String>(HttpStatus.OK);
	}
	
	//updated category here
	@PutMapping("updatecat/{category_id}")
	public ResponseEntity<CategoryDTO> updatebyID(@PathVariable int category_id,@RequestBody CategoryDTO category) {
		CategoryDTO caProducts = cImpl.updateCategory(category_id, category);
		System.out.println(category);
		return new ResponseEntity<CategoryDTO>(caProducts, HttpStatus.OK);
	}

}
