package com.java.springboot.test.SpringBootProjectTest.controller;

import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.java.springboot.test.SpringBootProjectTest.exception.UserNotFoundException;
import com.java.springboot.test.SpringBootProjectTest.model.User;
import com.java.springboot.test.SpringBootProjectTest.model.Login;
import com.java.springboot.test.SpringBootProjectTest.util.Util;
import com.java.springboot.test.SpringBootProjectTest.repository.LoginRepository;
import com.java.springboot.test.SpringBootProjectTest.repository.UserRepository;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private LoginRepository loginRepository;

	@Autowired
	private Environment env;

	@PostMapping("/login")
	ResponseEntity<?> login(@RequestBody Login loginuser, HttpSession session) {
		Optional<Login> optionalUser = loginRepository.findByLoginId(loginuser.getLoginId());

		if (optionalUser.isPresent()) {
			Login storedUser = optionalUser.get();
			String key = env.getProperty("key");
			String Iv = env.getProperty("Iv");
			String decrypt = "";
			try {
				decrypt = Util.Decrypt(storedUser.getPassword(), key, Iv);
			} catch (InvalidKeyException | NoSuchPaddingException | NoSuchAlgorithmException
					| InvalidAlgorithmParameterException | IllegalBlockSizeException | BadPaddingException e) {
				e.printStackTrace();
			}
			if (decrypt.equals(loginuser.getPassword())) {
				session.setAttribute("loggedInUser", storedUser);
				 return ResponseEntity.ok().body(storedUser);
			} else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password");
			}
		} else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
		}
	}

	@PostMapping("/register")
	ResponseEntity<?> register(@RequestBody Login credentials) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	    String ip_dt = sdf.format(new Date());

		if (loginRepository.existsByLoginId(credentials.getLoginId())) {
			return ResponseEntity.ok("Login ID already exists");
		}
		String key = env.getProperty("key");
		String Iv = env.getProperty("Iv");
		String encrypt = Util.Encrypt(credentials.getPassword(), key, Iv);
		credentials.setPassword(encrypt);
		credentials.setLogin_date(ip_dt);
		Login savedLogin = loginRepository.save(credentials);
		return ResponseEntity.ok("Registration successful");
	}

	@PostMapping("/user")
	User newUser(@RequestBody User newUser) {
		return userRepository.save(newUser);
	}

	@GetMapping("/users")
	List<User> getAlluser() {
		return userRepository.findAll();

	}
	
	@GetMapping("/myAccount/{id}")
	Login myAccounty(@PathVariable String id) throws InvalidKeyException, NoSuchPaddingException, NoSuchAlgorithmException, InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException {
		Login ls = loginRepository.findByLoginId(id).orElseThrow(() -> new UserNotFoundException(id));
		Login login = new Login();
		login.setLogin_date(ls.getLogin_date());
		login.setLogin_name(ls.getLogin_name());
		login.setLoginId(ls.getLoginId());
		String key = env.getProperty("key");
		String Iv = env.getProperty("Iv");
		String decrypt = Util.Decrypt(ls.getPassword(), key, Iv);
		login.setPassword(decrypt);
		return login;
	}
	
	@PutMapping("/updatePassword/{id}")
	Login updatePassword(@RequestBody Login login, @PathVariable String id)
	        throws InvalidKeyException, NoSuchPaddingException, NoSuchAlgorithmException, InvalidAlgorithmParameterException,
	        IllegalBlockSizeException, BadPaddingException {
				return loginRepository.findByLoginId(id).map(user -> {
					String key = env.getProperty("key");
					String Iv = env.getProperty("Iv");
					String encrypt = Util.Encrypt(login.getPassword(), key, Iv);
					user.setPassword(encrypt);
					return loginRepository.save(user);
				}).orElseThrow(() -> new UserNotFoundException(id));
		
	}

	@GetMapping("/user/{id}")
	User getUserById(@PathVariable long id) {
		return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));

	}

	@PutMapping("/user/{id}")
	User updateUser(@RequestBody User newUser, @PathVariable Long id) {
		return userRepository.findById(id).map(user -> {
			user.setName(newUser.getName());
			user.setEmail(newUser.getEmail());
			user.setUsername(newUser.getUsername());
			user.setMobile(newUser.getMobile());
			return userRepository.save(user);
		}).orElseThrow(() -> new UserNotFoundException(id));
	}

	@DeleteMapping("/user/{id}")
	String deleteUser(@PathVariable Long id) {
		if (!userRepository.existsById(id)) {
			throw new UserNotFoundException(id);
		}
		userRepository.deleteById(id);
		return "User with id " + id + " has been deleted successfully";
	}

}
