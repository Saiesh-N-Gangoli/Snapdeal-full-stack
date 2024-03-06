package com.snapdeal.serviceIMPL;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.snapdeal.entity.Coupon;
import com.snapdeal.repo.CouponRepo;
import com.snapdeal.service.CouponService;

@Service
public class CouponIMPL implements CouponService{
	
	@Autowired
	private CouponRepo couponRepo;
	
	public ResponseEntity<?> validateCoupon(@PathVariable String name) {
        Optional<Coupon> cOptional = couponRepo.findBycouponName(name);

        if (cOptional.isPresent()) {
            Coupon coupon = cOptional.get();
            return ResponseEntity.ok(coupon);
            
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid coupon code");
        }
    }
	
}
