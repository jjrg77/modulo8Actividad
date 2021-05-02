const url = 'http://api.icndb.com/jokes/random';

// FUNCIÓN PARA MODIFICAR DOM Y VISUALIZAR VALOR DE LA PROPIEDAD JOKE
const modifyDOM = (joke) => {
    const element = document.getElementById('card')
    const elementChild = document.createElement('div');
    elementChild.innerHTML = `
    <div class="card">
        <p>${joke}</p>
    </div>
    `;
    element.appendChild(elementChild);
    setTimeout(() => {
        document.querySelector('.card').remove();
    }, 2000);
};

// FUNCIÓN MÉTODO XMLHTTPREQUEST
const functionHttp = () => {
    //1- instanciamos
    const xhr = new XMLHttpRequest();
        // $xhr = document.getElementById('xhr');

    //2- asignación de evento(s)
    xhr.addEventListener('readystatechange', (e) => {
        if (xhr.readyState !== 4) return; 

        if (xhr.status >= 200 && xhr.status < 300) {
            console.log('éxito');
            console.log(xhr.response);
            let json = JSON.parse(xhr.response);
            const joke = json.value.joke;

            modifyDOM(joke);

        } else {
            let message = xhr.statusText || 'Ocurrió un error';
            $xhr.innerHTML = `Error ${xhr.status}: ${message}`;
        }
    });

    //3- Abrimos petición
    xhr.open('GET', url);

    //4- enviamos petición
    xhr.send();
};

// FUNCIÓN MÉTODO FETCH
const functionFetch = () => {

    fetch(url)
    .then(res => {
        console.log(res);
        // RES es del tipo 'ReadableStream' por lo que lo pasaremos a JSON
        const resJson = res.json();
        console.log(resJson);
        //devolvemos RES al siguiente 'then'
    })
    .then(resJson => {
        console.log(json);
    })
    .catch(err => {
        console.log(err);
    });
};




document.getElementById('buttonId1').addEventListener('click', () => {
    functionHttp();
});

document.getElementById('buttonId2').addEventListener('click', () => {
    functionFetch();
});

document.getElementById('buttonId3').addEventListener('click', () => {
    // functionFetchAsync();
});

document.getElementById('buttonId4').addEventListener('click', () => {
    // functionFetchAxios();
});
    

