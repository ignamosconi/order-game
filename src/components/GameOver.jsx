import { useState, useEffect, useRef } from "react";

function GameOver({ numero }) {
    const [verGrilla, setVerGrilla] = useState(false);
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const cantGotas = window.innerWidth < 640 ? 40 : 200;
        const drops = Array.from({ length: cantGotas }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            length: Math.random() * 30 + 15,
            speed: Math.random() * 10 + 10,
            opacity: Math.random() * 0.6 + 0.3,
        }));

        let animId;
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drops.forEach(d => {
                ctx.beginPath();
                ctx.moveTo(d.x, d.y);
                ctx.lineTo(d.x - 2, d.y + d.length);
                ctx.strokeStyle = `rgba(100, 180, 255, ${d.opacity})`;
                ctx.lineWidth = 2.5;
                ctx.stroke();
                d.y += d.speed;
                if (d.y > canvas.height) {
                    d.y = -d.length;
                    d.x = Math.random() * canvas.width;
                }
            });
            animId = requestAnimationFrame(draw);
        }
        draw();
        return () => cancelAnimationFrame(animId);
    }, []);

    return (
        <>
            <canvas ref={canvasRef} className="confettiCanvas" />
            {!verGrilla && (
                <div className="overlay">
                    <div className="overlayCard overlayCardLose">
                        <div className="overlayEmoji">💀</div>
                        <h2 className="overlayTitle overlayTitleLose">¡PERDISTE!</h2>
                        <p className="overlayText">
                            Se generó el número <strong>{numero}</strong>, pero éste no
                            puede colocarse en ningún casillero disponible.
                        </p>
                        <button className="retryBtn" onClick={() => setVerGrilla(true)}>
                            Ver grilla
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default GameOver;