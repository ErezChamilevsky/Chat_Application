import React from 'react';
import './css/indicator-loading.css'

function LoadingIndicator() {
    return (
        <div className="d-flex justify-content-start mb-2">
            <div
                className="px-3 py-2 rounded"
                style={{
                    backgroundColor: '#f0f0f0',
                    color: '#000',
                    maxWidth: '80%',
                    borderRadius: '12px',
                }}
            >
                <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    );
}

export default LoadingIndicator;

