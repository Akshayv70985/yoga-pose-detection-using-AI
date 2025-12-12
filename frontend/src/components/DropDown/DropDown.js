import React, { useState, useRef, useEffect } from 'react'

import { poseImages } from '../../utils/pose_images'

import './DropDown.css'

export default function DropDown({ poseList, currentPose, setCurrentPose }) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSelect = (pose) => {
        setCurrentPose(pose)
        setIsOpen(false)
    }

    return (
        <div className='dropdown dropdown-container' ref={dropdownRef}>
            <button
                className='btn btn-secondary pose-dropdown-btn'
                type='button'
                id='pose-dropdown-btn'
                aria-expanded={isOpen}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <span>{currentPose}</span>
                <span className={`caret ${isOpen ? 'open' : ''}`}>&#9662;</span>
            </button>
            <ul className={`dropdown-menu dropdown-custom-menu ${isOpen ? 'show' : ''}`}>
                {poseList.map((pose) => (
                    <li onClick={() => handleSelect(pose)} key={pose}>
                        <div className='dropdown-item-container'>
                            <p className='dropdown-item-1'>{pose}</p>
                            <img src={poseImages[pose]} className='dropdown-img' alt={`${pose} icon`} />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}