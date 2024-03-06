package com.snapdeal.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.snapdeal.entity.Coupon;
import com.snapdeal.entity.Pincode;

@Repository
public interface PincodeRepo extends JpaRepository<Pincode, Integer>{

	Optional<Pincode> findBypincode(int pincode);

}
