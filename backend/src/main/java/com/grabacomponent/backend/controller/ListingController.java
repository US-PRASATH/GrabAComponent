package com.grabacomponent.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.grabacomponent.backend.model.Listing;
import com.grabacomponent.backend.service.ListingService;

@RestController
@CrossOrigin
public class ListingController {
    @Autowired
    private ListingService service;

    @GetMapping("/listing")
    public Page<Listing> getListings(@RequestParam(defaultValue = "0") int pageNo, @RequestParam(defaultValue = "10") int pageSize) {
        return service.getListings(pageNo, pageSize);
    }

    @GetMapping("/listing/{component}")
    public Page<Listing> getListingsByComponent(@PathVariable Long component, @RequestParam(defaultValue = "0") int pageNo, @RequestParam(defaultValue = "10") int pageSize) {
        return service.getListingsByComponent(component,pageNo, pageSize);
    }

    @GetMapping("/listing/{seller}")
    public Page<Listing> getListingsBySeller(@PathVariable String seller, @RequestParam(defaultValue = "0") int pageNo, @RequestParam(defaultValue = "10") int pageSize) {
        return service.getListingsBySeller(seller,pageNo, pageSize);
    }

    @GetMapping("/listing/{component}")
    public Page<Listing> getAvailableListingsByComponent(@PathVariable Long component, @RequestParam(defaultValue = "0") int pageNo, @RequestParam(defaultValue = "10") int pageSize) {
        return service.getAvailableListingsByComponent(component,pageNo, pageSize);
    }

    @GetMapping("/listing/{seller}")
    public Page<Listing> getAvailableListingsBySeller(@PathVariable String seller, @RequestParam(defaultValue = "0") int pageNo, @RequestParam(defaultValue = "10") int pageSize) {
        return service.getAvailableListingsBySeller(seller,pageNo, pageSize);
    }
}
