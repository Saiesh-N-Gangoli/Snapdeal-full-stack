package com.snapdeal.serviceIMPL;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.snapdeal.DTO.OrderDTO;
import com.snapdeal.DTO.RegisterDTO;
import com.snapdeal.entity.Category;
import com.snapdeal.entity.Orders;
import com.snapdeal.entity.Products;
import com.snapdeal.entity.Register;
import com.snapdeal.exception.ResourceNotFound;
import com.snapdeal.repo.OrderRepo;
import com.snapdeal.service.OrderService;

@Service
public class OrderIMPL implements OrderService{
	
	@Autowired
	private OrderRepo oRepo;
	
	@Autowired
	private ModelMapper mapper;
	
	@Override
	public OrderDTO createOrder(OrderDTO orderDTO) {
		Orders orders = this.mapper.map(orderDTO, Orders.class);
		Orders saveorders= this.oRepo.save(orders);
		OrderDTO saveOrderDTO = this.mapper.map(saveorders, OrderDTO.class);
		return saveOrderDTO;
	}
	
	@Override
	public OrderDTO getOrderById(int order_id) {
		Orders orders = this.oRepo.findByOrderid(order_id);
		OrderDTO orderDTO = this.mapper.map(orders, OrderDTO.class);
		return orderDTO;
	}

}
