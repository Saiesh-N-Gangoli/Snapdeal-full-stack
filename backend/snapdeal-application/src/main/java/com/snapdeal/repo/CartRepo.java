package com.snapdeal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.snapdeal.entity.MyCart;

@Repository
public interface CartRepo extends JpaRepository<MyCart, Integer> {

	 boolean existsByProductName(String productName);

	 MyCart findByProductName(String productName);
	
}
