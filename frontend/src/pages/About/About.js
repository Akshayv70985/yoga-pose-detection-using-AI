import React from 'react'

import './About.css'

const highlights = [
    {
        title: 'Real-time Guidance',
        description: 'Live pose detection, posture accuracy tracking, and gentle corrections inside the browser.'
    },
    {
        title: 'AI + Yoga Research',
        description: 'Built with MoveNet, TensorFlow.js, and a custom classification model trained on curated yoga datasets.'
    },
    {
        title: 'Open Source Roots',
        description: 'Community first. Explore the full codebase, learn from it, and extend it for your own mindful ideas.'
    }
]

const contactLinks = [
    { label: 'Instagram', url: 'https://www.instagram.com/codedharsh75/' },
    { label: 'YouTube', url: 'https://www.youtube.com/channel/UCiD7kslR7lKSaPGSQ-heOWg' },
    { label: 'GitHub', url: 'https://github.com/harshbhatt7585' }
]

export default function About() {
    return (
        <div className='about-page'>
            <section className='about-hero'>
                <p className='about-tagline'>Mindful technology, human guidance</p>
                <h1>About YogaIntelliJ</h1>
                <p className='about-subtitle'>
                    A realtime AI yoga trainer that helps you refine each pose through posture tracking,
                    intuitive cues, and beautifully simple visual feedback.
                </p>
            </section>

            <section className='about-grid'>
                <article className='about-card story'>
                    <h2>The Story</h2>
                    <p>
                        YogaIntelliJ began as a personal experiment to bring accurate,
                        accessible yoga guidance to anyone with a browser. The project detects
                        how well you follow a pose and shows progress in real time.
                    </p>
                    <p>
                        It predicts keypoints of each joint, feeds them into a neural classifier,
                        and highlights your virtual skeleton in green once you&apos;re aligned above 95% confidence.
                        Thanks to TensorFlow MoveNet and a custom model trained in Python,
                        the entire experience runs smoothly in TensorFlow.js.
                    </p>
                    <a
                        className='github-link'
                        href='https://github.com/harshbhatt7585/YogaIntelliJ'
                        target='_blank'
                        rel='noreferrer'
                    >
                        View the GitHub project →
                    </a>
                </article>

                <article className='about-card creator'>
                    <h2>About the Creator</h2>
                    <p>
                        I&apos;m Harsh — full-stack developer, AI enthusiast, content creator, and tutor.
                        I love sharing hands-on tech explorations, and I hope YogaIntelliJ inspires you to
                        learn, remix, and build.
                    </p>

                    <div className='contact-section'>
                        <h3>Connect</h3>
                        <div className='contact-list'>
                            {contactLinks.map((link) => (
                                <a key={link.label} href={link.url} target='_blank' rel='noreferrer'>
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </article>
            </section>

            <section className='highlight-section'>
                {highlights.map((item) => (
                    <article className='highlight-card' key={item.title}>
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                    </article>
                ))}
            </section>
        </div>
    )
}
