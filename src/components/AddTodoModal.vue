<template>
  <v-dialog
    :value="dialog"
    max-width="900"
  >
    <v-card>
      <v-card-title class="text-h5">
        Add Todo
      </v-card-title>

      <v-card-text>
        <v-text-field
            v-model.trim="title"
            outlined
            label="Todo Title"
            placeholder="Todo Title"
          ></v-text-field>
        <v-text-field
            v-model.trim="description"
            outlined
            label="Todo Description"
            placeholder="Todo Description"
          ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          text
          @click="$emit('close')"
        >
          Cancel
        </v-btn>

        <v-btn
          :disabled="!title || !description"
          color="primary"
          text
          @click="addTodo"
        >
          Add
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AddTodoModal',
  props: {
    dialog: {
      type: Boolean,
      required: true
    }
  },
  data: function () {
    return {
      title: '',
      description: ''
    }
  },
  methods: {
    reset () {
      this.title = ''
      this.description = ''
    },
    close () {
      this.$emit('close')
      this.reset()
    },
    addTodo () {
      this.$emit('addTodo', { title: this.title, description: this.description })
      this.close()
    }
  }
}
</script>
