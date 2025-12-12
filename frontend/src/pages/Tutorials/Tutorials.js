import React from 'react'
import { Link } from 'react-router-dom'

import './Tutorials.css'

import { tutorials, fixCamera } from '../../utils/data'

const sections = [
    {
        title: 'Basic Tutorials',
        description: 'Follow these mindful steps to start training with confidence.',
        entries: tutorials
    },
    {
        title: 'Camera Not Working?',
        description: 'Quick troubleshooting tips to get your live guidance back online.',
        entries: fixCamera
    }
]

export default function Tutorials() {
    return (
        <div className='tutorials-page'>
            <section className='tutorials-hero'>
                <p className='hero-tagline'>Flow-ready guidance</p>
                <h1>Your calm companion for getting started</h1>
                <p className='hero-subtitle'>
                    From choosing your pose to troubleshooting your webcam, these tips keep your AI trainer
                    running smoothly.
                </p>
                <div className='hero-cta'>
                    <Link to='/start'>
                        <button className='hero-button'>Jump into a session</button>
                    </Link>
                </div>
            </section>

            <section className='tutorials-grid'>
                {sections.map((section) => (
                    <article className='tutorial-card' key={section.title}>
                        <h2>{section.title}</h2>
                        <p className='card-description'>{section.description}</p>
                        <ul>
                            {section.entries.map((entry, index) => (
                                <li key={entry}>
                                    <span className='bullet'>{index + 1}</span>
                                    <p>{entry}</p>
                                </li>
                            ))}
                        </ul>
                    </article>
                ))}
            </section>
        </div>
    )
}
