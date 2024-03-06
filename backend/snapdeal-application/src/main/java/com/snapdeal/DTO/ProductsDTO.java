package com.snapdeal.DTO;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductsDTO {
	private int product_id;
	private String product_name;
	private long product_price;
	private boolean isAvailable;
	private int product_quantity;
	private boolean isLive;
	private String product_image;
	private float ratings;
	private String second_product_image;
	private String third_product_image;
	private String fourth_product_image;
	private boolean Isfeatured = true;
}
