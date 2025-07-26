package com.grabacomponent.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.grabacomponent.backend.model.Request;

import java.util.List;


@Repository
public interface RequestRepo extends JpaRepository<Request,Long> {
    List<Request> findByRequesterUsername(String username);    

    List<Request> findByComponentId(Long id);

    List<Request> findByIsOpenTrueAndRequesterUsername(String username);

    List<Request> findByIsOpenFalseAndRequesterUsername(String username);

    List<Request> findByIsOpenTrueAndComponentId(Long id);

    List<Request> findByIsOpenFalseAndComponentId(Long id);
}
