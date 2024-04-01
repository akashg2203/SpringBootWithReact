package com.java.springboot.test.SpringBootProjectTest.util;
import java.nio.charset.StandardCharsets;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;


public class Util {
	
	private static final int TAG_LENGTH = 128;
	
	public static String Encrypt(String plainText, String secret, String nonce) {
		try {

			byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);
			
			byte[] nonceBytes = java.util.Base64.getDecoder().decode(nonce);
						
			Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
			
			SecretKeySpec keySpec = new SecretKeySpec(keyBytes, "AES");
			
			GCMParameterSpec gcmSpec = new GCMParameterSpec(TAG_LENGTH, nonceBytes);
			
			cipher.init(Cipher.ENCRYPT_MODE, keySpec, gcmSpec);
			
			byte[] plaintextBytes = plainText.getBytes(StandardCharsets.UTF_8);
			
			byte[] ciphertextBytes = cipher.doFinal(plaintextBytes);

			return Base64.getEncoder().encodeToString(ciphertextBytes);

		} catch (NoSuchAlgorithmException | NoSuchPaddingException | InvalidKeyException |

				InvalidAlgorithmParameterException | IllegalBlockSizeException | BadPaddingException e) {

			e.printStackTrace();

			return "";

		}

	}
	
	public static String Decrypt(String cipherText, String secret, String nonce)
			throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidAlgorithmParameterException,
			InvalidKeyException, IllegalBlockSizeException, BadPaddingException {


		byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);

		byte[] nonceBytes = Base64.getDecoder().decode(nonce);
		
		Base64.Decoder decoder = Base64.getDecoder();

		byte[] decodedCipherText = decoder.decode(cipherText);

		Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");

		SecretKeySpec keySpec = new SecretKeySpec(keyBytes, "AES");

		GCMParameterSpec gcmSpec = new GCMParameterSpec(TAG_LENGTH, nonceBytes);

		cipher.init(Cipher.DECRYPT_MODE, keySpec, gcmSpec);

		byte[] plaintextBytes = cipher.doFinal(decodedCipherText);

		String plaintext = new String(plaintextBytes, StandardCharsets.UTF_8);

		return plaintext;

	}
	public static void main(String[] args) {
        try {
        	
        	String key = "87787164028778716402877871640287";
        	
        	String iv = "8778716402877871";
        	
   		// System.out.println("UpdateEncrypted original String  : "+Encrypt("Akash@123",key,iv));
		 
 		 System.out.println("UpdateDecrypted original String  : "+Decrypt("dzgP9qo0M8CUh4VgO7sqdobb8xcZ",key,iv));

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
