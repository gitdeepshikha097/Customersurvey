// src/components/Survey.jsx
import React, { useState, useEffect } from 'react';

const Survey = ({ question, onNext, onPrevious, currentIndex, totalQuestions, onSubmit }) => {
  const [answer, setAnswer] = useState('');
  const [responses, setResponses] = useState(
    JSON.parse(localStorage.getItem('surveyResponses')) || []
  );

  // Handle input change (for text or rating)
  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = () => {
    // Save the answer to the responses array
    const updatedResponses = [...responses, answer];
    setResponses(updatedResponses);

    // Save responses to localStorage
    localStorage.setItem('surveyResponses', JSON.stringify(updatedResponses));

    if (currentIndex === totalQuestions - 1) {
      // Submit the survey (final stage)
      onSubmit(updatedResponses);
    } else {
      onNext(answer); // Proceed to the next question
      setAnswer(''); // Clear the input after each question
    }
  };

  useEffect(() => {
    // Load existing responses from localStorage when the component mounts
    const savedResponses = JSON.parse(localStorage.getItem('surveyResponses'));
    if (savedResponses) {
      setResponses(savedResponses);
    }
  }, []);

  return (
    <div className="survey-container">
      <h2>{question.text}</h2>
      
      {question.type === 'rating' && (
        <div className="rating-options">
          {question.options.map((option) => (
            <button key={option} onClick={() => setAnswer(option)}>
              {option}
            </button>
          ))}
        </div>
      )}

      {question.type === 'text' && (
        <textarea
          value={answer}
          onChange={handleAnswerChange}
          placeholder="Your answer..."
        />
      )}

      <div className="navigation-buttons">
        {currentIndex > 0 && (
          <button className="prev-button" onClick={onPrevious}>
            Previous
          </button>
        )}
        
        {currentIndex < totalQuestions - 1 && (
          <button className="next-button" onClick={handleSubmit}>
            Next
          </button>
        )}
        
        {currentIndex === totalQuestions - 1 && (
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>

      <p>
        Question {currentIndex + 1} of {totalQuestions}
      </p>
    </div>
  );
};

export default Survey;
