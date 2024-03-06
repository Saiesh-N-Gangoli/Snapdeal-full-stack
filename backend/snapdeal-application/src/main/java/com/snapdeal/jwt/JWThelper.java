//package com.snapdeal.jwt;
//
//import java.util.Date;
//
//import io.jsonwebtoken.Claims;
//
//public class JWThelper {
//	
//	public static final long  token_validity = 5 * 5 * 60;
//	
//	private String secret_code = "sassasasasasasasasasasasasasahdcfjbfchbhfcf";
//	
//	public String getUserByToken(String token) {
//		return getClaimFromToken(token, Claims::getSubject);
//	}
//	
//	public Date getExpiration(String token) {
//		return getClaimFromToken(token, Claims::getExpiration);
//	}
//		
//	
//
//}
