package com.examportal.pariksha.category;

import com.examportal.pariksha.security.payload.response.MessageResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("")
    public ResponseEntity<?> upsertCategory (@RequestBody @Valid Category category) {
        Category category1 = categoryService.upsertCategory(category);
        if(category1 == null) {
            return new ResponseEntity<>(new MessageResponse("Invalid request!"), HttpStatusCode.valueOf(400));
        }
        else {
            return new ResponseEntity<>(category1, HttpStatusCode.valueOf(200));
        }
    }

    @GetMapping("all")
    public List<Category> getAll () {
        return this.categoryService.getAll();
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getById (@PathVariable int id) {
        return categoryService.getById(id);
    }
}
