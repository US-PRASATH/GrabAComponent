package com.grabacomponent.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.grabacomponent.backend.model.Request;



@Repository
public interface RequestRepo extends JpaRepository<Request,Long>, JpaSpecificationExecutor<Request>{
    Page<Request> findByRequesterUsername(String username, Pageable pageable);    

    Page<Request> findByComponentId(Long id, Pageable pageable);

    Page<Request> findByIsOpenTrueAndRequesterUsername(String username, Pageable pageable);

    Page<Request> findByIsOpenFalseAndRequesterUsername(String username, Pageable pageable);

    Page<Request> findByIsOpenTrueAndComponentId(Long id, Pageable pageable);

    Page<Request> findByIsOpenFalseAndComponentId(Long id, Pageable pageable);
}
