import { Container, Placeholder } from "react-bootstrap";
import { useState, useEffect } from "react";
import polygonLeftImg from "../../images/polygon-left.svg";
import polygonRightImg from "../../images/polygon-right.svg";
import skipImg from "../../images/skip.svg";
import Logo from "../../images/QuizGrad.svg";
import startImg from "../../images/start-img.svg";
import "./Main.css";
import Swal from "sweetalert2";
import LoadingBar from "react-top-loading-bar";

const Main = () => {
  const [index, setIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinish, setFinish] = useState(0);
  let [progress, setProgress] = useState(0);
  let [isLoading, setloader] = useState(true);
  const initialTime = 180;
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  const fetchApi = () => {
    var apiURL = `https://the-trivia-api.com/v2/questions/`;
    setloader(true);
    fetch(apiURL)
      .then((result) => result.json())
      .then((data) => {
        console.log(data);

        const questionTexts = data.map((e) => e.question.text);
        setCorrectOption(data.map((e) => e.correctAnswer));

        // Combine correct and incorrect options into a single array
        const allOptions = data
          .map((e) => [e.correctAnswer, ...e.incorrectAnswers])
          .flat();

        // Shuffle the options array
        const shuffledOptions = shuffleArray(allOptions);

        setQuestions(questionTexts);
        setOptions(shuffledOptions);
        setloader(false);
      });
  };

  const shuffleArray = (options) => {
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  };

  const next = () => {
    if (index < questions.length - 1) {
      setIndex(index + 1);
      setSelectedOption(null);
      setIsChecked(false);
    }

    if (correctOption.includes(selectedOption)) {
      setScore(score + 1);
      console.log("correct", selectedOption);
    }

    if (index === questions.length - 2) {
      setFinish(true);
    }
    setProgress(progress + 10);
  };

  const previous = () => {
    if (index > 0) {
      setIndex(index - 1);
      setFinish(false);
      setProgress(progress - 10);
    }
  };

  const finish = () => {
    setProgress(progress + 10);
    Swal.fire({
      title: "Your Score",
      text: score,
      imageUrl: Logo,
      imageWidth: 400,
      imageHeight: 200,
      confirmButtonColor: "#fcc822",
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        restart();
        fetchApi();
      }
    });
  };

  const handleOptionClick = (selected) => {
    setSelectedOption(selected);
    setIsChecked(true);
  };

  const restart = () => {
    setIndex(0);
    setScore(0);
    setFinish(false);
    setIsChecked(false);
    setTimeRemaining(initialTime);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  useEffect(() => {
    fetchApi();
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeRemaining === 0) {
      restart();
    }
  }, [timeRemaining]);

  return (
    <>
      <LoadingBar
        color="#fcc822"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <main>
        <div className="questions-wrapper">
          <h1 className="questions">
            {questions.length > 0 && questions[index]}
          </h1>
        </div>
        <Container>
          {isLoading ? (
            <>
              <Placeholder as="p" animation="glow">
                <Placeholder xs={12} bg="warning" />
              </Placeholder>
              <Placeholder as="p" animation="glow">
                <Placeholder xs={12} bg="warning" />
              </Placeholder>
              <Placeholder as="p" animation="glow">
                <Placeholder xs={12} bg="warning" />
              </Placeholder>
              <Placeholder as="p" animation="glow">
                <Placeholder xs={12} bg="warning" />
              </Placeholder>
              <Placeholder as="p" animation="glow">
                <Placeholder xs={12} bg="warning" />
              </Placeholder>
              <Placeholder as="p" animation="glow">
                <Placeholder xs={12} bg="warning" />
              </Placeholder>
            </>
          ) : (
            <div className="options-wrapper">
              {options.slice(index * 4, (index + 1) * 4).map((e, optIndex) => (
                <div key={optIndex}>
                  <input
                    type="radio"
                    name="options"
                    id={`opt${optIndex + 1}`}
                    checked={e === selectedOption}
                    onChange={() => handleOptionClick(e)}
                  />
                  <label htmlFor={`opt${optIndex + 1}`}>
                    <div
                      className={`options ${
                        e === selectedOption ? "selected" : ""
                      }`}
                    >
                      <small>{String.fromCharCode(65 + optIndex)}.</small>
                      {e}
                    </div>
                  </label>
                </div>
              ))}
            </div>
          )}

          <ul className="d-flex align-items-center justify-content-between py-5">
            <li>
              <button className="btn-previous" onClick={previous}>
                <img src={polygonLeftImg} alt="image" /> Previous
              </button>
            </li>
            <li>
              <div className="timer">{formatTime(timeRemaining)}</div>
            </li>
            <li className="d-flex">
              {isFinish ? (
                <button
                  className="btn-next"
                  onClick={finish}
                  disabled={!isChecked}
                >
                  Finish
                  <img src={polygonRightImg} alt="image" />
                </button>
              ) : (
                <button
                  className="btn-next"
                  onClick={next}
                  disabled={!isChecked}
                >
                  Next
                  <img src={polygonRightImg} alt="image" />
                </button>
              )}
              <button className="btn-skip" onClick={next}>
                Skip
                <img src={skipImg} alt="image" />
              </button>
            </li>
          </ul>
        </Container>
      </main>
    </>
  );
};

export default Main;
