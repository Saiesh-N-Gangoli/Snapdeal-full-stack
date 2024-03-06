package com.snapdeal.service;

import com.snapdeal.DTO.OrderDTO;

public interface OrderService {

	OrderDTO createOrder(OrderDTO orderDTO);

	OrderDTO getOrderById(int order_id);

}
