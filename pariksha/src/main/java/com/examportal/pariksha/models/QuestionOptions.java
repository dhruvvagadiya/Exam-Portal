package com.examportal.pariksha.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "question_options")
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
    @JsonIgnore
    private int isAnswer;

    public QuestionOptions() {
    }

    public QuestionOptions(String content, Questions question, int isAnswer) {
        this.content = content;
        this.question = question;
        this.isAnswer = isAnswer;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getIsAnswer() {
        return isAnswer;
    }

    public void setIsAnswer(int isAnswer) {
        this.isAnswer = isAnswer;
    }

    public Questions getQuestion() {
        return question;
    }

    public void setQuestion(Questions question) {
        this.question = question;
    }
}
