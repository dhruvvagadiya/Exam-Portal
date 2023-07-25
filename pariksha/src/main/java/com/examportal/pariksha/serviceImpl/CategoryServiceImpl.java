package com.examportal.pariksha.serviceImpl;

import com.examportal.pariksha.models.Category;
import com.examportal.pariksha.repo.CategoryRepository;
import com.examportal.pariksha.security.payload.response.MessageResponse;
import com.examportal.pariksha.service.CategoryService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    CategoryRepository categoryRepo;

    @Override
    @Transactional
    public Category upsertCategory(Category category) {
        if(category.getId() == 0) {
            category = categoryRepo.save(category);
        }
        else {
            Optional<Category> update = categoryRepo.findById(category.getId());
            if(update.isEmpty()) {
                return null;
            }
            else {
                Category updateObj = update.get();
                updateObj.setName(category.getName());
                category = categoryRepo.save(updateObj);
            }
        }
        return category;
    }

    @Override
    public List<Category> getAll() {
        return categoryRepo.findAll();
    }

    @Override
    public ResponseEntity<?> getById (int id) {
        if(id < 1) {
            return new ResponseEntity<>(new MessageResponse("Invalid request!"), HttpStatusCode.valueOf(401));
        }
        else {
            Optional<Category> category = categoryRepo.findById(id);
            if(category.isEmpty()) {
                return new ResponseEntity<>(new MessageResponse("Invalid request!"), HttpStatusCode.valueOf(401));
            }
            else {
                return new ResponseEntity<>(category.get(), HttpStatusCode.valueOf(200));
            }
        }
    }
}
