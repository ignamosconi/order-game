import { useEffect, useRef, useState } from "react";

function WinScreen({ board, onRetry }) {
    const canvasRef = useRef(null);
    const [verGrilla, setVerGrilla] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const colors = ["#ffe95e", "#ffd6f4", "#d8ffff", "#fff8a7", "#ff6b6b", "#8de8ff"];
        const particles = Array.from({ length: 120 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 10 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 4 + 2,
            swing: Math.random() * 3 - 1.5,
            angle: Math.random() * 360,
        }));
        let animId;
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.angle * Math.PI) / 180);
                ctx.fillStyle = p.color;
                ctx.strokeStyle = "black";
                ctx.lineWidth = 2;
                ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r);
                ctx.strokeRect(-p.r / 2, -p.r / 2, p.r, p.r);
                ctx.restore();
                p.y += p.speed;
                p.x += p.swing;
                p.angle += 3;
                if (p.y > canvas.height) {
                    p.y = -20;
                    p.x = Math.random() * canvas.width;
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
                    <div className="overlayCard">
                        <div className="overlayEmoji">🏆</div>
                        <h2 className="overlayTitle">¡GANASTE!</h2>
                        <p className="overlayText">
                            Llenaste los 20 casilleros en orden ascendente.
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

export default WinScreen;