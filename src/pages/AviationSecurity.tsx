import React, { useState } from 'react';
import './AviationSecurity.css';
import { questions } from '../data/data';

interface Question {
    question: string;
    options: string[];
    correctAnswers: string[];
}

function AviationSecurity() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

    const correctAnswers = questions[currentQuestionIndex].correctAnswer;
    const isCorrect = correctAnswers.every((answer) =>
        selectedAnswers.includes(answer)
    );

    const handleAnswerButtonClick = () => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < questions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
            setSelectedAnswers([]);
        } else {
            setShowScore(true);
        }
    };

    const handleAnswerCheckboxChange = (option: string) => {
        const updatedAnswers = selectedAnswers.includes(option)
            ? selectedAnswers.filter((answer) => answer !== option)
            : [...selectedAnswers, option];

        setSelectedAnswers(updatedAnswers);
    };

    return (
        <div className="wrapper">
            {showScore ? (
                <div className="score-section">
                    Ви вірно відповіли на {score} питань з {questions.length} Ваш бал - {score*100/questions.length}
                </div>
            ) : (
                <div className="question-section">
                    <div className="question-count">
                        <span>Питання {currentQuestionIndex + 1}</span>/
                        {questions.length}
                    </div>
                    <div className="question-text">
                        {questions[currentQuestionIndex].question}
                    </div>
                    <div className="answer-options">
                        {questions[currentQuestionIndex].options.map(
                            (option, index) => (
                                <label key={index}>
                                    <input
                                        type="checkbox"
                                        name="answer"
                                        value={option}
                                        checked={selectedAnswers.includes(
                                            option
                                        )}
                                        onChange={() =>
                                            handleAnswerCheckboxChange(option)
                                        }
                                    />
                                    {option}
                                </label>
                            )
                        )}
                    </div>
                    <button onClick={handleAnswerButtonClick}>Next</button>
                </div>
            )}
        </div>
    );
}

export { AviationSecurity };
