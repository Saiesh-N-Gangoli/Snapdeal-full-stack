package com.snapdeal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.snapdeal.DTO.OrderDTO;
import com.snapdeal.DTO.RegisterDTO;
import com.snapdeal.service.OrderService;

@RestController
@CrossOrigin("*")
@RequestMapping("/")
public class OrdersController {
	
	@Autowired
	private OrderService orderService;
	
	@PostMapping("/createorder")
	public ResponseEntity<OrderDTO> createUser(@RequestBody OrderDTO orderDTO){
		 OrderDTO oDto = this.orderService.createOrder(orderDTO);
		return new ResponseEntity<OrderDTO>(oDto, HttpStatus.CREATED);
	}
	
	@GetMapping("/orders/{order_id}")
	public ResponseEntity<OrderDTO> findByOrderId(@PathVariable int order_id){
		OrderDTO oDto = this.orderService.getOrderById(order_id);
		return new ResponseEntity<OrderDTO>(oDto, HttpStatus.FOUND);
	}
}
