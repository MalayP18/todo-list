import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import AddToDoModal from './components/AddToDoModal.vue'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

describe('Add Todo', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(AddToDoModal, {
      props: {
        dialog: true
      },
      global: {
        plugins: [vuetify],
      }
    })
    expect(wrapper.vm).toBeTruthy()
  })

  it('handles validation that add button is disabled until required fields gets filled', async () => {
    const wrapper = mount(AddToDoModal, {
      props: {
        dialog: true
      },
      global: {
        plugins: [vuetify],
      }
    })
    expect(wrapper.vm.disabled).toBe(true)
    
    await (wrapper.vm.title = 'title')
    expect(wrapper.vm.disabled).toBe(true)
    await (wrapper.vm.description = 'description')
    expect(wrapper.vm.disabled).toBe(false)
  })
 
  it('reset works properly', async () => {
    const wrapper = mount(AddToDoModal, {
      props: {
        dialog: true
      },
      global: {
        plugins: [vuetify],
      }
    })
    
    await (wrapper.vm.title = 'title')
    await (wrapper.vm.description = 'description')
    expect(wrapper.vm.disabled).toBe(false)
    
    wrapper.vm.reset()
    expect(wrapper.vm.disabled).toBe(true)
    
    wrapper.vm.close()
  })  
})