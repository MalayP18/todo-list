<template>
    <div>
      <h1 class="ma-auto text-center">Todos App</h1>
      <v-container>
        <v-row>
          <v-col sm="10">
            <v-text-field
              v-model.trim="searchInput"
              outlined
              label="Search Todos"
              placeholder="Search Todos"
            ></v-text-field>
          </v-col>
          <v-col sm="2">
            <v-btn
              size="x-large"
              color="primary"
              elevation="2"
              :disabled="!!searchInput"
              @click="showAddTodoModal = true"
            >
              Add Todo
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card
              v-for="todo in filteredTodos"
              :key="todo.id"
              class="my-4"
              :color="todo.isComplete ? '#B0BEC5' : '#F5F5F5'"
              theme="dark"
            >
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="text-h5 text-wrapper">
                    {{ todo.title }}
                  </v-card-title>
  
                  <v-card-subtitle> <span class="text-wrapper">{{ todo.description }}</span></v-card-subtitle>
  
                  <v-card-actions>
                    <div class="d-flex flex-wrap">
                      <v-btn
                        class="ma-2"
                        variant="elevated"
                        color="primary"
                        :disabled="todo.isComplete"
                        prepend-icon="mdi-check-circle"
                        @click="markAsComplete(todo.id)"
                      >
                        <template v-slot:prepend>
                            <v-icon color="white"></v-icon>
                        </template>
                        Mark as Complete
                      </v-btn>
                      <v-btn
                        class="ma-2"
                        variant="tonal"
                        color="error"
                        @click="removeTask(todo.id)"
                      >
                        <v-icon left>
                          mdi-delete
                        </v-icon>
                        Remove
                      </v-btn>
                    </div>
                  </v-card-actions>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <AddTodoModal :dialog="showAddTodoModal" @addTodo="handleAddTodo" @close="handleClose"/>
    </div>
  </template>
    
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import AddTodoModal from '@/components/AddTodoModal.vue';
  
  interface TodoItem {
   title: string
   description: string
   isComplete?: Boolean
   id?: number
  }
  
  const todos = ref<TodoItem[]>([])
  const showAddTodoModal = ref<boolean>(false)
  const searchInput = ref<string>('')
  
  const filteredTodos = computed(() => {
    const input = searchInput.value.toLowerCase()
    return todos.value.filter(todo => (todo.title.includes(input) || todo.description.includes(input)))
  })
  
  const handleAddTodo = (todo: TodoItem) => {
    todos.value.push({ ...todo, id: Date.now() })
  }
  
  const handleClose = () => {
    showAddTodoModal.value = false
  }
  
  const markAsComplete = (id: number) => {
    const index = todos.value.findIndex(todo => todo.id === id)
    todos.value[index].isComplete = true
  }
  
  const removeTask = (id: number) => {
    const index = todos.value.findIndex(todo => todo.id === id)
    todos.value.splice(index, 1)
  }
  </script>
    
  <style scoped>
  .text-wrapper {
    white-space: normal;
    word-wrap: break-word;
  }
  </style>
    