package com.grabacomponent.backend.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grabacomponent.backend.model.User;
import com.grabacomponent.backend.repository.UserRepo;

@Service
public class UserService {
    @Autowired
    private UserRepo repo;

    public List<User> getUsers(){
        return repo.findAll();
    }

    public void addUser(User data){
        repo.save(data);
    }

    public void updateUser(Long id, User updatedUser) {
        Optional<User> existingUserOptional = repo.findById(id);
        if (existingUserOptional.isPresent()) {
            User existingUser = existingUserOptional.get();

            if (updatedUser.getEmail() != null) {
                existingUser.setEmail(updatedUser.getEmail());
            }
            if (updatedUser.getName() != null) {
                existingUser.setName(updatedUser.getName());
            }
            if (updatedUser.getPhone() != null) {
                existingUser.setPhone(updatedUser.getPhone());
            }
            if (updatedUser.getPassword() != null) {
                existingUser.setPassword(updatedUser.getPassword());
            }

            repo.save(existingUser);
        } else {
            throw new NoSuchElementException("User not found with id " + id);
        }
    }

    public User getUserByUsername(String username){
        return repo.findByUsername(username);
    }
}
