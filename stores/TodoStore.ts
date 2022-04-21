import { defineStore } from "pinia"
import { v4 as uuid } from "uuid"

export interface Todo {
  id: string
  title: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
}

export interface TodoState {
  items: Todo[] | undefined[]
}

export interface AddTodo {
  title: string
}

export const useTodoStore = defineStore("TodoStore", {
  state: (): TodoState => {
    return {
      items: [],
    }
  },

  // Getters
  getters: {
    getItemById: (state: TodoState) => (id: string) => {
      return state.items.find((item: Todo) => item.id === id)
    },

    getOrderedTodo: (state: TodoState) =>
      state.items.sort(
        (a: Todo, b: Todo) =>
          a.createdAt.getMilliseconds() - b.createdAt.getMilliseconds()
      ),
  },

  // actions
  actions: {
    addTodo(partialTodo: AddTodo) {
      const todo: Todo = {
        id: uuid(),
        ...partialTodo,
        createdAt: new Date(),
        updatedAt: new Date(),
        completed: false,
      }
      this.items.push(todo)
    },
  },
})
