# React Testing Library by Kent C. Dodds

- Esta libreria se lanzo como una alternativa a Enzyme de Airbnb.
- Enzyme brinda utilidades para probar los internos de los componentes.
- Testing Library da un paso atras en lugar de probar los detalles de un componente,
  testing library pone al desarrollador en los zapatos del usuario final.
- React Testing Library no es una alternativa para jest, por que se necesitan y cada uno tiene una tarea clara

# CRA la nueva version ya tienen integrado Testing Library

- Vamos a hacer unas pruebas solo usando jest:

```javascript
// bloque de prueba
describe("true is truthy and false is falsy", () => {
  // prueba
  test("true is truthy", () => {
    expect(true).toBe(true);
  });

  // prueba
  test("false is falsy", () => {
    expect(false).toBe(false);
  });
});
```

```javascript
function sum(x, y) {
  return x + y;
}

describe("sum", () => {
  test("sums up two values", () => {
    expect(sum(2, 4)).toBe(6);
  });
});
```

- [Testing Library Doc](https://testing-library.com/)
