package com.snapdeal.repo;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.snapdeal.entity.Register;

@Repository
@EnableJpaRepositories 
public interface RegisterRepo extends JpaRepository<Register, Integer>{
	Optional<Register> findOneByEmailAndPassword(String email, String password);
	Register findByEmail(String email);
	boolean existsByEmail(String email);
	Register findByRegisterId(int user_id);

}
