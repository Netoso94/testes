const pegarInput = document.getElementById('input')
const pegarLista = document.getElementById('pegarLista')
const API = 'https://todo-api-production-b38d.up.railway.app/todos'

async function adicionar() {
    const valorInput = pegarInput.value.trim()

    if (valorInput !== "") {
        const novaTarefa = {
            title: valorInput
        }
        try {
            const resposta = await fetch(API, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(novaTarefa)
            })

            if (!resposta.ok) {
                throw new Error(`Erro de rede ou API: Status ${resposta.status}`)
            }
            const tarefaAdicionada = await resposta.json()
            const li = document.createElement('li')

            li.setAttribute('data-id', tarefaAdicionada.id)
            const spanTexto = document.createElement('span')
            spanTexto.textContent = tarefaAdicionada.title
            li.appendChild(spanTexto)
            const btnEditar = document.createElement('button')
            btnEditar.textContent = 'Editar'
            btnEditar.onclick = () => editarTarefa(li, spanTexto);
            li.appendChild(btnEditar);

            pegarLista.appendChild(li)
            pegarInput.value = ""
        }
        catch (error) {
        }
        
    }  

}

async function editarTarefa(liElement, spanElement) {
    const tarefaId = liElement.getAttribute('data-id')
    const novoTexto = prompt('Edite a tarefa:', spanElement.textContent)

    if (novoTexto === null || novoTexto.trim() === spanElement.textContent || novoTexto.trim() === "") {
        return
    }

    const APIeditada = `${API}/${tarefaId}`
    const dadosAtualizados = {
        title: novoTexto.trim()
    }
    
    try {
        const resposta = await fetch(APIeditada, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dadosAtualizados)
        })

        if (!resposta.ok) {
            throw new Error(`Erro ao editar: Status ${resposta.status}`)
        }
        spanElement.textContent = novoTexto.trim()
    } 
    catch (error) {
    }
}

