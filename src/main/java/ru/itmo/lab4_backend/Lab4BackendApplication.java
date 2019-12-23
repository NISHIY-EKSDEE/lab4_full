package ru.itmo.lab4_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties
@EntityScan(basePackages = {"ru.itmo.lab4_backend.model"})  // scan JPA entities
public class Lab4BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(Lab4BackendApplication.class, args);
    }

}
