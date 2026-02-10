// rules.js

/**
 * Calcula el nuevo marcador después de anotar puntos
 * @param {number} puntajeActual - El puntaje actual del equipo
 * @param {number} puntosASumar - Los puntos a sumar (2 o 3)
 * @returns {number} El nuevo puntaje total
 */
export const calcularNuevoMarcador = (puntajeActual, puntosASumar) => {
  return puntajeActual + puntosASumar;
};

/**
 * Determina el ganador del partido
 * @param {number} puntosLocal - Puntos del equipo local
 * @param {number} puntosVisitante - Puntos del equipo visitante
 * @returns {string} 'local', 'visitante' o 'empate'
 */
export const determinarGanador = (puntosLocal, puntosVisitante) => {
  if (puntosLocal > puntosVisitante) {
    return 'local';
  } else if (puntosVisitante > puntosLocal) {
    return 'visitante';
  } else {
    return 'empate';
  }
};

/**
 * Valida que los puntos sean válidos (2 o 3)
 * @param {number} puntos - Los puntos a validar
 * @returns {boolean} true si son válidos, false si no
 */
export const validarPuntos = (puntos) => {
  return puntos === 2 || puntos === 3;
};