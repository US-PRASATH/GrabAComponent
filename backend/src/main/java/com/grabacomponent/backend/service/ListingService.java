package com.grabacomponent.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.grabacomponent.backend.model.Listing;
import com.grabacomponent.backend.repository.ListingRepo;
import com.grabacomponent.backend.spec.ListingSpecifications;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ListingService {
    @Autowired
    private ListingRepo repo;

    public void addListing(Listing listing){
        repo.save(listing);
    }
    public void addListings(List<Listing> listings){
        // for(Listing listing:listings){
        //     listingRepo.save(listing);
        // }
        repo.saveAll(listings);
    }

    public Page<Listing> getListings(int pageNo, int pageSize){
        Pageable pageable=PageRequest.of(pageNo,pageSize);
        return repo.findAll(pageable);
    }

    public Page<Listing> getFilteredListings(Long componentId, Long sellerId, Boolean availability, Integer quantity, int pageNo, int pageSize){
        Pageable pageable=PageRequest.of(pageNo, pageSize);
        Specification<Listing> spec = Specification
        .where(ListingSpecifications.hasComponent(componentId))
        .and(ListingSpecifications.hasSeller(sellerId))
        .and(ListingSpecifications.isAvailable(availability))
        .and(ListingSpecifications.hasQuantity(quantity));

        return repo.findAll(spec, pageable);

    }

    public Listing getListingById(Long id){
        Optional<Listing> optionalListing = repo.findById(id);
        if(optionalListing.isPresent()){
            Listing existingListing = optionalListing.get();
            return existingListing;
        }
        else{
            throw new EntityNotFoundException("Listing with ID " + id + " not found");
        }
    }

    public void updateListingAvailability(Long id, Boolean availability){
        Listing existingListing = getListingById(id);
        existingListing.setAvailability(availability);
        repo.save(existingListing);
    }

    public void updateListing(Long id, Listing listing){
        Listing existingListing = getListingById(id);
        listing.setAvailability(listing.getAvailability()!=null ? listing.getAvailability() : existingListing.getAvailability());
        listing.setComponent(listing.getComponent()!=null ? listing.getComponent() : existingListing.getComponent());
        listing.setSeller(listing.getSeller()!=null ? listing.getSeller() : existingListing.getSeller());
        listing.setQuantity(listing.getQuantity()!=null ? listing.getQuantity() : existingListing.getQuantity());
        repo.save(existingListing);

    }

    public void deleteListing(Long id){
        Listing existingListing = getListingById(id);
        repo.delete(existingListing);
    }

}

