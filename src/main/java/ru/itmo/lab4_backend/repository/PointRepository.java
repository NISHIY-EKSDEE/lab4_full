package ru.itmo.lab4_backend.repository;

import org.springframework.data.repository.CrudRepository;
import ru.itmo.lab4_backend.model.Point;
import ru.itmo.lab4_backend.model.User;

import java.util.Collection;

public interface PointRepository extends CrudRepository<Point, Long> {
    Collection<Point> findAllByOwner(User owner);
}
