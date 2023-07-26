package com.examportal.pariksha.user;

import com.examportal.pariksha.security.payload.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("")
    public ResponseEntity<?> GetUserByUsername(@RequestParam("username") String username) {
        Optional<User> temp = userRepository.findByUsername(username);
        if(temp.isPresent()) {
            return ResponseEntity.ok(temp.get());
        }
        return new ResponseEntity<>(new MessageResponse("Something went wrong"), HttpStatusCode.valueOf(400));
    }
}
