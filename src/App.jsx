import { useState, useEffect } from "react";
import axios from "axios";
import Loading from './loading'
import "./App.css";


function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [finalAnswer, setFinalAnswer] = useState(null);
  const [answerStatus, setAnswerStatus] = useState({}); // Stores color status
  const [isSubmitted, setIsSubmitted] = useState(false); // Controls Next button visibility

  useEffect(() => {
    axios
      .get("https://quiztest-8vw1.onrender.com/python")
      .then((response) => {
        setQuestions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // Handle Next Question
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null); // Reset selection
      setFinalAnswer(null); // Reset answer
      setAnswerStatus({}); // Reset color
      setIsSubmitted(false); // Hide Next button until next submit
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedOption(null);
      setFinalAnswer(null);
      setAnswerStatus({});
      setIsSubmitted(false);
    }
  };
if(loading){
  return <>
  <div className="body99"  > <div class="content">
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
    </div></div>
  </>
}
  const handleSubmit = () => {
    if (selectedOption === null) return; // Prevent submitting without selection

    const correctAnswer = questions[currentIndex].answer;
    setFinalAnswer(selectedOption);
    setAnswerStatus((prev) => ({
      ...prev,
      [correctAnswer]: "greenyellow",
      [selectedOption]: selectedOption === correctAnswer ? "greenyellow" : "red",
    }));
    setIsSubmitted(true); // Show Next button after submission
  };

  return (<>
  <h1>Quiz</h1>
    <div className="body">
    <div className="body1">
      {loading ? (
        <></>
      ) : (
        <>
        <div className="questions">
          <h2>{currentIndex+1}. {questions[currentIndex].question}</h2>
          {questions[currentIndex].options.map((option, index) => (
            <h4 key={index} style={{ color: answerStatus[index] || "white" }}>
              <input
              className="option-input"
                type="radio"
                value={index}
                name="opt"
                checked={selectedOption === index}
                onChange={() => setSelectedOption(index)}
              />{" "}
              {option}
            </h4>
          ))}
          </div>
          <div className="buttons">
          <button onClick={handleSubmit} disabled={isSubmitted}>Submit</button>
          <button onClick={handlePrevious} disabled={currentIndex<=0}>Previous</button>
          <button onClick={handleNext} disabled={!isSubmitted} >Next</button>
          </div>
        </>
      )}
    </div>
    
    </div>
    <h6 > Team <a href="https://decode-your-course.netlify.app"> DYC</a> and <a href="https://decode-your-course.netlify.app">STS</a> </h6>
    </>
  );
}

export default App;
