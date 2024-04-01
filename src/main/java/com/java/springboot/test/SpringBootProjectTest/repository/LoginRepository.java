package com.java.springboot.test.SpringBootProjectTest.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.java.springboot.test.SpringBootProjectTest.model.Login;

public interface LoginRepository extends JpaRepository<Login, Long>{
	
    boolean existsByLoginId(String loginId);
    Optional<Login> findByLoginId(String loginId);
    Optional<Login> findBySno(Long id);

}
