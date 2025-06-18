import { useEffect, useRef, useState } from "react";



interface Props {
    length?: number;
    duration?: number;
    onComplete: (code: string) => void
}

export const ValidateEmailForm = ({ length, duration, onComplete }: Props) => {

    const [code, setcode] = useState<string[]>(Array(length).fill(""));
    const [timeLeft, setTimeLeft] = useState<number | undefined>(duration);
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);


    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev! <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev! - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const storedExpiration = localStorage.getItem("codeExpiration");

        if (storedExpiration) {
            const expiresAt = parseInt(storedExpiration, 10);
            const now = Math.floor(Date.now() / 1000);
            const diff = expiresAt - now;

            setTimeLeft(diff > 0 ? diff : 0);
        } else {
            const expiresAt = Math.floor(Date.now() / 1000) + duration!;
            localStorage.setItem("codeExpiration", expiresAt.toString());
            setTimeLeft(duration);
        }
    }, []);


    useEffect(() => {
        if (code.every((char) => char !== "")) {
            onComplete?.(code.join(""));
            localStorage.removeItem("codeExpiration"); // limpiar si ya no se necesita
        }
    }, [code])

    const handleChange = (value: string, index: number) => {

        if (!/^\d?$/.test(value)) return; // solo números de un solo dígito

        const newCode = [...code];
        newCode[index] = value;
        setcode(newCode);

        if (value && index < length! - 1) {
            inputsRef.current[index + 1]?.focus();
        }

    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && code[index] === "" && index > 0) {
            const newCode = [...code];
            newCode[index - 1] = "";
            setcode(newCode);
            inputsRef.current[index - 1]?.focus();
        }
    }

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(+seconds / 60);
        const secs = +seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}m`;
    };

  

    return (
        <form className="space-y-4 w-100 mr-10 ml-10 mb-10 mt-5">

            <div className="flex flex-col items-center space-y-4">
                {/* Campos de código */}
                <div className="flex gap-2">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={(el) => { inputsRef.current[index] = el }}
                            className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ))}
                </div>

                {/* Contador */}
                {
                    timeLeft !== undefined && (
                        <p className="text-sm text-gray-600">
                            El código expira en <span className="font-semibold text-red-600">{formatTime(timeLeft)}</span>
                        </p>
                    )
                }
            </div>

        </form>
    )
}
