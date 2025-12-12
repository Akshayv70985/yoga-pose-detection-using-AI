import * as poseDetection from '@tensorflow-models/pose-detection';
import '@mediapipe/pose';
import '@tensorflow/tfjs-backend-webgl';
import * as tf from '@tensorflow/tfjs';
import React, { useRef, useState, useEffect, useCallback } from 'react'
import Webcam from 'react-webcam'
import { count } from '../../utils/music';
import { savePracticeSession } from '../../utils/progressStorage'

import Instructions from '../../components/Instrctions/Instructions'

import './Yoga.css'

import DropDown from '../../components/DropDown/DropDown'
import { poseImages } from '../../utils/pose_images'
import { POINTS, keypointConnections, poseBenefits } from '../../utils/data'
import { drawPoint, drawSegment } from '../../utils/helper'

let skeletonColor = 'rgb(255,255,255)'
let poseList = [
  'Tree', 'Chair', 'Cobra', 'Warrior', 'Dog',
  'Shoulderstand', 'Traingle'
]

let interval

// flag variable is used to help capture the time when AI just detect
// the pose as correct(probability more than threshold)
let flag = false

const formatSeconds = (value) => value.toFixed(1)

// Initialize TensorFlow backend with WebGL (WebGPU disabled for stability)
const initTensorFlowBackend = async () => {
  try {
    // Force WebGL backend (WebGPU disabled to avoid buffer allocation errors)
    await tf.setBackend('webgl')
    await tf.ready()
    console.log('✅ TensorFlow.js backend: WebGL (WebGPU disabled)')

    // Verify backend is set correctly
    const currentBackend = tf.getBackend()
    if (currentBackend !== 'webgl') {
      console.warn(`⚠️ Backend mismatch: Expected 'webgl', got '${currentBackend}'`)
    }
  } catch (error) {
    console.error('❌ Failed to set WebGL backend:', error)
    throw new Error('Failed to initialize TensorFlow.js backend: ' + error.message)
  }
}

