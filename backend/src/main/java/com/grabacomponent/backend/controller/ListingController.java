package com.grabacomponent.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.grabacomponent.backend.model.Component;
import com.grabacomponent.backend.model.Listing;
import com.grabacomponent.backend.service.ListingService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@CrossOrigin
@RequestMapping("/listings")
public class ListingController {
    @Autowired
    private ListingService service;

    @GetMapping
    public Page<Listing> getListings(@RequestParam(defaultValue = "0") int pageNo, @RequestParam(defaultValue = "10") int pageSize) {
        return service.getListings(pageNo, pageSize);
    }

    @GetMapping("/search")
    public Page<Listing> searchListing(
        @RequestParam(required = false) Long componentId,
        @RequestParam(required = false) Long sellerId,
        @RequestParam(required = false) Boolean availability,
        @RequestParam(required = false) Integer quantity,
        @RequestParam(defaultValue = "0") int pageNo,
        @RequestParam(defaultValue = "10") int pageSize
    ) {
        return service.getFilteredListings(componentId, sellerId, availability, quantity, pageNo, pageSize);
    }

    @GetMapping("/{id}")
    public Listing getListingById(@RequestParam Long id) {
        return service.getListingById(id);
    }
    
    @PostMapping
    public void postListings(@RequestBody List<Listing> entities) {
        service.addListings(entities);
    }

    @PutMapping("/availability/{id}")
    public void updateAvailability(@PathVariable Long id, @RequestBody Boolean entity) {
        service.updateListingAvailability(id, entity);
    }

    @PutMapping("/{id}")
    public void updateListing(@PathVariable Long id, @RequestBody Listing entity) {
        service.updateListing(id, entity);
    }

    @DeleteMapping("/{id}")
    public void deleteListing(@PathVariable Long id){
        service.deleteListing(id);
    }
    
}
