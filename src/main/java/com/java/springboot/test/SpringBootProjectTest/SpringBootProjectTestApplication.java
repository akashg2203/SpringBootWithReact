package com.java.springboot.test.SpringBootProjectTest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


/*@EnableJpaRepositories("repository")
@EntityScan("model")
@ComponentScan("SpringBootProjectTest")*/
@SpringBootApplication
public class SpringBootProjectTestApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootProjectTestApplication.class, args);
	}

}
