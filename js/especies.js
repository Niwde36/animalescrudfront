const url = "http://localhost:8080/especie/"
const url1 = "http://localhost:8080/especie/list"


const contenedor = document.querySelector('tbody')

let resultados = ''


const idEspecie = document.getElementById('id')
const nombreEspecie = document.getElementById('nombre')
const cantidadEspecie = document.getElementById('cantidad')
const idGrupoEspecie = document.getElementById('grupo')
const modalEspecie = new bootstrap.Modal(document.getElementById('modalEspecie'))
const formEspecies = document.querySelector('form')



let opcion = ''
    btnCrear.addEventListener('click', () => {
    idEspecie.value = ''
    nombreEspecie.value = ''
    cantidadEspecie.value = ''
    idGrupoEspecie.value = ''
    idEspecie.disabled = false
    modalEspecie.show()
    opcion = 'crear'

})


 


const mostrar = (Especies) => {
    Especies.forEach(Especie => {
        resultados += `<tr>
                        <td >${Especie.id_especie}</td>
                        <td >${Especie.nombre_especie}</td>
                        <td >${Especie.cantidad}</td>
                        <td >${Especie.grupo.id_grupo}</td>
                        <td class="text-center" width="20%"><a class="btnEditar btn btn-primary">Editar</a> <a class="btnBorrar btn btn-danger">Borrar</a></td>
                    </tr>`
    })

    contenedor.innerHTML = resultados
}



fetch(url1
    )
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error))

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector))
            handler(e)
    })
}

on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML
    console.log(id)

    alertify.confirm("Desea eliminar el Grupo "+id+"?",
        function () {
            fetch(url + id, {
                method: 'DELETE'
            })
                .then(() => location.reload())
        },
        function () {
            alertify.error('Cancel')
        });
})


let idForm = 0
on(document, 'click', '.btnEditar', e => {

    const fila = e.target.parentNode.parentNode
    
    idForm = fila.children[0].innerHTML
    const nombre = fila.children[1].innerHTML
    const cantidadEspecie = fila.children[2].innerHTML
    const grupo = fila.children[3].innerHTML
    idEspecie.value = idForm
    idEspecie.disabled = true
    nombreEspecie.value = nombre
    cantidadEspecie.value = cantidadEspecie
    grupo.value = idForm

    opcion = 'editar'
    modalEspecie.show()
})

    

formEspecies.addEventListener('submit', (e) => {
    e.preventDefault()

        if (opcion == 'crear') {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_especie: idEspecie.value,
                    nombre_especie: nombreEspecie.value,
                    cantidad: cantidadEspecie.value,
                    id_grupo: idGrupoEspecie.value
                })
            })
                .then(response => response.json())
                .then(data => {
                    const nuevaEspecie = []
                    nuevaEspecie.push(data)
                    mostrar(nuevaEspecie)
                })
        }
        if (opcion == 'editar') {

            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_especie: idEspecie.value,
                    nombre_especie: nombreEspecie.value,
                    cantidad: cantidadEspecie.value,
                    id_grupo: idGrupoEspecie.value

                })
            })
                .then(response => location.reload())

        }
       
        modalEspecie.hide()
    
})

