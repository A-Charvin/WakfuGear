<template>
  <v-dialog
    v-model="dialog"
    :max-width="opcoes.width"
    @keydown.esc="cancelar"
  >
    <v-toolbar
      class="cabecalho"
      dark
      dense
      :color="opcoes.cor"
    >
      <v-toolbar-title
        :class="[(opcoes.color === 'white') ? 'black--text' : 'white--text']"
      >
        {{ titulo }}
      </v-toolbar-title>
    </v-toolbar>
    <v-card tile>
      <v-card-text v-show="!!mensagem">
        {{ mensagem }}
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="error"
          @click="cancelar"
        >
          {{ label.cancelar }}
        </v-btn>
        <v-btn
          color="primary darken-1"
          @click="confirmar"
        >
          {{ label.confirmar }}
          <v-icon right>
            thumb_up
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ConfirmDialog',
  props: {
    labelCancelar: { type: String, default: null },
    labelConfirmar: { type: String, default: null }
  },
  data: () => ({
    dialog: false,
    resolve: null,
    reject: null,
    titulo: null,
    mensagem: null,
    label: {
      cancelar: '',
      confirmar: ''
    },
    opcoes: {
      cor: 'accent',
      width: 350
    }
  }),
  mounted () {
    this.label.cancelar = this.labelCancelar ? this.labelCancelar : this.$i18n.t('dialog.cancelar')
    this.label.confirmar = this.labelConfirmar ? this.labelConfirmar : this.$i18n.t('dialog.sim')
  },
  methods: {
    abrir (obj) {
      this.dialog = true
      this.titulo = obj.titulo
      this.mensagem = obj.mensagem
      this.opcoes = { ...this.opcoes, ...obj.opcoes }

      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    confirmar () {
      this.resolve()
      this.dialog = false
    },
    cancelar () {
      this.reject()
      this.dialog = false
    }
  }
}
</script>

<style scoped>
  .v-card__text {
    font-size: 15px;
  }
</style>
