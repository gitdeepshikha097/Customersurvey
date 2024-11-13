// src/App.jsx
import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import Survey from './components/Survey';
import ThankYouScreen from './components/ThankYouScreen';

const questions = [
  { id: 1, text: 'How satisfied are you with our products?', type: 'rating', options: [1, 2, 3, 4, 5] },
  { id: 2, text: 'How fair are the prices compared to similar retailers?', type: 'rating', options: [1, 2, 3, 4, 5] },
  { id: 3, text: 'How satisfied are you with the value for money of your purchase?', type: 'rating', options: [1, 2, 3, 4, 5] },
  { id: 4, text: 'On a scale of 1-10 how would you recommend us to your friends and family?', type: 'rating', options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { id: 5, text: 'What could we do to improve our service?', type: 'text' },
];

const App = () => {
  const [stage, setStage] = useState('welcome');
  const [responses, setResponses] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const startSurvey = () => setStage('survey');

  const submitSurvey = (answers) => {
    setResponses(answers);
    setStage('thankYou');
  };

  const resetSurvey = () => {
    setStage('welcome');
    setCurrentQuestionIndex(0); // Reset to the first question
  };

  const handleNext = (answer) => {
    // Save the answer and move to the next question
    setResponses((prevResponses) => [...prevResponses, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePrevious = () => {
    // Move back to the previous question
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  return (
    <div className="App">
      {stage === 'welcome' && <WelcomeScreen onStart={startSurvey} />}
      
      {stage === 'survey' && (
        <Survey
          question={questions[currentQuestionIndex]}
          onNext={handleNext}
          onPrevious={handlePrevious}
          currentIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          onSubmit={submitSurvey}
        />
      )}
      
      {stage === 'thankYou' && <ThankYouScreen onReset={resetSurvey} />}
    </div>
  );
};

export default App;
