package com.examportal.pariksha.category;

import com.examportal.pariksha.category.Category;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CategoryService {
    Category upsertCategory (Category category);

    List<Category> getAll();

    ResponseEntity<?> getById (int id);
}
