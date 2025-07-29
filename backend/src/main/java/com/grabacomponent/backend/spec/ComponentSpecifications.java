package com.grabacomponent.backend.spec;

import org.springframework.data.jpa.domain.Specification;

import com.grabacomponent.backend.model.Component;

public class ComponentSpecifications {
    public static Specification<Component> hasType(String type){
        return (root, query, cb) -> type==null ? null : cb.equal(root.get("type"), type);
    }

    public static Specification<Component> hasName(String name){
        return (root, query, cb) -> name==null ? null : cb.equal(root.get("name"), name);
    }
}
