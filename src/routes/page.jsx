import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import { MicOff } from "lucide-react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function RootPage() {
    const [message, setMessage] = useState([
        {
            id: 1,
            message: "Hello World",
            role: "assistant",
        },
        {
            id: 2,
            message: "Hello World",
            role: "user",
        },
    ]);
    return (
        <main className="max-w-2xl mx-auto flex gap-2 flex-col h-svh bg-background p-2">
            <section className="flex-1 flex flex-col space-y-2 p-2 overflow-y-scroll">
                {message.map((item) => (
                    <div
                        key={item.id}
                        className={` 
                            p-2 
                            rounded-md
                            ${
                                item.role === "user"
                                    ? "bg-primary text-primary-foreground self-end"
                                    : "bg-muted text-muted-foreground self-start"
                            }`}
                    >
                        {item.message}
                    </div>
                ))}
            </section>
            <section className="border rounded-xl p-2">
                <BottomBar message={message} setMessage={setMessage} />
            </section>
        </main>
    );
}

function BottomBar({ setMessage }) {
    const [transcript, setTranscript] = useState("");

    const [isListening, setIsListening] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const recognitionRef = useRef(null);
    const silenceTimerRef = useRef(null);
    

    
    const handleStartListening = () => {
        recognitionRef?.current?.start();
    };
    const handleStopListening = () => {
        recognitionRef?.current?.stop();
    };

    useEffect(() => {
        // Check if browser supports speech recognition
        if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
            alert("Speech recognition not supported in this browser");
            return;
        }
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();

        const recognition = recognitionRef.current;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = async (event) => {
            if (silenceTimerRef.current) {
                clearTimeout(silenceTimerRef.current);
                silenceTimerRef.current = null;
            }
            const transcript = Array.from(event.results)
                .map((result) => result[0].transcript)
                .join("");
            setTranscript(transcript);
        };

        recognition.onstart = () => {
            setIsListening(true);
        };
        recognition.onend = () => {
            setIsListening(false);
        };
        recognition.onerror = () => {
            setIsListening(false);
        };
    }, []);

    return (
        <div className="flex gap-2">
            <div className="flex-1 p-1 border rounded-md">{transcript}</div>
            <Button
                variant={"default"}
                disabled={isListening}
                onClick={handleStartListening}
                className={"cursor-pointer"}
            >
                <Mic size={20} />
                Start Listening
            </Button>
            <Button
                variant={"destructive"}
                disabled={!isListening}
                onClick={handleStopListening}
                className={"cursor-pointer"}
            >
                <MicOff size={20} />
                Stop Listening
            </Button>
        </div>
    );
}
