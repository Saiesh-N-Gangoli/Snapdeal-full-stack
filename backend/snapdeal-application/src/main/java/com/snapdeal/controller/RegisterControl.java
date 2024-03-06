package com.snapdeal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.snapdeal.DTO.LoginDTO;
import com.snapdeal.DTO.RegisterDTO;
import com.snapdeal.response.LoginResponse;
import com.snapdeal.service.RegisterService;

@RestController
@CrossOrigin("*")
@RequestMapping("/")
public class RegisterControl {
	
	@Autowired
	private RegisterService rService;
	
	
	@PostMapping("/createuser")
	public ResponseEntity<RegisterDTO> createUser(@RequestBody RegisterDTO registerDTO){
		 RegisterDTO rDto = this.rService.createUser(registerDTO);
		return new ResponseEntity<RegisterDTO>(rDto, HttpStatus.CREATED);
	}
	
	@GetMapping("/getuser/{user_id}")
	public ResponseEntity<RegisterDTO> findUserById(@PathVariable int user_id){
		RegisterDTO rDto = this.rService.getUserById(user_id);
		return new ResponseEntity<RegisterDTO>(rDto, HttpStatus.FOUND);
	}
	
	@DeleteMapping("/deleteuser/{user_id}")
	public String deleteUserById(@PathVariable int user_id) {
	  this.rService.DeleteUserById(user_id);
	  return "Delete success";
	}
	
	@PostMapping("/logins")
	public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO){
		LoginResponse login = rService.LoginUser(loginDTO);
		return ResponseEntity.ok(login);
	}
}
