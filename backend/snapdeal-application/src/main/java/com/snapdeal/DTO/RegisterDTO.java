package com.snapdeal.DTO;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDTO {
		private int registerId;
		private String register_name;
		private String email;
		private long register_phone;
		private String password;
		private String address;
}
