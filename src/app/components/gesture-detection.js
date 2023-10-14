// import rock from "/assets/rock.png";
// import scissors from "/assets/scissors.png";
// import paper from "/assets/paper.png";
import { RockGesture, PaperGesture, ScissorsGesture } from "./gestures";
import { HandPose } from "@tensorflow-models/handpose";
import { GestureEstimator } from "fingerpose";

// store references
let handposeModel, gestureEstimator;

const Prediction = {
  init: async function () {
    // initialize finger gesture recognizer with known gestures
    const knownGestures = [RockGesture, PaperGesture, ScissorsGesture];
    gestureEstimator = new GestureEstimator(knownGestures);
    console.log(
      "Initialized FingerPose with " + knownGestures.length + " gestures"
    );

    // load handpose model
    console.log("Loading handpose model...");
    handposeModel = await HandPose.load();
    console.log("Model loaded");

    // make one prediction on a sample image
    // this is to "warm up" the model so there won't be a delay
    // before the actual predictions later
    // console.log("Warm up model");
    // const sample = await SampleImage.create();
    // await handposeModel.estimateHands(sample, false);
    // console.log("Model is hot!");
  },

  predictGesture: async function (sourceElement, minimumScore) {
    const predictions = await handposeModel.estimateHands(sourceElement, false);

    if (predictions.length > 0) {
      // detect gestures
      const gestureEstimations = gestureEstimator.estimate(
        predictions[0].landmarks,
        minimumScore
      );

      // get gesture with highest match score
      if (gestureEstimations.gestures.length > 0) {
        // this will reduce an array of results to a single value
        // containing only the gesture with the highest score
        const gestureResult = gestureEstimations.gestures.reduce((p, c) => {
          return p.confidence > c.confidence ? p : c;
        });

        return gestureResult.name;
      }
    }

    return "";
  },
};

export const detectPlayerGesture = () => {
  let lastGesture = "";
  let gestureDuration = 0;

  const predictNonblocking = () => {
    setInterval(() => {
      const predictionStartTS = Date.now();

      // predict gesture (require high confidence)
      Prediction.predictGesture(playerVideo, 9).then((playerGesture) => {
        if (playerGesture != "") {
          if (playerGesture == lastGesture) {
            // player keeps holding the same gesture
            // -> keep timer running
            const deltaTime = Date.now() - predictionStartTS;
            gestureDuration += deltaTime;
          } else {
            // detected a different gesture
            // -> reset timer
            UI.setPlayerHand(playerGesture);
            lastGesture = playerGesture;
            gestureDuration = 0;
          }
        } else {
          UI.setPlayerHand(false);
          lastGesture = "";
          gestureDuration = 0;
        }

        if (gestureDuration < requiredDuration) {
          // update timer and repeat
          UI.setTimerProgress(gestureDuration / requiredDuration);
          predictNonblocking();
        } else {
          // player result available
          // -> stop timer and check winner
          UI.setTimerProgress(1);
          UI.animatePlayerHand();

          // let computer make its move
          const computerGesture = getRandomGesture();

          // check the game result
          checkResult(playerGesture, computerGesture);
        }
      });
    }, 0);
  };

  predictNonblocking();
};
