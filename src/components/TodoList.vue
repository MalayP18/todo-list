<template>
  <div>
    <h1 class="ma-auto text-center">Todos App</h1>
    <v-container>
      <v-row>
        <v-col xs="12" sm="10">
          <v-text-field
            v-model.trim="searchInput"
            outlined
            label="Search Todos"
            placeholder="Search Todos"
          ></v-text-field>
        </v-col>
        <v-col xs="12" sm="2">
          <v-btn
            style="width: 100%"
            x-large
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
                      tile
                      color="primary"
                      :disabled="todo.isComplete"
                      @click="markAsComplete(todo.id)"
                    >
                      <v-icon left>
                        mdi-check-circle
                      </v-icon>
                      Mark as Complete
                    </v-btn>
                    <v-btn
                      class="ma-2"
                      tile
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

<script>
import AddTodoModal from './AddTodoModal.vue'
export default {
  name: 'TodoList',
  components: {
    AddTodoModal
  },
  data: function () {
    return {
      todos: [],
      showAddTodoModal: false,
      searchInput: ''
    }
  },
  computed: {
    filteredTodos () {
      const searchInput = this.searchInput.toLowerCase()
      return this.todos.filter(todo => (todo.title.includes(searchInput) || todo.description.includes(searchInput)))
    }
  },
  methods: {
    handleAddTodo (todo) {
      this.todos.push({ ...todo, id: Date.now() })
    },
    handleClose () {
      this.showAddTodoModal = false
    },
    markAsComplete (id) {
      const index = this.todos.findIndex(todo => todo.id === id)
      this.$set(this.todos[index], 'isComplete', true)
    },
    removeTask (id) {
      const index = this.todos.findIndex(todo => todo.id === id)
      this.todos.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.text-wrapper {
  white-space: normal;
  word-wrap: break-word;
}
</style>
