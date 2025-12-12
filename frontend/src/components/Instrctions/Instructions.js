import React from 'react'

import { poseInstructions } from '../../utils/data'

import { poseImages } from '../../utils/pose_images'

import './Instructions.css'

export default function Instructions({ currentPose }) {
    return (
        <div className='instructions-card'>
            <div className='instructions-copy'>
                <p className='instructions-label'>Pose guide</p>
                <h3>{currentPose} Pose</h3>
                <ul className='instructions-list'>
                    {poseInstructions[currentPose].map((instruction, index) => (
                        <li className='instruction' key={`${currentPose}-${index}`}>
                            {instruction}
                        </li>
                    ))}
                </ul>
            </div>
            <div className='instructions-visual'>
                <div className='visual-frame'>
                    <img className='pose-demo-img' src={poseImages[currentPose]} alt={`${currentPose} demo`} />
                </div>
            </div>
        </div>
    )
}
