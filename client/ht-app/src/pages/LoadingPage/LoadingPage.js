import React from 'react'
import logo from '../../assets/ht-logo.png'
import progressBar from '../../assets/circular.png'
import './LoadingPage.css'

export default function LoadingPage() {
  return (
    <div className="p-loading">
        <img className="ht-logo" src={logo} alt="HT compant logo" />
        <img className="circular-dots" src={progressBar} alt="HT Bioimaging"/>
    </div>
  )
}
