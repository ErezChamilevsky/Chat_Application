import SpeechToElement from 'speech-to-element';

export function ChangeService(isRecording, isPreparing, setIsError) {
    setIsError(false);
    if (isRecording) {
        SpeechToElement.stop();
    } else if (isPreparing) {
        setTimeout(SpeechToElement.stop, 10);
    }
}