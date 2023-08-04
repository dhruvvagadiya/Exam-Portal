package com.examportal.pariksha.questionOptions;

import com.examportal.pariksha.question.Questions;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "question_options")
@Getter
@Setter
public class QuestionOptions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank
    private String content;

    @ManyToOne
    @JsonIgnore
    private Questions question;

    @Column(columnDefinition = "INT DEFAULT 0")
    private int isAnswer;

    public QuestionOptions() {
    }

    public QuestionOptions(String content, Questions question, int isAnswer) {
        this.content = content;
        this.question = question;
        this.isAnswer = isAnswer;
    }

    public void updateOption(QuestionOptions option) {
        this.content = option.getContent();
        this.isAnswer = option.getIsAnswer();
    }
}
