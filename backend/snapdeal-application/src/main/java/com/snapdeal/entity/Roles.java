package com.snapdeal.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Roles {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int RoleID;
	private String RoleName;
	
	@ManyToMany(mappedBy = "roles")
	Set<Register> usersRegisters = new HashSet<>();
}
