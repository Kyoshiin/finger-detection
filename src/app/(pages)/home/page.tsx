"use client";
import Image from "next/image";
import React from "react";
import "./page.css";
import PlayerVideo from "@/app/components/PlayerVideo";

// import { UI } from "@/js/UI";
// import { Prediction } from "./js/Prediction";

// import camConfig from "@/js/CameraConfig";

// // store a reference to the player video
// var playerVideo;

// // keep track of scores
// var playerScore = 0,
//   computerScore = 0;

// // setyp & initialization
// // -----------------------------------------------------------------------------
// async function onInit() {
//   UI.init();
//   UI.setStatusMessage("Initializing - Please wait a moment");

//   const videoPromise = UI.initPlayerVideo(camConfig);
//   const predictPromise = Prediction.init();

//   console.log("Initialize game...");

//   Promise.all([videoPromise, predictPromise]).then((result) => {
//     // result[0] will contain the initialized video element
//     playerVideo = result[0];
//     playerVideo.play();

//     console.log("Initialization finished");

//     // game is ready
//     waitForPlayer();
//   });
// }
// //-----

// // game logic
// // -----------------------------------------------------------------------------
// function waitForPlayer() {
//   // show a blinking start message
//   if (UI.isMobile()) {
//     UI.setStatusMessage("Touch the screen to start");
//   } else {
//     UI.setStatusMessage("Press any key to start");
//   }

//   UI.startAnimateMessage();

//   const startGame = () => {
//     UI.stopAnimateMessage();
//     playOneRound();
//   };

//   // wait for player to press any key
//   // then stop blinking and play one round
//   if (UI.isMobile()) {
//     document.addEventListener("touchstart", startGame, { once: true });
//   } else {
//     window.addEventListener("keypress", startGame, { once: true });
//   }
// }

// async function playOneRound() {
//   // show robot waiting for player
//   UI.showRobotImage(true);

//   // hide the timer circle
//   UI.showTimer(false);
//   UI.setTimerProgress(0);
//   UI.setPlayerHand("");

//   // ready - set - show
//   // wait for countdown to finish
//   await UI.startCountdown();

//   // show the timer circle
//   UI.showTimer(true);

//   // start detecting player gestures
//   // required duration 150ms ~ 4-5 camera frames
//   detectPlayerGesture(150);
// }

// function detectPlayerGesture(requiredDuration) {
//   let lastGesture = "";
//   let gestureDuration = 0;

//   const predictNonblocking = () => {
//     setTimeout(() => {
//       const predictionStartTS = Date.now();

//       // predict gesture (require high confidence)
//       Prediction.predictGesture(playerVideo, 9).then((playerGesture) => {
//         if (playerGesture != "") {
//           if (playerGesture == lastGesture) {
//             // player keeps holding the same gesture
//             // -> keep timer running
//             const deltaTime = Date.now() - predictionStartTS;
//             gestureDuration += deltaTime;
//           } else {
//             // detected a different gesture
//             // -> reset timer
//             UI.setPlayerHand(playerGesture);
//             lastGesture = playerGesture;
//             gestureDuration = 0;
//           }
//         } else {
//           UI.setPlayerHand(false);
//           lastGesture = "";
//           gestureDuration = 0;
//         }

//         if (gestureDuration < requiredDuration) {
//           // update timer and repeat
//           UI.setTimerProgress(gestureDuration / requiredDuration);
//           predictNonblocking();
//         } else {
//           // player result available
//           // -> stop timer and check winner
//           UI.setTimerProgress(1);
//           UI.animatePlayerHand();

//           // let computer make its move
//           const computerGesture = getRandomGesture();

//           // check the game result
//           checkResult(playerGesture, computerGesture);
//         }
//       });
//     }, 0);
//   };

//   predictNonblocking();
// }

// function checkResult(playerGesture, computerGesture) {
//   let statusText;
//   let playerWins = false;
//   let computerWins = false;

//   if (playerGesture == computerGesture) {
//     // draw
//     statusText = "It's a draw!";
//   } else {
//     // check whinner
//     if (playerGesture == "rock") {
//       if (computerGesture == "scissors") {
//         playerWins = true;
//         statusText = "Rock beats scissors";
//       } else {
//         computerWins = true;
//         statusText = "Paper beats rock";
//       }
//     } else if (playerGesture == "paper") {
//       if (computerGesture == "rock") {
//         playerWins = true;
//         statusText = "Paper beats rock";
//       } else {
//         computerWins = true;
//         statusText = "Scissors beat paper";
//       }
//     } else if (playerGesture == "scissors") {
//       if (computerGesture == "paper") {
//         playerWins = true;
//         statusText = "Scissors beat paper";
//       } else {
//         computerWins = true;
//         statusText = "Rock beats scissors";
//       }
//     }
//   }

//   if (playerWins) {
//     playerScore++;
//     statusText += " - You win!";
//   } else if (computerWins) {
//     computerScore++;
//     statusText += " - The robot wins!";
//   }

//   UI.showRobotHand(true);
//   UI.setRobotGesture(computerGesture);

//   UI.setStatusMessage(statusText);

//   UI.setPlayerScore(playerScore);
//   UI.setRobotScore(computerScore);

//   // wait for 3 seconds, then start next round
//   setTimeout(playOneRound, 3000);
// }

// function getRandomGesture() {
//   const gestures = ["rock", "paper", "scissors"];
//   const randomNum = Math.floor(Math.random() * gestures.length);
//   return gestures[randomNum];
// }
// //-----
// onInit();

const Homepage = () => {
  return (
    <div id="root">
      <h1>Let's play Rock ✊ Paper 🤚 Scissors ✌</h1>

      <p className="instructions">
        After the countdown, show a hand gesture and hold it for a moment. The
        computer will then make its move (don't worry, it doesn't cheat).
      </p>

      <div className="game-container">
        <div className="player">
          <h2 className="player-headline">
            <span className="nick">Human</span>
            <span className="score" id="score1">
              0
            </span>
          </h2>

          <div className="player-container">
            <PlayerVideo />
            <div className="player-hand-container">
              {/* <!-- shows the current recognized gesture --> */}
              <div id="player-hand" className="player-hand"></div>

              {/* <!-- show the timer progress --> */}
              <svg
                id="timer-ring"
                className="timer-ring"
                height="100"
                width="100"
              >
                <circle
                  className="timer-ring-circle"
                  stroke-width="6"
                  stroke="white"
                  fill="transparent"
                  r="38"
                  cx="50"
                  cy="50"
                />
                <circle
                  id="timer-ring-circle"
                  className="timer-ring-circle"
                  stroke-width="6"
                  stroke="blue"
                  fill="transparent"
                  r="38"
                  cx="50"
                  cy="50"
                />
              </svg>
            </div>
            P
          </div>
        </div>

        <div className="player">
          <h2 className="player-headline">
            <span className="nick">Robot</span>
            <span className="score" id="score2">
              0
            </span>
          </h2>
          <div className="robot-container">
            <Image
              id="robot"
              width="620"
              height={420}
              className="avatar"
              src="/assets/robot.gif" ////TODO: CHANGE
              alt=""
            />
            {/* <Image src="robot" id="robot-hand" className="robot-hand" alt="" /> */}
          </div>
        </div>

        <div className="messages">
          <span id="message" className="message-text message-fadeInOut"></span>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
