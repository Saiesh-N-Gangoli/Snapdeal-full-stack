package com.snapdeal;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class })
public class SnapdealApplication{

	public static void main(String[] args) {
		SpringApplication.run(SnapdealApplication.class, args);
		
	}
	
	@Configuration
	public class AppConfiguration {
		@Bean
	    public ModelMapper modelMapper() {
	        return new ModelMapper();
	    }
	}

}
