package com.examportal.pariksha.viewmodels.quiz;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuizList {
    private int id;
    private String title;
    private String description;
    private int numberOfQuestions;
    private int maxMarks;
}
