package com.java.springboot.test.SpringBootProjectTest.repository;

//import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.java.springboot.test.SpringBootProjectTest.model.User;

public interface UserRepository extends JpaRepository<User, Long>{
	
    //Optional<User> findByUsernameAndPassword(String loginId, String password);

	
	

}
