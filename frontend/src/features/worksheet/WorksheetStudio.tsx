import React, { useState } from 'react';

export const WorksheetStudio: React.FC = () => {
  const [exerciseType, setExerciseType] = useState<string>('Balance');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [difficulty, setDifficulty] = useState<string>('Medium');
  const [showAnswerKey, setShowAnswerKey] = useState<boolean>(false);
  const [isPracticeMode, setIsPracticeMode] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});

  const questionPool = [
    { id: 1, type: 'Synthesis', difficulty: 'Easy', equation: '__ H2 + __ O2 → __ H2O', answer: '2, 1, 2' },
    { id: 2, type: 'Decomposition', difficulty: 'Easy', equation: '__ CaCO3 → __ CaO + __ CO2', answer: '1, 1, 1' },
    { id: 3, type: 'Combustion', difficulty: 'Medium', equation: '__ CH4 + __ O2 → __ CO2 + __ H2O', answer: '1, 2, 1, 2' },
    { id: 4, type: 'Single Replacement', difficulty: 'Medium', equation: '__ Zn + __ HCl → __ ZnCl2 + __ H2', answer: '1, 2, 1, 1' },
    { id: 5, type: 'Double Replacement', difficulty: 'Medium', equation: '__ AgNO3 + __ NaCl → __ AgCl + __ NaNO3', answer: '1, 1, 1, 1' },
    { id: 6, type: 'Synthesis', difficulty: 'Hard', equation: '__ N2 + __ H2 → __ NH3', answer: '1, 3, 2' },
    { id: 7, type: 'Combustion', difficulty: 'Hard', equation: '__ C3H8 + __ O2 → __ CO2 + __ H2O', answer: '1, 5, 3, 4' },
    { id: 8, type: 'Decomposition', difficulty: 'Medium', equation: '__ KClO3 → __ KCl + __ O2', answer: '2, 2, 3' },
    { id: 9, type: 'Single Replacement', difficulty: 'Easy', equation: '__ Fe + __ CuSO4 → __ FeSO4 + __ Cu', answer: '1, 1, 1, 1' },
    { id: 10, type: 'Double Replacement', difficulty: 'Hard', equation: '__ BaCl2 + __ Na2SO4 → __ BaSO4 + __ NaCl', answer: '1, 2, 1, 2' },
    { id: 11, type: 'Synthesis', difficulty: 'Easy', equation: '__ Na + __ Cl2 → __ NaCl', answer: '2, 1, 2' },
    { id: 12, type: 'Combustion', difficulty: 'Hard', equation: '__ C2H6 + __ O2 → __ CO2 + __ H2O', answer: '2, 7, 4, 6' }
  ];

  const [questions, setQuestions] = useState(questionPool);

  const handleGenerateWorksheet = () => {
    // Shuffle and filter based on selection
    const shuffled = [...questionPool].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setUserAnswers({});
  };

  const questionsToDisplay = questions.slice(0, questionCount);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="worksheet-page-container" style={{ padding: '32px 48px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Configuration Header Panel */}
      <div className="no-print" style={{ background: 'var(--element-bg)', borderRadius: '20px', padding: '28px', marginBottom: '32px', border: '1px solid var(--border-color)' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, marginTop: 0, marginBottom: '20px' }}>
          Worksheet Studio Generator
        </h1>

        {/* Option Groups */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '24px' }}>
          {/* Exercise Type */}
          <div>
            <label style={{ fontSize: '11px', fontWeight: 700, color: '#8e8e93', display: 'block', marginBottom: '8px' }}>
              EXERCISE TYPE
            </label>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['Balance', 'Identify Type', 'Combined'].map(t => (
                <button
                  key={t}
                  onClick={() => setExerciseType(t)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: exerciseType === t ? '#007aff' : 'rgba(0,0,0,0.05)',
                    color: exerciseType === t ? '#fff' : '#1a1a1a',
                    fontWeight: 600,
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Question Count */}
          <div>
            <label style={{ fontSize: '11px', fontWeight: 700, color: '#8e8e93', display: 'block', marginBottom: '8px' }}>
              QUESTION COUNT
            </label>
            <div style={{ display: 'flex', gap: '6px' }}>
              {[5, 10, 20, 30, 50].map(c => (
                <button
                  key={c}
                  onClick={() => setQuestionCount(c)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: questionCount === c ? '#007aff' : 'rgba(0,0,0,0.05)',
                    color: questionCount === c ? '#fff' : '#1a1a1a',
                    fontWeight: 600,
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div>
            <label style={{ fontSize: '11px', fontWeight: 700, color: '#8e8e93', display: 'block', marginBottom: '8px' }}>
              DIFFICULTY
            </label>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['Easy', 'Medium', 'Hard'].map(d => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: difficulty === d ? '#007aff' : 'rgba(0,0,0,0.05)',
                    color: difficulty === d ? '#fff' : '#1a1a1a',
                    fontWeight: 600,
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={handleGenerateWorksheet}
            style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: '#007aff', color: '#fff', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
          >
            Generate Worksheet
          </button>
          <button
            onClick={handlePrint}
            style={{ padding: '10px 20px', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.1)', background: '#fff', color: '#1a1a1a', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
          >
            Print / Export PDF
          </button>
          <button
            onClick={() => setIsPracticeMode(!isPracticeMode)}
            style={{ padding: '10px 20px', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.1)', background: isPracticeMode ? '#34c759' : '#fff', color: isPracticeMode ? '#fff' : '#1a1a1a', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
          >
            {isPracticeMode ? 'Exit Practice Mode' : 'Practice Mode'}
          </button>
          <button
            onClick={() => setShowAnswerKey(!showAnswerKey)}
            style={{ padding: '10px 20px', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.1)', background: showAnswerKey ? '#ff9500' : '#fff', color: showAnswerKey ? '#fff' : '#1a1a1a', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
          >
            {showAnswerKey ? 'Hide Answer Key' : 'Show Answer Key'}
          </button>
        </div>
      </div>

      {/* Printable Sheet Viewport */}
      <div
        className="printable-sheet"
        style={{
          background: '#ffffff',
          borderRadius: '16px',
          padding: '48px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
          border: '1px solid rgba(0,0,0,0.08)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #1a1a1a', paddingBottom: '16px', marginBottom: '28px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, margin: 0 }}>Chemical Equations Practice Sheet</h2>
            <span style={{ fontSize: '13px', color: '#666' }}>Zperiod Chemistry Studio · {exerciseType} ({difficulty})</span>
          </div>
          <div style={{ textAlign: 'right', fontSize: '13px', color: '#444' }}>
            <div>Name: ____________________</div>
            <div style={{ marginTop: '4px' }}>Date: _____________________</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {questionsToDisplay.map((q, idx) => (
            <div key={q.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'rgba(0,0,0,0.02)', borderRadius: '10px' }}>
              <div style={{ fontSize: '16px', fontFamily: 'monospace', fontWeight: 600 }}>
                <span style={{ fontWeight: 800, marginRight: '12px', color: '#8e8e93' }}>{idx + 1}.</span>
                {q.equation}
              </div>

              {isPracticeMode && (
                <input
                  type="text"
                  placeholder="Coefficients e.g. 2, 1, 2"
                  value={userAnswers[q.id] || ''}
                  onChange={(e) => setUserAnswers({ ...userAnswers, [q.id]: e.target.value })}
                  style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '13px' }}
                />
              )}

              {showAnswerKey && (
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#ff9500', background: 'rgba(255,149,0,0.1)', padding: '4px 10px', borderRadius: '6px' }}>
                  Key: {q.answer} ({q.type})
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
