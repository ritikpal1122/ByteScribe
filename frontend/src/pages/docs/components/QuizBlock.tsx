import { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import type { QuizQuestion } from '@/data/docs';
import type { LangColorTokens } from '../utils/colorTokens';

/* ------------------------------------------------------------------ */
/*  Score Message                                                      */
/* ------------------------------------------------------------------ */
function getScoreMessage(score: number): string {
  if (score >= 90) return 'Excellent!';
  if (score >= 70) return 'Well done!';
  if (score >= 50) return 'Good effort!';
  return 'Keep learning!';
}

/* ================================================================== */
/*  QuizBlock                                                          */
/* ================================================================== */
export default function QuizBlock({
  questions,
  entryId,
  langId,
  colors,
}: {
  questions: QuizQuestion[];
  entryId: string;
  langId: string;
  colors: LangColorTokens;
}) {
  const storageKey = `learntext-quiz-${langId}-${entryId}`;
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [answerHistory, setAnswerHistory] = useState<boolean[]>([]);
  const [finished, setFinished] = useState(() => {
    try {
      return localStorage.getItem(storageKey) !== null;
    } catch {
      return false;
    }
  });

  const question = questions[currentQ];
  if (!question) return null;

  const isCorrect = selectedOption === question.correctIndex;
  const progressPercent = ((currentQ + 1) / questions.length) * 100;

  const handleCheck = () => {
    if (selectedOption === null) return;
    setChecked(true);
    if (isCorrect) {
      setCorrectCount((c) => c + 1);
    }
  };

  const handleNext = () => {
    setAnswerHistory((prev) => [...prev, isCorrect]);

    if (currentQ < questions.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelectedOption(null);
      setChecked(false);
    } else {
      const finalCorrect = correctCount + (isCorrect ? 1 : 0);
      const score = Math.round((finalCorrect / questions.length) * 100);
      setFinished(true);
      try {
        localStorage.setItem(storageKey, String(score));
      } catch {}
    }
  };

  const handleRetry = () => {
    setCurrentQ(0);
    setSelectedOption(null);
    setChecked(false);
    setCorrectCount(0);
    setAnswerHistory([]);
    setFinished(false);
    try {
      localStorage.removeItem(storageKey);
    } catch {}
  };

  /* ---------------------------------------------------------------- */
  /*  Results Screen                                                   */
  /* ---------------------------------------------------------------- */
  if (finished) {
    const savedScore = (() => {
      try {
        return Number(localStorage.getItem(storageKey)) || 0;
      } catch {
        return 0;
      }
    })();
    const score =
      savedScore || Math.round((correctCount / questions.length) * 100);
    const message = getScoreMessage(score);

    const displayHistory =
      answerHistory.length === questions.length
        ? answerHistory
        : questions.map((_, i) => i < Math.round((score / 100) * questions.length));

    const scoreColor =
      score >= 70 ? 'text-green-600' : score >= 50 ? 'text-yellow-600' : 'text-red-600';

    return (
      <div className="mt-10 mb-6">
        <div className="rounded-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="px-5 py-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900">{message}</h3>
            <p className="text-sm text-gray-500 mt-0.5">
              You scored{' '}
              <span className={`font-semibold ${scoreColor}`}>{score}%</span>
              {' '}&mdash;{' '}
              {Math.round((score / 100) * questions.length)} of{' '}
              {questions.length} correct
            </p>
          </div>

          <div className="px-5 py-4 bg-white">
            {/* Question result dots */}
            <div className="flex items-center gap-1.5 flex-wrap mb-4">
              {displayHistory.map((correct, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full ${
                    correct ? 'bg-green-400' : 'bg-red-400'
                  }`}
                  title={`Q${i + 1}: ${correct ? 'Correct' : 'Incorrect'}`}
                />
              ))}
            </div>

            <button
              onClick={handleRetry}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Retry Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------------- */
  /*  Question View                                                    */
  /* ---------------------------------------------------------------- */
  return (
    <div className="mt-10 mb-6">
      <div className="rounded-lg border border-gray-200 overflow-hidden">
        {/* Progress bar */}
        <div className="h-0.5 bg-gray-100 w-full">
          <div
            className={`h-full ${colors.accent} transition-all duration-500 rounded-r-full`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Header */}
        <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-2.5">
          <HelpCircle className="w-4 h-4 text-gray-400" />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900">
              Knowledge Check
            </h3>
          </div>
          <span className="text-xs text-gray-400 tabular-nums">
            {currentQ + 1}/{questions.length}
          </span>
        </div>

        {/* Question body */}
        <div className="px-5 py-5 bg-white">
          <p className="text-[15px] font-medium text-gray-900 mb-5 leading-relaxed">
            {question.question}
          </p>

          {/* Options */}
          <div className="space-y-2.5">
            {question.options.map((opt, i) => {
              const isSelected = selectedOption === i;
              const isCorrectOpt = i === question.correctIndex;

              let containerStyle =
                'border border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50';
              let radioStyle = 'border-2 border-gray-300 bg-white';
              let letterColor = 'text-gray-500';
              let textColor = 'text-gray-700';

              if (isSelected && !checked) {
                containerStyle = `border-2 ${colors.borderActive} ${colors.bg}`;
                radioStyle = `border-2 ${colors.borderActive} ${colors.accent}`;
                letterColor = 'text-white';
                textColor = 'text-gray-900';
              }

              if (checked) {
                if (isCorrectOpt) {
                  containerStyle = 'border-2 border-green-400 bg-green-50/80';
                  radioStyle = 'border-2 border-green-400 bg-green-500';
                  letterColor = 'text-white';
                  textColor = 'text-green-900';
                } else if (isSelected) {
                  containerStyle = 'border-2 border-red-400 bg-red-50/80';
                  radioStyle = 'border-2 border-red-400 bg-red-500';
                  letterColor = 'text-white';
                  textColor = 'text-red-900';
                } else {
                  containerStyle = 'border border-gray-200 bg-gray-50 opacity-60';
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => !checked && setSelectedOption(i)}
                  disabled={checked}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-colors flex items-center gap-3 ${containerStyle} ${
                    checked ? 'cursor-default' : 'cursor-pointer'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${radioStyle} ${letterColor}`}
                  >
                    {checked && isCorrectOpt ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : checked && isSelected && !isCorrectOpt ? (
                      <XCircle className="w-3.5 h-3.5" />
                    ) : (
                      String.fromCharCode(65 + i)
                    )}
                  </span>
                  <span className={`flex-1 ${textColor}`}>{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {checked && (
            <div
              className={`mt-4 p-3.5 rounded-lg text-sm flex items-start gap-2.5 ${
                isCorrect
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              {isCorrect ? (
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              )}
              <div className="flex-1 min-w-0">
                <p
                  className={`font-medium mb-0.5 ${
                    isCorrect ? 'text-green-800' : 'text-red-800'
                  }`}
                >
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </p>
                <p
                  className={`leading-relaxed ${
                    isCorrect ? 'text-green-700' : 'text-red-700'
                  }`}
                >
                  {question.explanation}
                </p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end mt-4 gap-2">
            {!checked ? (
              <button
                onClick={handleCheck}
                disabled={selectedOption === null}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors ${
                  selectedOption === null
                    ? 'bg-gray-300 cursor-not-allowed'
                    : `${colors.accent} hover:opacity-90`
                }`}
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white ${colors.accent} hover:opacity-90 transition-colors`}
              >
                {currentQ < questions.length - 1
                  ? 'Next Question'
                  : 'See Results'}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
