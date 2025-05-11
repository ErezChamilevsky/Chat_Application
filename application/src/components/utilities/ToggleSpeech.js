import SpeechToElement from 'speech-to-element';

export function ToggleWebSpeech({ targetElement, setIsRecording, setIsPreparing, setIsError, onResult }) {
    setIsError(false);

    SpeechToElement.toggle('webspeech', {
        element: targetElement.current,
        onStart: () => {
            setIsRecording(true);
            setIsPreparing(false);
        },
        onStop: () => {
            setIsRecording(false);
            setIsPreparing(false);

            if (onResult && targetElement.current) {
                const finalText = targetElement.current.innerText;
                onResult(finalText);
                targetElement.current.innerText = ''; // Clear the content after reading
            }
        },
        onError: () => {
            setIsError(true);
            setIsPreparing(false);
        },
    });
}
