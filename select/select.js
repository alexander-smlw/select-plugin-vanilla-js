const getTemplate = (data = [], placeholder) => {
  const text = placeholder ?? 'Placeholder by default'
  const items = data.map(item => {
    return `<li class="select__item" data-id="${item.id}" data-type="item">${item.value}</li>`
  })

  return `
    <div class="select__input" data-type="input">
      <span data-type="value">${text}</span>
      <i class="fas fa-chevron-down" data-type="arrow"></i>
    </div>

    <div class="select__dropdown">
      <ul class="select__list">
        ${items.join('')}
      </ul>
    </div>
  `
}

export class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector)
    this.options = options
    this.selectedId = null

    this.#render()
    this.#setup()
  }

  
  #render() {
    const { data, placeholder } = this.options
    this.$el.classList.add('select')
    this.$el.innerHTML = getTemplate(data, placeholder)
  }
  
  #setup() {
    this.clickHandler = this.clickHandler.bind(this)
    this.$el.addEventListener('click', this.clickHandler)
    this.$arrow = this.$el.querySelector('[data-type="arrow"]')
    this.$value = this.$el.querySelector('[data-type="value"]')
  }
  
  clickHandler(event) {
    const { type } = event.target.dataset

    if (type === 'input') {
      this.toggle()
    } else if (type === 'item') {
      const id = event.target.dataset.id

      this.select(id)
    }
  }

  get isOpen() {
    return this.$el.classList.contains('open')
  }

  get current() {
    return this.options.data.find(item => item.id === this.selectedId)
  }
  
  toggle() {
    this.isOpen ? this.close() : this.open()
  }

  select(id) {
    this.selectedId = id

    this.$value.textContent = this.current.value
  }

  open() {
    this.$el.classList.add('open')

    this.$arrow.classList.remove('fa-chevron-down')
    this.$arrow.classList.add('fa-chevron-up')
  }
  
  close() {
    this.$el.classList.remove('open')
  
    this.$arrow.classList.add('fa-chevron-down')
    this.$arrow.classList.remove('fa-chevron-up')
  }
  
  destroy() {
    this.$el.removeEventListener('click', this.clickHandler)
  }
}