package com.snapdeal.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Products {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int product_id;
	private String product_name;
	private long product_price;
	private float ratings;
	private String second_product_image;
	private String third_product_image;
	private String fourth_product_image;
	private boolean Isfeatured;
	
	@Column(name = "is_live")
	private boolean isLive;
	
	private int product_quantity;
	
	@Column(name = "is_available")
	private boolean isAvailable;
	
	private String product_image;
	
	@ManyToOne(fetch = FetchType.EAGER)
	private Category category;
}
