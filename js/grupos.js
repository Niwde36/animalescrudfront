const url = "http://localhost:8080/grupo/"
const url1 = "http://localhost:8080/grupo/list"



const contenedor = document.querySelector('tbody')

let resultados = ''

const modalGrupos = new bootstrap.Modal(document.getElementById('modalGrupo'))
const formGrupos = document.querySelector('form')
const idGrupo = document.getElementById('id')
const nombreGrupo = document.getElementById('nombre')





let opcion = ''

btnCrear.addEventListener('click', () => {
    idGrupo.value = ''
    nombreGrupo.value = ''
    idGrupo.disabled = false
    modalGrupos.show()
    opcion = 'crear'
})


 


const mostrar = (Grupos) => {
    Grupos.forEach(Grupo => {
        resultados += `<tr>
                        <td >${Grupo.id_grupo}</td>
                        <td >${Grupo.nombre_grupo}</td>
                        <td class="text-center" width="33%" ><a class="btnVer btn btn-success" href="especie.html">Ver</a> <a class="btnEditar btn btn-primary">Editar</a> <a class="btnBorrar btn btn-danger">Borrar</a></td>
                    </tr>`
    })

    contenedor.innerHTML = resultados
}



fetch(url1)
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
    idGrupo.value = idForm
    idGrupo.disabled = true
    nombreGrupo.value = nombre


    opcion = 'editar'
    modalGrupos.show()
})


formGrupos.addEventListener('submit', (e) => {
    e.preventDefault()

        if (opcion == 'crear') {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_grupo: idGrupo.value,
                    nombre_grupo: nombreGrupo.value,
                    
                })
            })
                .then(response => response.json())
                .then(data => {
                    const nuevoGrupo = []
                    nuevoGrupo.push(data)
                    mostrar(nuevoGrupo)
                })
        }
        if (opcion == 'editar') {

            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_grupo: idGrupo.value,
                    nombre_grupo: nombreGrupo.value,
                })
            })
                .then(response => location.reload())

        }
       
        modalGrupos.hide()
    
})

