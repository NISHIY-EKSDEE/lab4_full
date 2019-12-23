package ru.itmo.lab4_backend.repository;

import org.springframework.data.repository.CrudRepository;
import ru.itmo.lab4_backend.model.Point;

public interface PointRepository extends CrudRepository<Point, Long> {
}
