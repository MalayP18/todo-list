<template>
  <v-dialog
    :model-value="props.dialog"
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
          data-test-id="close-todo-modal"
          @click="emit('close')"
        >
          Cancel
        </v-btn>

        <v-btn
          :data-test-id="`add-todo-disabled-${disabled}`"
          :disabled="disabled"
          color="primary"
          @click="addTodo"
        >
          Add
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  dialog: boolean
}>();

const emit = defineEmits(['close', 'addTodo']);

const title = ref<string>('')
const description = ref<string>('')

const disabled = computed(() => !title.value || !description.value)

const reset = () => {
  title.value = ''
  description.value = ''
}
const close = () => {
  emit('close')
  reset()
}

const addTodo = () => {
  emit('addTodo', { title: title.value, description: description.value })
  close()
}
</script>
