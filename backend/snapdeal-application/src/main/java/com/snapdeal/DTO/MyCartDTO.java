package com.snapdeal.DTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MyCartDTO {
	private int cart_id;
	private String product_name;
	private int product_quanity;
	private long product_price;
	private long totalPrice;
	
	private CartDTO carttDto;
	
	private ProductsDTO productsDTO;
}
