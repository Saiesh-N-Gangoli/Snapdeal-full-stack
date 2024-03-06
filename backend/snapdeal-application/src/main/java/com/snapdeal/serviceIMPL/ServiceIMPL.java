package com.snapdeal.serviceIMPL;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.snapdeal.DTO.LoginDTO;
import com.snapdeal.DTO.RegisterDTO;
import com.snapdeal.entity.Register;
import com.snapdeal.exception.ResourceNotFound;
import com.snapdeal.repo.RegisterRepo;
import com.snapdeal.response.LoginResponse;
import com.snapdeal.service.RegisterService;

@Service
public class ServiceIMPL implements RegisterService{
	
	@Autowired
	private RegisterRepo registerRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private ModelMapper mapper;
	
	//creating user for registering...
	@Override
	public RegisterDTO createUser(RegisterDTO registerDTO) {
		Register register = this.mapper.map(registerDTO, Register.class);
		Register savedRegister= this.registerRepo.save(register);
		RegisterDTO saveRegisterDTO = this.mapper.map(savedRegister, RegisterDTO.class);
		return saveRegisterDTO;
	}
	
	//get user by registration id...
	@Override
	public RegisterDTO getUserById(int userid) {
		Register useRegister = this.registerRepo.findByRegisterId(userid);
		RegisterDTO registerDTO = this.mapper.map(useRegister, RegisterDTO.class);
		return registerDTO;
	}
	
	@Override
	public String DeleteUserById(int userid) {
		Register useRegister = this.registerRepo.findByRegisterId(userid);
		this.registerRepo.delete(useRegister);
		return "Deletion Successful";
	}

	@Override
	public LoginResponse LoginUser(LoginDTO loginDTO) {
		Register r = registerRepo.findByEmail(loginDTO.getEmail());
        if (r != null) {
            String password = loginDTO.getPassword();
            String encodedPassword = r.getPassword();
            Boolean isPasswordCorrect = passwordEncoder.matches(password, encodedPassword);
            if (isPasswordCorrect) {
                Optional<Register> employee = registerRepo.findOneByEmailAndPassword(loginDTO.getEmail(), encodedPassword);
                if (employee.isPresent()) {
                    return new LoginResponse("User logged in successfully", true);
                } else {
                    return new LoginResponse("User logged in failed", false);
                }
            } else {
                return new LoginResponse("password doesn't match", false);
            }
        }else {
            return new LoginResponse("User email is incorrect", false);
        }

	}	
}
