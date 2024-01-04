import React, { useRef, useState, useEffect } from 'react';

const Cronometro = () => {
  const [startTime, setStartTime] = useState(null); // Estado para almacenar el tiempo de inicio
  const [elapsedTime, setElapsedTime] = useState(0); // Estado para almacenar el tiempo transcurrido
  const [isRunning, setIsRunning] = useState(false); // Estado para controlar si el cronómetro está en ejecución
  const intervalRef = useRef(null); // Referencia mutable para almacenar el ID del intervalo

  useEffect(() => {
    if (isRunning) {
      // Si el cronómetro está en ejecución, se inicia un intervalo que actualiza el tiempo transcurrido
      clearInterval(intervalRef.current); // Se limpia el intervalo anterior
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime); // Se actualiza el tiempo transcurrido
      }, 10);
    } else {
      clearInterval(intervalRef.current); // Si el cronómetro está detenido, se limpia el intervalo
    }

    return () => {
      clearInterval(intervalRef.current); // Limpieza del intervalo al desmontar el componente
    };
  }, [isRunning, startTime]); // useEffect se ejecuta cuando isRunning o startTime cambian

  function handleStart() {
    setIsRunning(true); // Al presionar "Start", se establece que el cronómetro está en ejecución
    setStartTime(Date.now() - elapsedTime); // Se establece el tiempo de inicio restando el tiempo transcurrido
  }

  function handleStop() {
    setIsRunning(false); // Al presionar "Stop", se establece que el cronómetro está detenido
  }

  function handleReset() {
    setIsRunning(false); // Al presionar "Reset", se establece que el cronómetro está detenido
    setStartTime(null); // Se reinicia el tiempo de inicio a null
    setElapsedTime(0); // Se reinicia el tiempo transcurrido a cero
  }

  const secondsPassed = elapsedTime / 1000; // Cálculo de los segundos transcurridos

  return (
    <>
    <h1 className='titulo'>Cronómetro hecho en React</h1>
      <h1 className='cronos'> {secondsPassed.toFixed(3)}</h1> {/* Visualización del tiempo transcurrido */}
      <button className='start' onClick={handleStart}>Start</button> {/* Botón para iniciar el cronómetro */}
      <button className='stop' onClick={handleStop}>Stop</button> {/* Botón para detener el cronómetro */}
      <button className='reset' onClick={handleReset}>Reset</button> {/* Botón para reiniciar el cronómetro */}
    </>
  );
};

export default Cronometro;