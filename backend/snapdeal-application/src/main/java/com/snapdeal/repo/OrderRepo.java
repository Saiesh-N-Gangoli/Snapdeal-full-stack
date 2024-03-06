package com.snapdeal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.snapdeal.entity.Orders;

@Repository
public interface OrderRepo extends JpaRepository<Orders, Integer>{

	Orders findByOrderid(int order_id);

}
