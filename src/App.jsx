import { useState, useEffect } from 'react'
import './App.css'
import Quiz from './Quiz';
import Pagination from "./pagination";
function App() {
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [showBtn, setShowBtn] = useState(false); 
    const [checker, setChecker] = useState(true);
    const [displayQuestion, setDisplayQuestion] = useState(1);
    const [selectedOption, setSelectedOption] = useState(false);
    // const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(1);
    
    const [questions, setQuestions] = useState([
  {
    text: "What is the first month of the Islamic calendar?",
    options: [
      { id: 0, text: "Rabi' al-Awwal", isCorrect: false },
      { id: 1, text: "Muharram", isCorrect: true },
      { id: 2, text: "Shawwal", isCorrect: false },
      { id: 3, text: "Safar", isCorrect: false },
    ],
  },
  {
    text: "Who was the first caliph after the Prophet Muhammad (peace be upon him)?",
    options: [
      { id: 0, text: "Ali ibn Abi Talib", isCorrect: false },
      { id: 1, text: "Abu Bakr", isCorrect: true },
      { id: 2, text: "Umar ibn al-Khattab", isCorrect: false },
      { id: 3, text: "Uthman ibn Affan", isCorrect: false },
    ],
  },
  {
    text: "What is the name of the night journey of the Prophet Muhammad (peace be upon him)?",
    options: [
      { id: 0, text: "Isra", isCorrect: true },
      { id: 1, text: "Mi'raj", isCorrect: false },
      { id: 2, text: "Hijra", isCorrect: false },
      { id: 3, text: "Qadr", isCorrect: false },
    ],
  },
  {
    text: "What is the name of the Islamic declaration of faith?",
    options: [
      { id: 0, text: "Shahada", isCorrect: true },
      { id: 1, text: "Salah", isCorrect: false },
      { id: 2, text: "Zakat", isCorrect: false },
      { id: 3, text: "Hajj", isCorrect: false },
    ],
  },
  {
    text: "Which direction do Muslims face during their prayers?",
    options: [
      { id: 0, text: "West", isCorrect: false },
      { id: 1, text: "East", isCorrect: false },
      { id: 2, text: "South", isCorrect: false },
      { id: 3, text: "Towards the Kaaba in Mecca", isCorrect: true },
    ],
  },
]);

    useEffect(() => {
  if (displayQuestion == questions.length && selectedOption) {
    setShowBtn(true);
  } else {
    setShowBtn(false);
  }
}, [displayQuestion, questions.length, selectedOption]);

    const shuffle = () => {
        const arr = [...questions];
        for (let i = arr.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
        }
        setQuestions(arr);
    };

    const checkChoice = (isCorrect) => {
      if (isCorrect) {
          setChecker(true);
          setScore(score + 1);
      }
      else{
          setChecker(false);
      }
};
    const handleRadioSelection = (e) => {
    setSelectedOption(true );
}


    const restartBtn = () => {
        shuffle();
        setScore(0);
        setDisplayQuestion(1);
        setShowResult(false);
        // setShowBtn(false);
    };

    return (
        <div className="root-container">
            {showResult ? (
                <div className="result-container">
                    <h4>Result:</h4>
                    <p>You Got {score} Out Of {questions.length}</p>
                    <button className="restart-btn" onClick={restartBtn}>Restart</button>
                </div>
            ) : (
            <>
                <div className="quiz-container">
                    <h1>Quiz App</h1>
                    <p>{displayQuestion} question out of {questions.length}</p>
                    <h4>{questions[displayQuestion-1].text}</h4>
                    
         {questions[displayQuestion-1].options.map((choice) => (
          <div className="single-choice" >
              <input
              className="rad"
             type="radio" 
             name="choose"
             key={displayQuestion-1 + choice.id}
             onClick={() => {
             handleRadioSelection();
                    checkChoice(choice.isCorrect);
                }}
                 />
          <label htmlFor="choose">{choice.text}</label>
            </div>
            ))}
        </div>
        <Pagination
                totalPosts={questions.length}
                postPerPage={postPerPage}
                setCurrentPage={setDisplayQuestion}
                currentPage={displayQuestion}
                selectedOption={!selectedOption}
                setSelectedOption={setSelectedOption}
            />
            {showBtn && (
  <button className="next-btn" onClick={() => setShowResult(true)}>
    Submit
  </button>
)}

            </>
            )}
    </div>
    );
}

export default App;