function Yoga() {
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)
  const isCompletedRef = useRef(false)
  const breathIntervalRef = useRef(null)
  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: 'user'
  }

  const [startingTime, setStartingTime] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [poseTime, setPoseTime] = useState(0)
  const [currentPose, setCurrentPose] = useState('Tree')
  const [isStartPose, setIsStartPose] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [poseMatched, setPoseMatched] = useState(false)
  const [, setNotMatchedTimer] = useState(0) // milliseconds pose has been continuously not matched
  const [showNotMatchedWarning, setShowNotMatchedWarning] = useState(false)
  const [breathPhase, setBreathPhase] = useState(null)
  const [modelError, setModelError] = useState(null)

  // Progress tracking refs
  const accuracyScoresRef = useRef([])
  const sessionStartTimeRef = useRef(null)
  const totalDetectedTimeRef = useRef(0)

  const stopBreathingCycle = useCallback(() => {
    if (breathIntervalRef.current) {
      clearInterval(breathIntervalRef.current)
      breathIntervalRef.current = null
    }
    setBreathPhase(null)
  }, [])

  // Function to save progress when pose is completed
  const saveProgressOnCompletion = useCallback(() => {
    try {
      // Calculate average accuracy
      const accuracyScores = accuracyScoresRef.current
      const averageAccuracy = accuracyScores.length > 0
        ? Math.round(accuracyScores.reduce((sum, score) => sum + score, 0) / accuracyScores.length)
        : 0

      // Calculate total minutes (30 seconds = 0.5 minutes for completed pose)
      const totalMinutes = 0.5

      // Calculate calories based on pose intensity
      // Light: Tree, Chair (2-3 cal/min)
      // Medium: Cobra, Dog, Triangle (4-5 cal/min)
      // Intense: Warrior, Shoulderstand (6-7 cal/min)
      const intensityMap = {
        'Tree': 'light',
        'Chair': 'light',
        'Cobra': 'medium',
        'Dog': 'medium',
        'Traingle': 'medium',
        'Warrior': 'intense',
        'Shoulderstand': 'intense'
      }

      const intensity = intensityMap[currentPose] || 'medium'
      const caloriesPerMinute = {
        light: 2.5,
        medium: 4.5,
        intense: 6.5
      }

      const estimatedCalories = Math.round(totalMinutes * caloriesPerMinute[intensity])

      // Save the session
      savePracticeSession({
        minutes: totalMinutes,
        accuracy: averageAccuracy,
        calories: estimatedCalories,
        date: new Date(),
        intensity: intensity
      })

      // Reset tracking refs for next session
      accuracyScoresRef.current = []
      totalDetectedTimeRef.current = 0
    } catch (error) {
      console.error('Error saving progress:', error)
    }
  }, [currentPose])

  useEffect(() => {
    if (isCompletedRef.current) return // Stop updating if completed

    const timeDiff = (currentTime - startingTime) / 1000
    if (flag && timeDiff <= 30) {
      setPoseTime(timeDiff)
      if (timeDiff >= 30) {
        isCompletedRef.current = true
        setIsCompleted(true)
        setPoseMatched(false)
        skeletonColor = 'rgb(255,255,255)'
        // Clear the canvas to remove green skeleton overlay
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d')
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        }
        // Stop the pose detection interval
        clearInterval(interval)

        // Save progress when pose is completed
        saveProgressOnCompletion()
      }
    }
  }, [currentTime, startingTime, saveProgressOnCompletion])


  useEffect(() => {
    setCurrentTime(0)
    setPoseTime(0)
    isCompletedRef.current = false
    setIsCompleted(false)
    setPoseMatched(false)
    setNotMatchedTimer(0)
    setShowNotMatchedWarning(false)
    stopBreathingCycle()
    // Reset progress tracking
    accuracyScoresRef.current = []
    totalDetectedTimeRef.current = 0
    sessionStartTimeRef.current = null
  }, [currentPose, stopBreathingCycle])

  const CLASS_NO = {
    Chair: 0,
    Cobra: 1,
    Dog: 2,
    No_Pose: 3,
    Shoulderstand: 4,
    Traingle: 5,
    Tree: 6,
    Warrior: 7,
  }

  function get_center_point(landmarks, left_bodypart, right_bodypart) {
    let left = tf.gather(landmarks, left_bodypart, 1)
    let right = tf.gather(landmarks, right_bodypart, 1)
    const center = tf.add(tf.mul(left, 0.5), tf.mul(right, 0.5))
    return center

  }

  function get_pose_size(landmarks, torso_size_multiplier = 2.5) {
    let hips_center = get_center_point(landmarks, POINTS.LEFT_HIP, POINTS.RIGHT_HIP)
    let shoulders_center = get_center_point(landmarks, POINTS.LEFT_SHOULDER, POINTS.RIGHT_SHOULDER)
    let torso_size = tf.norm(tf.sub(shoulders_center, hips_center))
    let pose_center_new = get_center_point(landmarks, POINTS.LEFT_HIP, POINTS.RIGHT_HIP)
    pose_center_new = tf.expandDims(pose_center_new, 1)

    pose_center_new = tf.broadcastTo(pose_center_new,
      [1, 17, 2]
    )
    // return: shape(17,2)
    let d = tf.gather(tf.sub(landmarks, pose_center_new), 0, 0)
    let max_dist = tf.max(tf.norm(d, 'euclidean', 0))

    // normalize scale
    let pose_size = tf.maximum(tf.mul(torso_size, torso_size_multiplier), max_dist)
    return pose_size
  }

  function normalize_pose_landmarks(landmarks) {
    let pose_center = get_center_point(landmarks, POINTS.LEFT_HIP, POINTS.RIGHT_HIP)
    pose_center = tf.expandDims(pose_center, 1)
    pose_center = tf.broadcastTo(pose_center,
      [1, 17, 2]
    )
    landmarks = tf.sub(landmarks, pose_center)

    let pose_size = get_pose_size(landmarks)
    landmarks = tf.div(landmarks, pose_size)
    return landmarks
  }

  function landmarks_to_embedding(landmarks) {
    // normalize landmarks 2D
    landmarks = normalize_pose_landmarks(tf.expandDims(landmarks, 0))
    let embedding = tf.reshape(landmarks, [1, 34])
    return embedding
  }

  useEffect(() => {
    if (poseMatched && !isCompleted) {
      if (!breathIntervalRef.current) {
        setBreathPhase('inhale')
        breathIntervalRef.current = setInterval(() => {
          setBreathPhase((prev) => (prev === 'inhale' ? 'exhale' : 'inhale'))
        }, 4000)
      }
    } else {
      stopBreathingCycle()
    }
  }, [poseMatched, isCompleted, stopBreathingCycle])

  useEffect(() => {
    return () => {
      stopBreathingCycle()
      clearInterval(interval)
    }
  }, [stopBreathingCycle])

  const runMovenet = async () => {
    try {
      setModelError(null)

      const publicUrl = process.env.PUBLIC_URL || ''

      // Initialize TensorFlow backend
      await initTensorFlowBackend()

      // Load MoveNet detector with error handling (use official CDN-managed model)
      let detector
      try {
        console.log('Attempting to load MoveNet with default CDN configuration…')
        const detectorConfig = {
          modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
        }
        detector = await poseDetection.createDetector(
          poseDetection.SupportedModels.MoveNet,
          detectorConfig
        )
        console.log('✅ MoveNet detector loaded successfully (default/CDN)')
      } catch (detectorError) {
        console.error('❌ MoveNet detector failed to load:', detectorError)
        const errorMsg = `Failed to load MoveNet pose detection model. Please check your internet connection or any firewall/ad-blockers that might block 'www.gstatic.com'. Error: ${detectorError.message}`
        setModelError(errorMsg)
        throw new Error('MoveNet detector failed to load: ' + detectorError.message)
      }

      // Load pose classifier with local model first, then fallback to remote
      let poseClassifier
      // Construct proper path for local model (React serves public folder at root)
      const baseUrl = window.location.origin
      // Ensure no double slashes in path
      const localModelPath = `${baseUrl}${publicUrl}/models/model.json`.replace(/([^:]\/)\/+/g, '$1')
      const remoteModelPath = 'https://models.s3.jp-tok.cloud-object-storage.appdomain.cloud/model.json'

      try {
        // Try local model first
        console.log('Attempting to load pose classifier from local path:', localModelPath)
        poseClassifier = await tf.loadLayersModel(localModelPath, {
          requestInit: {
            credentials: 'same-origin',
            mode: 'cors'
          }
        })
        console.log('✅ Pose classifier loaded from local model')
      } catch (localError) {
        console.warn('Local pose classifier not found, trying remote model:', localError)
        try {
          // Fallback to remote model
          console.log('Attempting to load pose classifier from remote path:', remoteModelPath)
          poseClassifier = await tf.loadLayersModel(remoteModelPath, {
            requestInit: {
              mode: 'cors',
              credentials: 'omit'
            }
          })
          console.log('✅ Pose classifier loaded from remote model')
        } catch (remoteError) {
          console.error('❌ Failed to load pose classifier from both local and remote:', remoteError)
          const errorMsg = `Failed to load pose classification model. Please ensure the model files are in the public/models folder or check your internet connection. Error: ${remoteError.message}`
          setModelError(errorMsg)
          throw new Error('Pose classifier failed to load: ' + remoteError.message)
        }
      }

      const countAudio = new Audio(count)
      countAudio.loop = true
      interval = setInterval(() => {
        detectPose(detector, poseClassifier, countAudio)
      }, 100)
    } catch (error) {
      console.error('Error initializing models:', error)
      setModelError(error.message || 'Failed to initialize AI models. Please refresh the page and try again.')
      setIsStartPose(false)
    }
  }

  const detectPose = async (detector, poseClassifier, countAudio) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      let notDetected = 0
      const video = webcamRef.current.video
      const pose = await detector.estimatePoses(video)
      const ctx = canvasRef.current.getContext('2d')
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      try {
        const keypoints = pose[0].keypoints
        let input = keypoints.map((keypoint) => {
          if (keypoint.score > 0.4) {
            if (!(keypoint.name === 'left_eye' || keypoint.name === 'right_eye')) {
              drawPoint(ctx, keypoint.x, keypoint.y, 8, 'rgb(255,255,255)')
              let connections = keypointConnections[keypoint.name]
              try {
                connections.forEach((connection) => {
                  let conName = connection.toUpperCase()
                  drawSegment(ctx, [keypoint.x, keypoint.y],
                    [keypoints[POINTS[conName]].x,
                    keypoints[POINTS[conName]].y]
                    , skeletonColor)
                })
              } catch (err) {

              }

            }
          } else {
            notDetected += 1
          }
          return [keypoint.x, keypoint.y]
        })
        if (notDetected > 4) {
          skeletonColor = 'rgb(255,255,255)'
          if (!isCompletedRef.current) {
            setPoseMatched(false)
            flag = false
            countAudio.pause()
            countAudio.currentTime = 0
            setNotMatchedTimer((prev) => {
              const next = prev + 100
              if (next >= 3000) {
                setShowNotMatchedWarning(true)
              }
              return next
            })
          }
          return
        }
        const processedInput = landmarks_to_embedding(input)
        const classification = poseClassifier.predict(processedInput)

        classification.array().then((data) => {
          const classNo = CLASS_NO[currentPose]
          const confidence = data[0][classNo]
          console.log(confidence)

          if (confidence > 0.97 && !isCompletedRef.current) {
            setPoseMatched(true)
            setShowNotMatchedWarning(false)
            setNotMatchedTimer(0)
            if (!flag) {
              countAudio.play()
              setStartingTime(new Date(Date()).getTime())
              sessionStartTimeRef.current = new Date().getTime()
              flag = true
            }
            setCurrentTime(new Date(Date()).getTime())

            // Track accuracy (convert confidence 0.97-1.0 to percentage 0-100)
            const accuracyPercent = Math.min(100, Math.round((confidence - 0.97) / 0.03 * 100))
            accuracyScoresRef.current.push(accuracyPercent)

            // Keep only last 100 scores to avoid memory issues
            if (accuracyScoresRef.current.length > 100) {
              accuracyScoresRef.current.shift()
            }

            skeletonColor = 'rgb(0,255,0)'
          } else {
            if (!isCompletedRef.current) {
              setPoseMatched(false)
              setNotMatchedTimer((prev) => {
                const next = prev + 100
                if (next >= 3000) {
                  setShowNotMatchedWarning(true)
                }
                return next
              })
              flag = false
              skeletonColor = 'rgb(255,255,255)'
              countAudio.pause()
              countAudio.currentTime = 0
            }
          }
        })
      } catch (err) {
        console.log(err)
      }


    }
  }

  function startYoga() {
    setIsStartPose(true)
    runMovenet()
  }

  function stopPose() {
    setIsStartPose(false)
    isCompletedRef.current = false
    setIsCompleted(false)
    setPoseMatched(false)
    setNotMatchedTimer(0)
    setShowNotMatchedWarning(false)
    setPoseTime(0)
    stopBreathingCycle()
    clearInterval(interval)
    // Reset progress tracking
    accuracyScoresRef.current = []
    totalDetectedTimeRef.current = 0
    sessionStartTimeRef.current = null
  }



  if (isStartPose) {
    return (
      <div className='yoga-page live-mode'>
        {modelError && (
          <div style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(239, 68, 68, 0.95)',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            zIndex: 10000,
            maxWidth: '600px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <span style={{ fontSize: '1.2rem' }}>⚠️</span>
            <div>
              <strong>Model Loading Error</strong>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>{modelError}</p>
            </div>
            <button
              onClick={() => {
                setModelError(null)
                setIsStartPose(false)
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              Close
            </button>
          </div>
        )}
        <div className='performance-container'>
          <div className='pose-performance'>
            <p className='stat-label'>Pose Time</p>
            <h4>{formatSeconds(poseTime)} s</h4>
            {isCompleted && (
              <p className='completion-message'>Done <strong>✓</strong></p>
            )}
          </div>
          <div className='pose-performance'>
            <p className='stat-label'>Position Time</p>
            <h4>30.0 s</h4>
          </div>
        </div>

        <div className='live-stage'>
          <div className='live-feed'>
            <Webcam
              audio={false}
              width='640px'
              height='480px'
              id='webcam'
              ref={webcamRef}
              className='yoga-webcam'
              videoConstraints={videoConstraints}
              mirrored
              onUserMediaError={(error) => {
                console.error('Camera access denied or unavailable:', error)
              }}
            />
            <canvas
              ref={canvasRef}
              id='my-canvas'
              width='640px'
              height='480px'
              className='pose-overlay'
            ></canvas>
            {poseMatched && !isCompleted && (
              <div className='pose-matched-message'>
                Pose Matched
              </div>
            )}
            {showNotMatchedWarning && !poseMatched && !isCompleted && (
              <div className='pose-not-matched-message'>
                ❌ Pose Not Matched
              </div>
            )}
            {breathPhase && !isCompleted && (
              <div className={`breathing-badge ${breathPhase}`}>
                {breathPhase === 'inhale' ? 'Inhale…' : 'Exhale…'}
              </div>
            )}
          </div>
          <div className='pose-reference'>
            <div className='reference-card'>
              <p>Match the silhouette</p>
              <div className='reference-content'>
                <div className='reference-image-wrapper'>
                  <img src={poseImages[currentPose]} className='pose-img' alt={`${currentPose} reference`} />
                </div>
                <div className='benefits-section-live'>
                  <p className='benefits-label-live'>Benefits</p>
                  <ul className='benefits-list-live'>
                    {poseBenefits[currentPose] && poseBenefits[currentPose].map((benefit, index) => (
                      <li className='benefit-item-live' key={`${currentPose}-benefit-${index}`}>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='yoga-actions'>
          <button onClick={stopPose} className='secondary-btn stop-btn'>
            Stop Pose
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='yoga-page'>
      {modelError && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(239, 68, 68, 0.95)',
          color: 'white',
          padding: '1rem 1.5rem',
          borderRadius: '8px',
          zIndex: 10000,
          maxWidth: '600px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <span style={{ fontSize: '1.2rem' }}>⚠️</span>
          <div>
            <strong>Model Loading Error</strong>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>{modelError}</p>
          </div>
          <button
            onClick={() => setModelError(null)}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Close
          </button>
        </div>
      )}
      <section className='yoga-hero'>
        <div className='hero-copy'>
          <p className='hero-pill'>Live AI alignment</p>
          <h1>Choose a pose and get instant feedback</h1>
          <p>Pick a posture, read the mindful cues, then start whenever you&apos;re ready. Your webcam stays off until you launch.</p>
        </div>
        <div className='hero-dropdown'>
          <DropDown poseList={poseList} currentPose={currentPose} setCurrentPose={setCurrentPose} />
        </div>
      </section>
      <Instructions currentPose={currentPose} />
      <div className='yoga-actions'>
        <button onClick={startYoga} className='secondary-btn start-btn'>
          Start Pose
        </button>
        <p className='action-hint'>Camera activates only after you start.</p>
      </div>
    </div>
  )
}

export default Yoga