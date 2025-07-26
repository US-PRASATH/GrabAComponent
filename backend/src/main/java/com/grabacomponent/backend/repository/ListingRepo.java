package com.grabacomponent.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.grabacomponent.backend.model.Listing;

@Repository
public interface ListingRepo extends JpaRepository<Listing,Long> {
    Page<Listing> findByComponentId(Long id, Pageable pageable);

    Page<Listing> findBySellerUsername(String username, Pageable pageable);

    Page<Listing> findByAvailabilityTrueAndComponentId(Long id, Pageable pageable);

    Page<Listing> findByAvailabilityTrueAndSellerUsername(String username, Pageable pageable);

    Page<Listing> findByAvailabilityFalseAndComponentId(Long id, Pageable pageable);

    Page<Listing> findByAvailabilityFalseAndSellerUsername(String username, Pageable pageable);
}
