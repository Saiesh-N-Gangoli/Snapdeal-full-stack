package com.snapdeal.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CouponDTO {
	private int coupon_id;
	private String couponName;
	private int couponDiscount;
}
