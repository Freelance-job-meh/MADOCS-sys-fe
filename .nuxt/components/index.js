export { default as CommonHeader } from '../../components/CommonHeader.vue'
export { default as CommonSidebar } from '../../components/CommonSidebar.vue'
export { default as Error } from '../../components/Error.vue'
export { default as NetworkStatus } from '../../components/NetworkStatus.vue'
export { default as Loader } from '../../components/loader.vue'
export { default as AdminModule1 } from '../../components/Admin/Module1.vue'
export { default as AdminModule2 } from '../../components/Admin/Module2.vue'
export { default as AdminRolesaccess } from '../../components/Admin/rolesaccess.vue'
export { default as AdminRolesmatrix } from '../../components/Admin/rolesmatrix.vue'
export { default as AdminScreenmanagement } from '../../components/Admin/screenmanagement.vue'
export { default as AdminScreenpage } from '../../components/Admin/screenpage.vue'
export { default as FieldValidatorContactValidator } from '../../components/FieldValidator/ContactValidator.vue'
export { default as FieldValidatorEmailValidator } from '../../components/FieldValidator/EmailValidator.vue'
export { default as FieldValidatorNameValidator } from '../../components/FieldValidator/NameValidator.vue'
export { default as FieldValidatorNricValidator } from '../../components/FieldValidator/NricValidator.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
