'use client';

import { useState } from 'react';
import { QUIZ_QUESTIONS, QUIZ_CATEGORY_LABELS, getQuestionsByCategory, type QuizCategory, type QuizQuestion } from '@/data/quiz-questions';
import styles from './Practice.module.css';

export default function PracticePage() {
  const [category, setCategory] = useState<QuizCategory>('all');
  const [started, setStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  const startQuiz = () => {
    // Get questions and shuffle them, pick up to 10
    const qList = [...getQuestionsByCategory(category)].sort(() => 0.5 - Math.random()).slice(0, 10);
    setQuestions(qList);
    setStarted(true);
    setCurrentIdx(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === questions[currentIdx].correctIndex) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Finished
      setStarted(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        {!started && questions.length === 0 && (
          <div className={styles.introState}>
            <h1 className={styles.title}>Practice Lab</h1>
            <p className={styles.subtitle}>Test your chemistry knowledge with interactive quizzes.</p>
            
            <div className={styles.categorySelect}>
              <h2 className={styles.selectTitle}>Choose a Topic:</h2>
              <div className={styles.categoryGrid}>
                {(Object.entries(QUIZ_CATEGORY_LABELS) as [QuizCategory, string][]).map(([key, label]) => (
                  <button
                    key={key}
                    className={`${styles.catBtn} ${category === key ? styles.catBtnActive : ''}`}
                    onClick={() => setCategory(key)}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <button className={styles.startBtn} onClick={startQuiz}>
                Start Quiz
              </button>
            </div>
          </div>
        )}

        {/* Quiz State */}
        {started && questions.length > 0 && (
          <div className={styles.quizState}>
            <div className={styles.quizHeader}>
              <span className={styles.quizProgress}>Question {currentIdx + 1} of {questions.length}</span>
              <span className={styles.quizScore}>Score: {score}</span>
            </div>
            
            <div className={styles.questionCard}>
              <div className={styles.questionMeta}>
                <span className={styles.difficultyBadge} data-level={questions[currentIdx].difficulty}>
                  {questions[currentIdx].difficulty}
                </span>
                <span className={styles.catLabel}>{QUIZ_CATEGORY_LABELS[questions[currentIdx].category]}</span>
              </div>
              
              <h2 className={styles.questionText}>{questions[currentIdx].question}</h2>
              
              <div className={styles.optionsList}>
                {questions[currentIdx].options.map((opt, i) => {
                  let statusClass = '';
                  if (isAnswered) {
                    if (i === questions[currentIdx].correctIndex) {
                      statusClass = styles.optionCorrect;
                    } else if (i === selectedOption) {
                      statusClass = styles.optionWrong;
                    } else {
                      statusClass = styles.optionDim;
                    }
                  } else if (selectedOption === i) {
                    statusClass = styles.optionSelected;
                  }

                  return (
                    <button
                      key={i}
                      className={`${styles.optionBtn} ${statusClass}`}
                      onClick={() => handleSelect(i)}
                      disabled={isAnswered}
                    >
                      <span className={styles.optionLetter}>{String.fromCharCode(65 + i)}</span>
                      <span className={styles.optionText}>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div className={styles.explanationBox}>
                  <h3 className={styles.explanationTitle}>
                    {selectedOption === questions[currentIdx].correctIndex ? '✅ Correct!' : '❌ Incorrect'}
                  </h3>
                  <p className={styles.explanationText}>{questions[currentIdx].explanation}</p>
                  
                  <button className={styles.nextBtn} onClick={nextQuestion}>
                    {currentIdx < questions.length - 1 ? 'Next Question' : 'See Final Score'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Finished State */}
        {!started && questions.length > 0 && (
          <div className={styles.resultState}>
            <h2 className={styles.resultTitle}>Quiz Complete!</h2>
            <div className={styles.scoreDisplay}>
              <span className={styles.scoreNumber}>{score}</span>
              <span className={styles.scoreTotal}>/ {questions.length}</span>
            </div>
            <p className={styles.resultMsg}>
              {score === questions.length ? 'Perfect score! Outstanding work.' :
               score >= questions.length * 0.7 ? 'Great job! You have a solid understanding.' :
               'Good effort! Keep practicing to improve.'}
            </p>
            <div className={styles.resultActions}>
              <button className={styles.actionBtn} onClick={() => setQuestions([])}>
                Choose Another Topic
              </button>
              <button className={`${styles.actionBtn} ${styles.actionBtnPrimary}`} onClick={startQuiz}>
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
