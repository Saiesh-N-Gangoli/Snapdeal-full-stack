package com.snapdeal.serviceIMPL;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.snapdeal.entity.Coupon;
import com.snapdeal.entity.Pincode;
import com.snapdeal.repo.PincodeRepo;
import com.snapdeal.service.PinocodeService;

@Service
public class PincodeIMPL implements PinocodeService{
	
	@Autowired
	private PincodeRepo pRepo;
	
	public ResponseEntity<?> validatePincode(@PathVariable int pincode) {
        Optional<Pincode> pin = pRepo.findBypincode(pincode);

        if (pin.isPresent()) {
            Pincode pincodes = pin.get();
            return ResponseEntity.ok(pincodes);
            
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("This pincode is not deliverable");
        }
    }
}
