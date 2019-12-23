package ru.itmo.lab4_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.itmo.lab4_backend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
