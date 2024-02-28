let activeAction

class ActionsCollection {
  constructor() {
    this.actions = new Set()
  }
  
  addAction() {
    if(activeAction) {
      this.actions.add(activeAction)
    }
  }

  applyAction() {
    this.actions.forEach(action => {
      action()
    })
  }
}

export const action = (callback) => {
  activeAction = callback
  callback()
  activeAction = null
}

const targetMap = new WeakMap()

const getAction = (target, key) => {
  let actionsMap = targetMap.get(target)
  if(!actionsMap) {
    actionsMap = new Map()
    targetMap.set(target, actionsMap)
  }

  let action = actionsMap.get(key)
  if(!action) {
    action = new ActionsCollection()
    actionsMap.set(key, action)
  }
  return action
}

const handlers = {
  get(target, key, receiver) {
    const action = getAction(target, key)
    action.addAction()
    return Reflect.get(target, key, receiver)
  },
  set(target, key, value, receiver) {
    const action = getAction(target, key)
    const result = Reflect.set(target, key, value, receiver)
    action.applyAction()
    return result
  }
}

export const reactive = (value) => {
  if(typeof value === 'object' && value !== null && !Array.isArray(value)) {
    return new Proxy(value, handlers)
  }else   return new Proxy({
    value
  }, handlers)
}
