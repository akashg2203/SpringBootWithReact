package com.java.springboot.test.SpringBootProjectTest.exception;

public class UserNotFoundException extends RuntimeException{
	
	public UserNotFoundException(Long id) {
		
		super("Could not found the user with id "+id);
	}
	
     public UserNotFoundException(String id) {
		
		super("Could not found the user with id "+id);
	}

}
