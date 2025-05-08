import SpeechToElement from 'speech-to-element';

export function ToggleWebSpeech(element, setIsRecording, setIsPreparing, setIsError) {
    setIsError(false);
    SpeechToElement.toggle('webspeech', {
        element: element.current,
        onStart: () => {
            setIsRecording(true);
            setIsPreparing(false);
        },
        onStop: () => {
            setIsRecording(false);
            setIsPreparing(false);
        },
        onError: () => {
            setIsError(true);
            setIsPreparing(false);
        },
    });
}
