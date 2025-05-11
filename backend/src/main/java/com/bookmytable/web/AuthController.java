// AuthController
package com.bookmytable.web;

import com.bookmytable.dto.*;
import com.bookmytable.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/auth",
                produces = MediaType.APPLICATION_JSON_VALUE,
                consumes = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class AuthController {

  private final UserService users;

  @PostMapping("/register")
  public AuthResponse register(@Valid @RequestBody AuthRequest req) {
    return new AuthResponse(users.register(req.email(), req.password()));
  }

  @PostMapping("/login")
  public AuthResponse login(@Valid @RequestBody AuthRequest req) {
    return new AuthResponse(users.login(req.email(), req.password()));
  }
}
