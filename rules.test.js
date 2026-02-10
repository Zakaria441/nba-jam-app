// rules.test.js

import { calcularNuevoMarcador, determinarGanador, validarPuntos } from './rules';

// TESTS DE CÁLCULO DE MARCADOR
describe('calcularNuevoMarcador', () => {
  
  test('Si tengo 10 puntos y anoto una canasta de 2, el resultado debe ser 12', () => {
    const resultado = calcularNuevoMarcador(10, 2);
    expect(resultado).toBe(12);
  });

  test('Si tengo 10 puntos y anoto un triple (3), el resultado debe ser 13', () => {
    const resultado = calcularNuevoMarcador(10, 3);
    expect(resultado).toBe(13);
  });

  test('Si tengo 0 puntos y anoto 2, el resultado debe ser 2', () => {
    const resultado = calcularNuevoMarcador(0, 2);
    expect(resultado).toBe(2);
  });

  test('Si tengo 25 puntos y anoto 3, el resultado debe ser 28', () => {
    const resultado = calcularNuevoMarcador(25, 3);
    expect(resultado).toBe(28);
  });

  test('Si tengo 100 puntos y anoto 2, el resultado debe ser 102', () => {
    const resultado = calcularNuevoMarcador(100, 2);
    expect(resultado).toBe(102);
  });
});

// TESTS DE DETERMINAR GANADOR
describe('determinarGanador', () => {
  
  test('Si el local tiene 50 y el visitante 40, gana el local', () => {
    const resultado = determinarGanador(50, 40);
    expect(resultado).toBe('local');
  });

  test('Si el local tiene 30 y el visitante 45, gana el visitante', () => {
    const resultado = determinarGanador(30, 45);
    expect(resultado).toBe('visitante');
  });

  test('Si ambos tienen 50, es empate', () => {
    const resultado = determinarGanador(50, 50);
    expect(resultado).toBe('empate');
  });

  test('Si ambos tienen 0, es empate', () => {
    const resultado = determinarGanador(0, 0);
    expect(resultado).toBe('empate');
  });
});

// TESTS DE VALIDACIÓN DE PUNTOS
describe('validarPuntos', () => {
  
  test('2 puntos es válido', () => {
    const resultado = validarPuntos(2);
    expect(resultado).toBe(true);
  });

  test('3 puntos es válido', () => {
    const resultado = validarPuntos(3);
    expect(resultado).toBe(true);
  });

  test('1 punto NO es válido', () => {
    const resultado = validarPuntos(1);
    expect(resultado).toBe(false);
  });

  test('4 puntos NO es válido', () => {
    const resultado = validarPuntos(4);
    expect(resultado).toBe(false);
  });

  test('0 puntos NO es válido', () => {
    const resultado = validarPuntos(0);
    expect(resultado).toBe(false);
  });
});