package com.examportal.pariksha.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "questions")
@Getter
@Setter
public class Questions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank
    private String title;

    private String description;

    @ManyToOne
    @JsonIgnore
    private Quiz quiz;

    @OneToMany(mappedBy = "question", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<QuestionOptions> questionOptionsList;

    private Date createdAt = new Date();

    public Questions() {
    }

    public Questions(String title, String description, Quiz quiz) {
        this.title = title;
        this.description = description;
        this.quiz = quiz;
    }
}
