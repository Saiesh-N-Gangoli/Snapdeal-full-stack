package com.snapdeal.entity;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Register{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int registerId;
	private String register_name;
	private String email;
	private long register_phone;
	private String password;
	private String address;
	
	@ManyToMany(fetch = FetchType.EAGER , cascade = CascadeType.ALL)
	Set<Roles> roles = new HashSet<>();
	
	@OneToOne(mappedBy = "register")
	private Cart cart;

}
