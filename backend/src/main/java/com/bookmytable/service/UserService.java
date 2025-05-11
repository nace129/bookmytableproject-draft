// UserService
package com.bookmytable.service;

import com.bookmytable.config.JwtUtil;
import com.bookmytable.model.Role;
import com.bookmytable.model.User;
import com.bookmytable.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Set;

@Service @RequiredArgsConstructor
public class UserService implements UserDetailsService {

  private final UserRepository repo;
  private final PasswordEncoder encoder;
  private final JwtUtil jwt;

  public String register(String email, String raw) {
    if (repo.existsByEmail(email)) throw new RuntimeException("email taken");
    User u = new User();
    u.setEmail(email);
    u.setPasswordHash(encoder.encode(raw));
    u.setRoles(Set.of(Role.CUSTOMER));
    repo.save(u);
    return jwt.generate(email);
  }

  public String login(String email, String raw) {
    User u = repo.findByEmail(email).orElseThrow(
        () -> new RuntimeException("bad credentials"));
    if (!encoder.matches(raw, u.getPasswordHash()))
      throw new RuntimeException("bad credentials");
    return jwt.generate(email);
  }

  @Override
  public UserDetails loadUserByUsername(String email) {
    User u = repo.findByEmail(email).orElseThrow();
    return User.builder()
        .username(u.getEmail())
        .password(u.getPasswordHash())
        .roles(u.getRoles().stream().map(Enum::name).toArray(String[]::new))
        .build();
  }
}
