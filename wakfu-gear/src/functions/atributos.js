const atributos = {
  getAtributos: gear => {
    const atr = {}
    if (gear) {
      Object.keys(gear).forEach(item => {
        item = gear[item]
        if (item) {
          item.equipEffects.forEach(fx => {
            if (!atr[fx.id]) atr[fx.id] = 0
            atr[fx.id] += fx.params[0]
          })
        }
      })
    }
    return atr
  }
}

export default atributos
