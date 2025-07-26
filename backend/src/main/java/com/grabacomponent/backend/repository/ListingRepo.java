package com.grabacomponent.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.grabacomponent.backend.model.Listing;

@Repository
public interface ListingRepo extends JpaRepository<Listing,Long> {
    List<Listing> findByComponentId(Long id);

    List<Listing> findBySellerUsername(String username);

    List<Listing> findByAvailabilityTrueAndComponentId(Long id);

    List<Listing> findByAvailabilityTrueAndSellerUsername(String username);

    List<Listing> findByAvailabilityFalseAndComponentId(Long id);

    List<Listing> findByAvailabilityFalseAndSellerUsername(String username);
}
