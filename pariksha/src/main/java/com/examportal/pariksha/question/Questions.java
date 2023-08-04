package com.examportal.pariksha.question;

import com.examportal.pariksha.questionOptions.QuestionOptions;
import com.examportal.pariksha.quiz.Quiz;
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

    @ManyToOne
    @JsonIgnore
    private Quiz quiz;

    @OneToMany(mappedBy = "question", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<QuestionOptions> questionOptionsList;

    private Date createdAt = new Date();

    public Questions() {
    }

    public Questions(String title, Quiz quiz) {
        this.title = title;
        this.quiz = quiz;
    }

    public void addOption(QuestionOptions option) {
        this.questionOptionsList.add(option);
    }

    public boolean hasAnswer() {
        int cnt = 0;
        for(QuestionOptions options : this.questionOptionsList) {
            if(options.getIsAnswer() == 1) {
                cnt++;
            }
        }
        return cnt == 1;
    }
}
