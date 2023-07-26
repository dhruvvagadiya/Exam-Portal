package com.examportal.pariksha.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class QuizListDTO {
    private Integer id;
    private String title;
    private Long numberOfQuestions;
    private String description;
}

