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

- Hemos aprendido acerca de getByText donde text es uno de los varios tipos de b??queda.
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

- A diferencia de los tipos de busqueda y tambien existen variantes de tipo de b??squeda.
- Una de las variantes es getBy que se usa para getByText o getByRole.
- Existen otras dos variantes de busqueda que son queryBy y findBy (ambas pueden ampliarse con los mismos tipos de b??squeda a los que tienen acceso getBy) por ejemplo (diapo)
- Cual es la diferencia entre getBy vs queryBy?
  - getBy devuelve un elemento o un error, que devuelva error es un efecto secundario que nos ayuda a notar tempranamente si algo esta mal en nuestra prueba.
  - queryBy variante se usa cada vez que afirme que un elemento no esta alli
  - findBy variante se usa para elementos asincronos que eventualmente estaran all?? (el componente se actualiza y se vuelve a rendizar y luego la representacion condicional deberia representar "Signed in as")

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

- Para acceder a miltiples elememntos existen (todos devuelven un array de elementos):
  - getAllBy
  - queryAllBy
  - findAllBy

## Assertive Functions (ver en el diap) https://github.com/testing-library/jest-dom

# 6 - React Testing Library: Fire Event

tag: 6-fire-event

- hasta aqui solo hemos probado si un elemento es renderizado.

- Que pasa con las intereacciones reales del usuario:

  - Escribir en un input
  - podemos usar la funcion fireEvent de RTL para simular interacciones de un usuario final.

```javascript
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  test("renders App component", () => {
    render(<App />);

    screen.debug();

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "JavaScript" },
    });

    screen.debug();
  });
});
```

- FireEvent toma un elemento y un evento.
- Si el comp esta involucarado en una tarea asincrona se espera ah que concluya

```javascript
describe("App", () => {
  test("renders App component", async () => {
    render(<App />);

    // wait for the user to resolve
    // needs only be used in our special case
    await screen.findByText(/Signed in as/);

    screen.debug();

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "JavaScript" },
    });

    screen.debug();
  });
});
```

- Posteriormente, podemos hacer las afirmaciones de antes y despu??s del evento:

```javascript
describe("App", () => {
  test("renders App component", async () => {
    render(<App />);

    // wait for the user to resolve
    // needs only be used in our special case
    await screen.findByText(/Signed in as/);

    // para eso usamos findQuery
    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "JavaScript" },
    });

    // para eso usamos findQuery
    expect(screen.getByText(/Searches for JavaScript/)).toBeInTheDocument();
  });
});
```

# 7 - React Testing Library: User Event

tag: 7-user-event

- RTL viene con una biblioteca de User event extendida que se acumula sobre el API fireEvent.
- fireEvent activva interacciones del usuario y podemos reemplazarla por UserEvent para poder desencadenar type.
- fireEvent funcinoa con change y userEvent con type (esto ayuda para usar keyDown, KeyPress y KeyUp)

```javascript
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";
s;
describe("App", () => {
  test("renders App component", async () => {
    render(<App />);

    // wait for the user to resolve
    await screen.findByText(/Signed in as/);

    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();

    await userEvent.type(screen.getByRole("textbox"), "JavaScript");

    expect(screen.getByText(/Searches for JavaScript/)).toBeInTheDocument();
  });
});
```

# 8 - React Testing Library: Callback Handlers

tag: 8-callback-handlers

- A veces, probaremos los comp de forma aislada como pruebas unitarias.
- A menudo estos comp no tienen ningun efecto secundario o estado, sino solo entrada/salida
- Ya vimos como probar JSX renderizado dado un comp, ahora probemos los callback handlers del search comp.

```javascript
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App, { Search } from "./App";

describe("App", () => {
  test("renders App component", async () => {
    render(<App />);

    // wait for the user to resolve
    await screen.findByText(/Signed in as/);

    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();

    await userEvent.type(screen.getByRole("textbox"), "JavaScript");

    expect(screen.getByText(/Searches for JavaScript/)).toBeInTheDocument();
  });
});

describe("Search", () => {
  test("calls the onChange callback handler", () => {
    // jest.fn(): Simula una funcion para ver si esta fue llamada
    const onChange = jest.fn();

    render(
      <Search value="" onChange={onChange}>
        Search:
      </Search>
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "JavaScript" },
    });
    // fireEvent.change(screen.getByRole('textbox'), {
    //   target: { value: 'JavaScript' },
    // });

    // fireEvent ejecuta la funcion change event solo una vez, userevent lo activa cada pulsacion de tecla
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test("calls the onChange callback handler with userEvent", async () => {
    const onChange = jest.fn();

    render(
      <Search value="" onChange={onChange}>
        Search:
      </Search>
    );

    await userEvent.type(screen.getByRole("textbox"), "JavaScript");

    // aqui vemos que userEvent coincide con el comportamiento del usuario
    // cada pulsacion de tecla
    // por que cada vvez que se escribe algo en el input se usa la funcion onChange que son 10
    expect(onChange).toHaveBeenCalledTimes(10);
  });
});
```

# 9 - React Testing Library: Asynchronous/Async

tag: 9-asynchronous-async

- install axios
- Probaremos ahora la obtencion de datos en react, testiando un comp que usa axios para obtener datos de una API remota

```javascript
import React from "react";
import axios from "axios";

const URL = "http://hn.algolia.com/api/v1/search";

function App() {
  const [stories, setStories] = React.useState([]);
  const [error, setError] = React.useState(null);

  async function handleFetch(event) {
    let result;

    try {
      result = await axios.get(`${URL}?query=React`);

      setStories(result.data.hits);
    } catch (error) {
      setError(error);
    }
  }

  return (
    <div>
      <button type="button" onClick={handleFetch}>
        Fetch Stories
      </button>

      {error && <span>Something went wrong ...</span>}

      <ul>
        {stories.map((story) => (
          <li key={story.objectID}>
            <a href={story.url}>{story.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

```javascript
import React from "react";
import axios from "axios";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

jest.mock("axios");

describe("App", () => {
  test("fetches stories from an API and displays them", async () => {
    const stories = [
      { objectID: "1", title: "Hello" },
      { objectID: "2", title: "React" },
    ];

    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { hits: stories } })
    );

    render(<App />);

    await userEvent.click(screen.getByRole("button"));

    const items = await screen.findAllByRole("listitem");

    expect(items).toHaveLength(2);
  });

  test("fetches stories from an API and fails", async () => {
    axios.get.mockImplementationOnce(() => Promise.reject(new Error()));

    render(<App />);

    await userEvent.click(screen.getByRole("button"));

    const message = await screen.findByText(/Something went wrong/);

    expect(message).toBeInTheDocument();
  });
});
```

FUENTE: https://www.robinwieruch.de/react-testing-library
