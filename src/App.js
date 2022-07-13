import './App.css';
import { useState, useEffect } from 'react';
import randomColor from 'randomcolor';
import { v4 as uuidv4 } from 'uuid';
import Draggable from 'react-draggable'

let App = () => {

  let [item, setItem] = useState('')
  let [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('todos')) || []
  )

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  let newItem = () => {
    if (item !== '') {
      let newItem = {
        id: uuidv4(),
        item,
        color: randomColor({
          luminosity: 'light'
        })
      }
      setTodos((todos) => [...todos, newItem])
      setItem('')
    } else {
      alert('Поле ввода не должно быть пустым!')
      setItem('')
    }
  }

  let deleteNode = (id) => {
    setTodos(todos.filter((item) => item.id !== id))
  }

  let keyPress = (e) => {
    let code = e.keyCode || e.which
    if (code === 13) {
      newItem()
    }
  }

  return (
    <div className="main">
      <div>
        <input
          value={item}
          type="text"
          placeholder="текст задачи.."
          onChange={(e) => setItem(e.target.value)}
          onKeyPress={(e) => keyPress(e)}
        />
        <button className="button-add"
          onClick={newItem}>Добавить</button>
      </div>

      {
        todos.map((item, index) => {
          return (
            <Draggable
              key={index}
                         >

              <div className="todos-style"
                style={{ backgroundColor: item.color }}>
                {`${item.item}`}
                <button className="delete-btn"
                  onClick={() => deleteNode(item.id)} >
                  x
                </button>
              </div>

            </Draggable>
          )
        })
      }

    </div>
  );
}

export default App;