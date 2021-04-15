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

# 2 - React Testing Library: Rendering a component

tag: 2-rendering-comp

- Como mencionamos anterior mente CRA ya tiene integrado RTL por default.
- Si es algo personalizado (webpack, etc) se tienen que instalar.
- Vamos a ver como renderizar un componente usando RTL usando el archivo App.js

App.js:

```javascript
import React from "react";

const title = "Hello React";

function App() {
  return <div>{title}</div>;
}

export default App;
```

App.test.js

```javascript
import React from "react";
import { render } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  test("renders App component", () => {
    render(<App />);
  });
});
```

TRL para acceder al componente renderizado usa el metodo screen y podemos depurarlo con debug, vamos a a agregarlo:

```javascript
import React from "react";
import { render, screen } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  test("renders App component", () => {
    render(<App />);

    screen.debug();
  });
});
```

- Lo bueno es que TRL no se preocupa mucho por los componentes reales.
- Todos los sig componentes usan diferentes caracteristicas de react (useState, eventhandler, props) y conceptos controlados, vamos a crear el componente App.js:

```javascript
import React from "react";

function App() {
  const [search, setSearch] = React.useState("");

  function handleChange(event) {
    setSearch(event.target.value);
  }

  return (
    <div>
      <Search value={search} onChange={handleChange}>
        Search:
      </Search>

      <p>Searches for {search ? search : "..."}</p>
    </div>
  );
}

function Search({ value, onChange, children }) {
  return (
    <div>
      <label htmlFor="search">{children}</label>
      <input id="search" type="text" value={value} onChange={onChange} />
    </div>
  );
}

export default App;
```

# 3 - React Testing Library: Selecting Elements

tag: 3-selecting-elements

- Una vez renderizado el componente, RTL ofrece diferentes funciones de busqueda para capturar elementos.
- Esos elementos se utilizan luego para afirmaciones o interacciones de usuarios, vamos a ver como:

```javascript
import React from "react";
import { render, screen } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  test("renders App component", () => {
    render(<App />);

    screen.getByText("Search:");
  });
});
```

- Agreguemos una asercion para verificar el elemento en el DOM

```javascript
expect(screen.getByText("Search:")).toBeInTheDocument();
```

# 4 - React Testing Library: Search Types

tag: 4-search-types

- Hemos aprendido acerca de getByText donde text es uno de los varios tipos de búqueda.
- buscar por text es de los mas comunes otro fuerte es el role getByRole https://testing-library.com/docs/queries/byrole
- getByRole se usa para recuperar elementos por atributos aria-label y valores implicitos en los elementos HTML.

```javascript
const OtherComponent = () => {
  return (
    <div>
      <label htmlFor="search">Buscar</label>
      <input
        id="search"
        type="text"
        placeholder="Search placeholder"
        value="Javascript"
        onChange={(f) => f}
      />
    </div>
  );
};

describe("OtherComponent", () => {
  test("renders OtherComponent component", async () => {
    render(<OtherComponent />);

    // LabelText
    expect(screen.getByLabelText("Buscar")).toBeInTheDocument();
    // PlaceholderText
    expect(
      screen.getByPlaceholderText("Search placeholder")
    ).toBeInTheDocument();
    // DisplayValuev
    expect(screen.getByDisplayValue("Javascript")).toBeInTheDocument();
  });
});
```

# 5 - React Testing Library: Search Variants

tag: 5-search-variants

- A diferencia de los tipos de busqueda y tambien existen variantes de tipo de búsqueda.
- Una de las variantes es getBy que se usa para getByText o getByRole.
- Existen otras dos variantes de busqueda que son queryBy y findBy (ambas pueden ampliarse con los mismos tipos de búsqueda a los que tienen acceso getBy) por ejemplo (diapo)
- Cual es la diferencia entre getBy vs queryBy?
  - getBy devuelve un elemento o un error, que devuelva error es un efecto secundario que nos ayuda a notar tempranamente si algo esta mal en nuestra prueba.
  - queryBy variante se usa cada vez que afirme que un elemento no esta alli
  - findBy variante se usa para elementos asincronos que eventualmente estaran allí (el componente se actualiza y se vuelve a rendizar y luego la representacion condicional deberia representar "Signed in as")

```javascript
import React from "react";
import { render, screen } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  test("renders App component", async () => {
    render(<App />);

    // primero solo depues agregar el screen.findByText
    expect(screen.queryByText(/Signed in as/)).toBeNull();
    // activar al ultimo
    screen.debug();
    expect(await screen.findByText(/Signed in as/)).toBeInTheDocument();
    // activar al ultimo
    screen.debug();
  });
});
```
