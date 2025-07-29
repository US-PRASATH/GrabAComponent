package com.grabacomponent.backend.spec;

import org.springframework.data.jpa.domain.Specification;

import com.grabacomponent.backend.model.Request;

public class RequestSpecifications {
    
    public static Specification<Request> hasComponent(Long componentId){
        return (root, query, cb) -> componentId == null ? null : cb.equal(root.get("component").get("id"), componentId);
    }

    public static Specification<Request> hasRequester(String username){
        return (root, query, cb) -> username == null ? null : cb.equal(root.get("requester").get("username"), username); 
    }

    public static Specification<Request> isOpen(Boolean isOpen){
        return (root, query, cb) -> isOpen == null ? null : cb.equal(root.get("isOpen"), isOpen);
    }
}
