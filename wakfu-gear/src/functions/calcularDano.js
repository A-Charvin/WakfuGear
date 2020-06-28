export const getResistenciaRaw = resistencia => {
  if (!resistencia || resistencia <= 0) return 0

  const CONSTANTE = 0.800000011920929

  return Math.pow(CONSTANTE, resistencia / 100).toFixed(2)
}

export const getResistenciaPorcentagem = resistencia => {
  return Math.round(getResistenciaRaw(resistencia) * 100)
}

export default ({ gear, danoBase, danoBaseCritico, resistencia, danosCausados, filtros }) => {
  let Gear, Resistencia, DanoBase, DanoBaseCritico

  const valorDanoFrente = 1
  const valorDanoLado = 1.1
  const valorDanoCostas = 1.25

  const init = () => {
    Gear = {
      DanosCausados: danosCausados || 0,
      MaestriaElemental: somaAtributosDeDano(gear),
      MaestriaDistancia: gear['1053'] || 0,
      MaestriaCorpoACorpo: gear['1052'] || 0,
      MaestriaAlvoUnico: gear['1051'] || 0,
      MaestriaZona: gear['1050'] || 0,
      MaestriaCritico: gear['149'] || 0,
      MaestriaCostas: gear['180'] || 0,
      MaestriaBerserk: gear['1055'] || 0
    }

    Resistencia = resistencia
    DanoBase = danoBase
    DanoBaseCritico = danoBaseCritico
  }

  const somaAtributosDeDano = gear => {
    const danoElementalFixo = Math.max(gear['122'], gear['123'], gear['124'], gear['125']) || 0
    const danoElementalTotal = gear['120'] || 0
    const danoElementalPrimeiroLista = gear['910681'] || 0
    const danoElementalSegundoLista = gear['910682'] || 0
    const danoElementalTerceiroLista = gear['910683'] || 0
    const danoElementalLista = danoElementalPrimeiroLista + danoElementalSegundoLista + danoElementalTerceiroLista

    return danoElementalFixo + danoElementalTotal + danoElementalLista
  }

  const valorDanosCausados = () => (Gear.DanosCausados + 100) / 100
  const valorResistencia = () => (Resistencia <= 0) ? 1 : getResistenciaRaw(Resistencia)

  const calcularDano = (posicao, ehCritico, ehBerserk, ehCaC, ehST) => {
    const calculoDano = !ehCritico ? DanoBase : DanoBaseCritico
    const calculoDanosCausados = valorDanosCausados()
    const ehCostas = (posicao === 'Costas')
    let calculoPosicao = valorDanoFrente
    if (posicao === 'Lado') calculoPosicao = valorDanoLado
    else if (ehCostas) calculoPosicao = valorDanoCostas
    const calculoDominios = calcularDominios(ehCostas, ehBerserk, ehCaC, ehST, ehCritico)
    const calculoResistencia = valorResistencia()
    return Math.ceil(calculoDano * calculoPosicao * calculoDominios * calculoDanosCausados * calculoResistencia)
  }

  const calcularDominios = (ehCostas, ehBerserk, ehCaC, ehST, ehCritico) => {
    const calculoCostas = ehCostas ? Gear.MaestriaCostas : 0
    const calculoCritico = ehCritico ? Gear.MaestriaCritico : 0
    const calculoBerserk = ehBerserk ? Gear.MaestriaBerserk : 0
    const calculoDistancia = ehCaC ? Gear.MaestriaCorpoACorpo : Gear.MaestriaDistancia
    const calculoAlvo = ehST ? Gear.MaestriaAlvoUnico : Gear.MaestriaZona
    return (100 + Gear.MaestriaElemental + calculoCostas + calculoDistancia + calculoAlvo + calculoCritico + calculoBerserk) / 100
  }

  const montarArray = () => {
    const posicoes = filtros.posicoes
    const alvos = filtros.alvos
    const distancias = filtros.distancias

    const array = []
    for (const i in posicoes) {
      const posicao = posicoes[i]
      for (const j in distancias) {
        const distancia = distancias[j]
        const ehCaC = distancia === 'cac'
        for (const k in alvos) {
          const alvo = alvos[k]
          const ehST = alvo === 'st'
          const resultadoNormal = calcularDano(posicao, false, false, ehCaC, ehST)
          array.push({ posicao, distancia, alvo, resultado: resultadoNormal })
          if (filtros.multiplicadores.includes('Berserk')) {
            const resultadoBerserk = calcularDano(posicao, false, true, ehCaC, ehST)
            array.push({ posicao, distancia, alvo, resultado: resultadoBerserk })
            if (filtros.multiplicadores.includes('Critico')) {
              const resultadoBerserkCritico = calcularDano(posicao, true, true, ehCaC, ehST)
              array.push({ posicao, distancia, alvo, resultado: resultadoBerserkCritico })
            }
          }
          if (filtros.multiplicadores.includes('Critico')) {
            const resultadoCritico = calcularDano(posicao, true, false, ehCaC, ehST)
            array.push({ posicao, distancia, alvo, resultado: resultadoCritico })
          }
        }
      }
    }
    return array
  }

  init()
  return montarArray()
}
