package com.examportal.pariksha.quiz;

import com.examportal.pariksha.category.Category;
import com.examportal.pariksha.question.Questions;
import com.examportal.pariksha.user.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "quiz")
@Getter
@Setter
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank
    private String title;

    @NotBlank
    @Size(max = 100)
    private String description;

    @Min(value = 1)
    @Max(value = 10)
    private int marksPerQuestion;

    private int isActive;

    private Date createdAt = new Date();

    private Date updatedAt = new Date();

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnoreProperties(value = {"id", "email", "mobile", "username", "gender", "profileUrl", "createdAt", "updatedAt"})
    private User createdBy;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    private Category category;

    @OneToMany(mappedBy = "quiz", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Questions> questions;


    public Quiz() {
    }

    public Quiz(String title, String description, User createdBy, int isActive) {
        this.title = title;
        this.description = description;
        this.createdBy = createdBy;
        this.isActive = isActive;
    }

    public void toggleActive() {
        this.isActive = 1 - this.isActive;
    }
}
