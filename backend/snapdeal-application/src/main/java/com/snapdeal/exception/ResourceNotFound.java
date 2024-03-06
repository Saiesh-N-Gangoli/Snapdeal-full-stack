package com.snapdeal.exception;

@SuppressWarnings("serial")
public class ResourceNotFound extends RuntimeException{
	
	public ResourceNotFound() {
		super();
	}
	
	public ResourceNotFound(String message) {
		super(message);
	}
}
