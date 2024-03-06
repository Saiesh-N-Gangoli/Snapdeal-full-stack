package com.snapdeal.exception;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalException {
	
	@ExceptionHandler(ResourceNotFound.class)
	public String handleGlobalException(ResourceNotFound rFound) {
		return rFound.getMessage();
	}

}
