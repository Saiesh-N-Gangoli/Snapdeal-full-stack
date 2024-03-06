package com.snapdeal.DTO;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class OrderDTO {
	private int orderid;
	private String order_address;
	private String payment_type;
	private LocalDate date_of_delivery = LocalDate.now().plusDays(7);
}
