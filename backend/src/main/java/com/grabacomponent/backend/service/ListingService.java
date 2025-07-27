// package com.grabacomponent.backend.service;

// import java.util.List;
// import java.util.Optional;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;
// import org.springframework.web.bind.annotation.RequestParam;

// import com.grabacomponent.backend.model.Listing;
// import com.grabacomponent.backend.repository.ComponentRepository;
// import com.grabacomponent.backend.repository.ListingRepository;

// @Service
// public class ListingService {
//     @Autowired
//     ListingRepository listingRepo;

//     @Autowired
//     ComponentRepository componentRepo;

//     public List<Listing> getAllListing(){
//         return listingRepo.findAll();
//     }

//     public List<Listing> getListingBySellerId(Long sellerId){
//         return listingRepo.findBySellerId(sellerId);

//     }

//     public Optional<Listing> getListingById(Long id){
//         return listingRepo.findById(id);
//     }

//     public void deleteListingById(Long id){
//         listingRepo.deleteById(id);
//     }

//     public void updateListing(Long id, Listing listing){
//         Optional<Listing> optionalListing = listingRepo.findById(id);
//         if(optionalListing.isPresent()){
//             Listing existingListing = optionalListing.get();
//             existingListing.setAvailability(listing.getAvailability());
//             existingListing.setComponent(componentRepo.findById(listing.getComponent().getId()).orElse(existingListing.getComponent()));
//             existingListing.setQuantity(listing.getQuantity() != null ? listing.getQuantity() : existingListing.getQuantity());
//             listingRepo.save(existingListing);
//         } else {
//             throw new RuntimeException("Listing not found with id: " + id);
//         }
//         // listingRepo.save(listing);
//     }

//     public void updateListingStatus(Long id, boolean availability){
//         // listing.setAvailability(availability);
//         Optional<Listing> optionalListing = listingRepo.findById(id);
//         if (optionalListing.isPresent()) {
//             Listing listing = optionalListing.get();
//             listing.setAvailability(availability);
//             listingRepo.save(listing);
//         } else {
//             throw new RuntimeException("Listing not found with id: " + id);
//         }
//     }

//     public void createListing(Listing listing){
//         listingRepo.save(listing);
//     }

//     // public void addListing(){

//     // }
// }
