package com.grabacomponent.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.grabacomponent.backend.model.Component;


@Repository
public interface ComponentRepo extends JpaRepository<Component,Long>{
    Page<Component> findByType(String type, Pageable pageable);

    Component findByName(String name);
}
