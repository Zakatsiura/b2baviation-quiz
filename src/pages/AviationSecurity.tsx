import React, { useState } from 'react';
import './AviationSecurity.css';
import { questions } from '../data/data';

// interface Question {
//     question: string;
//     options: string[];
//     correctAnswers: string[];
// }

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

    const handleBackButtonClick = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedAnswers([]);
        }
    };

    return (
        <div className="wrapper__as">
            <div className="bg_wrapper">
                <h1 className="title">Авіаційна безпека</h1>
                {showScore ? (
                    <div className="score-section">
                        Ви вірно відповіли на {score} питань з{' '}
                        {questions.length} Ваш бал -{' '}
                        {((score * 100) / questions.length).toFixed(1)}
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
                                    <label className='radiolabel' key={index}>
                                        <input
                                            type="checkbox"
                                            name="answer"
                                            value={option}
                                            checked={selectedAnswers.includes(
                                                option
                                            )}
                                            onChange={() =>
                                                handleAnswerCheckboxChange(
                                                    option
                                                )
                                            }
                                        />
                                        {option}
                                    </label>
                                )
                            )}
                        </div>
                        <div className="button-container">
                            <button onClick={handleBackButtonClick}>
                                Назад
                            </button>
                            <button onClick={handleAnswerButtonClick}>
                                Далі
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export { AviationSecurity };
