const url = "http://api.icndb.com/jokes/random";

// FUNCIÓN PARA MODIFICAR DOM Y VISUALIZAR VALOR DE LA PROPIEDAD JOKE
const modifyDOM = (joke) => {
  const element = document.getElementById("card");
  const elementChild = document.createElement("div");
  elementChild.innerHTML = `
    <div class="card">
        <p>${joke}</p>
    </div>
    `;
  element.appendChild(elementChild);
  setTimeout(() => {
    document.querySelector(".card").remove();
  }, 2000);
};

// FUNCIÓN MÉTODO XMLHTTPREQUEST
const functionHttp = () => {
  //1- instanciamos
  const xhr = new XMLHttpRequest();
  //2- asignación de evento(s)
  xhr.addEventListener("readystatechange", (e) => {
    if (xhr.readyState !== 4) return;

    if (xhr.status >= 200 && xhr.status < 300) {
      let data = JSON.parse(xhr.response);
      const joke = data.value.joke;
      modifyDOM(joke);
    } else {
      let message = xhr.statusText || "Ocurrió un error";
      $xhr.innerHTML = `Error ${xhr.status}: ${message}`;
    }
  });

  //3- Abrimos petición
  xhr.open("GET", url);

  //4- enviamos petición
  xhr.send();
};

// FUNCIÓN MÉTODO FETCH
const functionFetch = () => {
  fetch(url)
    //en esta promesa le indicamos que nos pase los datos a JSON
    .then((response) => response.json())
    //DATA es el resultado de response.json. Creamos constante y extraemos el dato que queremos
    .then((data) => {
      const joke = data.value.joke;
      modifyDOM(joke);
    })
    //en caso de error, lo sacamos por consola
    .catch((err) => console.log(err));
};

// FUNCIÓN MÉTODO FETCH + ASYNC - AWAY (FUNCIÓN ASÍNCRONA)
async function functionFetchAsync() {
  try {
    const res = await fetch(url);
    const data = await res.json();
    const joke = data.value.joke;
    modifyDOM(joke);
  } catch (err) {
    console.log(err);
  }
}

const functionAxios = () => {
  axios({
    method: "GET",
    url: url,
  })
    .then((res) => {
      const joke = res.data.value.joke;
      modifyDOM(joke);
    })
    .catch((err) => console.log(err));
};

document.getElementById("buttonId1").addEventListener("click", () => {
  functionHttp();
});

document.getElementById("buttonId2").addEventListener("click", () => {
  functionFetch();
});

document.getElementById("buttonId3").addEventListener("click", () => {
  functionFetchAsync();
});

document.getElementById("buttonId4").addEventListener("click", () => {
  functionAxios();
});