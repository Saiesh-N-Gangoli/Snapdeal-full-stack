package com.snapdeal.service;

import java.util.List;
import java.util.Set;

import com.snapdeal.entity.MyCart;
import com.snapdeal.entity.Products;

public interface MyCartService {
	String addData(MyCart myCart);

	List<MyCart> viewAllCart();

	String deleteCartItembyID(int cart_id);

	MyCart updateQuantity(int cart_id, MyCart myCart);

	String deleteAllCart();

}
