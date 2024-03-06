package com.snapdeal.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.snapdeal.entity.Coupon;

@Repository
public interface CouponRepo extends JpaRepository<Coupon, Integer>{

	Optional<Coupon> findBycouponName(String name);

}
