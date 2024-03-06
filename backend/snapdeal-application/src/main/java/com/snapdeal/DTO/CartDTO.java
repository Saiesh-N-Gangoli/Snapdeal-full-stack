package com.snapdeal.DTO;

import java.util.HashSet;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartDTO {
	private int cart_id;
	private RegisterDTO registerDTO;
	private Set<MyCartDTO> items = new HashSet<>();
}
