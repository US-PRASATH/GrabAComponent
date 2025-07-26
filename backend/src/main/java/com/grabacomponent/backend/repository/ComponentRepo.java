package com.grabacomponent.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.grabacomponent.backend.model.Component;
import java.util.List;


@Repository
public interface ComponentRepo extends JpaRepository<Component,Long>{
    List<Component> findByType(String type);

    Component findByName(String name);
}
