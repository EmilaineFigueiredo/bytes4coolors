import { useState } from "react";
import { FaRegCopy, FaLock, FaLockOpen } from "react-icons/fa";

// Função que retorna uma string com uma cor aleatória em hexadecimal 
function randomHexColor() {
    return (
        "#" +
        Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0")
    );
}

export default function Bytes4Coolors() {
    // Array de cores [{ hex: "#aabbcc", locked: false }]
    const [paleta, setPaleta] = useState([
        { hex: randomHexColor(), locked: false },
        { hex: randomHexColor(), locked: false },
        { hex: randomHexColor(), locked: false },
        { hex: randomHexColor(), locked: false },
        { hex: randomHexColor(), locked: false }
    ]);

    const [copiado, setCopiado] = useState(false);

    function gerarNovaPaleta() {
        setPaleta(
            paleta.map((cor) =>
                cor.locked ? cor : { hex: randomHexColor(), locked: false }
            )
        );
    }

    function copiarCor(hex) {
        navigator.clipboard.writeText(hex);
        setCopiado(true);
        setTimeout(() => setCopiado(false), 1000);
    }

    function bloquearCor(index) {
        setPaleta(
            paleta.map((cor, i) =>
                i === index ? { ...cor, locked: !cor.locked } : cor
            )
        );
    }

    return (
        <div className="relative w-full h-screen">
            <div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center">
                <h1 className="text-6xl text-black bg-white/80 font-medium p-6 rounded-3xl mt-5 flex items-center justify-center">
                    Bytes4Coolors </h1>
                <button className="text-md text-white bg-white/30 p-3 rounded-3xl mt-5"
                    onClick={gerarNovaPaleta}>Gerar Nova Paleta</button>
            </div>
            <div className="grid grid-cols-5 w-full h-screen">
                {paleta.map((cor, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-center text-white text-3xl p-4 gap-3"
                        style={{ backgroundColor: cor.hex }}>
                        {cor.hex}

                        <div className="flex flex-row items-center justify-center gap-2">
                            {/*Botão para copiar cor*/}
                            <button className="p-2 rounded cursor-pointer hover:bg-white/30"
                                onClick={() => copiarCor(cor.hex)}>
                                <FaRegCopy size={20} />
                            </button >

                            {/* Pop-up de cor copiada */}
                            {copiado && (
                                <div className="fixed top-4 right-4 bg-white/10 text-white px-4 py-2 rounded shadow-md z-50">
                                    Cor copiada!
                                </div>
                            )}

                            {/*Botão para bloquear a cor*/}
                            <button className="p-2 rounded cursor-pointer hover:bg-white/30"
                                onClick={() => bloquearCor(index)} >
                                {cor.locked ? <FaLock size={20} /> : <FaLockOpen size={20} />}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}