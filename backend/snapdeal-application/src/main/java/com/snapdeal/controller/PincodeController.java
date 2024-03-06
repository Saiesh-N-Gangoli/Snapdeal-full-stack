package com.snapdeal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.snapdeal.serviceIMPL.CouponIMPL;
import com.snapdeal.serviceIMPL.PincodeIMPL;

@RestController
@CrossOrigin("*")
@RequestMapping("/pincode")
public class PincodeController {
	@Autowired
	private PincodeIMPL pincodeIMPL;
	
	@GetMapping("/{pincode}")
    public ResponseEntity<?> validatePin(@PathVariable int pincode) {
        return pincodeIMPL.validatePincode(pincode);
    }
}
