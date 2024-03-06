package com.snapdeal.service;

import com.snapdeal.DTO.LoginDTO;
import com.snapdeal.DTO.RegisterDTO;
import com.snapdeal.response.LoginResponse;

public interface RegisterService {


	LoginResponse LoginUser(LoginDTO loginDTO);
	RegisterDTO createUser(RegisterDTO registerDTO);

	RegisterDTO getUserById(int userid);
	String DeleteUserById(int userid);


	
}
