package com.snapdeal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.snapdeal.serviceIMPL.CouponIMPL;

@RestController
@CrossOrigin("*")
@RequestMapping("/coupon")
public class CouponController {
	
	@Autowired
	private CouponIMPL cImpl;
	
	@GetMapping("/{name}")
    public ResponseEntity<?> validateCoupon(@PathVariable String name) {
        return cImpl.validateCoupon(name);
    }
}
