package com.examportal.pariksha.service;

import com.examportal.pariksha.models.Category;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CategoryService {
    Category upsertCategory (Category category);

    List<Category> getAll();

    ResponseEntity<?> getById (int id);
}
