package com.grabacomponent.backend.spec;

import org.springframework.data.jpa.domain.Specification;

import com.grabacomponent.backend.model.Component;
import com.grabacomponent.backend.model.Listing;

public class ListingSpecifications {
    public static Specification<Listing> hasComponent(Long componentId){
        return (root, query, cb) -> componentId==null ? null : cb.equal(root.get("component").get("id"), componentId);
    }

    public static Specification<Listing> hasSeller(Long sellerId){
        return (root, query, cb) -> sellerId==null ? null : cb.equal(root.get("seller").get("id"), sellerId);
    }

    public static Specification<Listing> isAvailable(Boolean availability){
        return (root, query, cb) -> availability==null ? null : cb.equal(root.get("availability"), availability);
    }

    public static Specification<Listing> hasQuantity(Integer quantity){
        return (root, query, cb) -> quantity==null ? null : cb.equal(root.get("quantity"), quantity);
    }


}
