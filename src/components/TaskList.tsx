import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function generateIdRandom() {
    return Math.random() * 36;
  }

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    if (newTaskTitle !== '') {      
      const newTask = [...tasks, {id: generateIdRandom(), title: newTaskTitle, isComplete: false}]
      setTasks(newTask)
      setNewTaskTitle('')
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    // armazena o conteudo do estado atual
    let arrayTasks = [...tasks]
    // procura dentro do array armazenado o indice que seja igual ao da task vinda do parametro
    let idxTask = arrayTasks.findIndex(task => task.id === id)
    // toggle no isComplete da task encontrada
    arrayTasks[idxTask].isComplete = !arrayTasks[idxTask].isComplete
    // atualiza o estado
    setTasks(arrayTasks)

  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    // cria um novo array filtrando a task vinda do parametro
    const newArrayTasks = tasks.filter(task => task.id !== id)

    if (newArrayTasks) {
      setTasks(newArrayTasks)
    }
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}