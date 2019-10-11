<template>
  <v-card class="pa-3">
    <v-layout>
      <v-data-table
        :disable-pagination="true"
        :headers="headers"
        :items="form.harfAraliklari"
      >
        <template v-slot:top>
          <v-form v-model="valid">
            <v-layout column>
              <v-card-title class="title">
                Yeni Üniversite Bilgileri:
              </v-card-title>
              <v-text-field
                v-model="form.universiteAdi"
                :rules="uniRules"
                class="mx-2"
                outlined
                label="Üniversite Adı"
                required
                autocomplete="off"
              />
            </v-layout>
            <v-toolbar flat color="white">
              <v-toolbar-title class="subtitle-1">
                Harf Notlarını Ekle
              </v-toolbar-title>
              <div class="flex-grow-1" />
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn small color="primary" dark class="mb-2" v-on="on">
                    Yeni
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Ekle</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.harf" required :rules="letterRules" label="Harf Notu" />
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.value" required type="number" label="Katsayı" />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <div class="flex-grow-1" />
                    <v-btn color="blue darken-1" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </v-form>
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-layout>

    <v-card-actions>
      <v-spacer />
      <v-btn
        color="primary"
        @click="submitToDb"
      >
        Tamamla
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data () {
    return {
      valid: false,
      letterRules: [
        v => !!v || 'Bu alan boş bırakılamaz.',
        v => v.length <= 4 || 'Harf notu en fazla 4 karakter içerebilir.'
      ],
      uniRules: [
        v => !!v || 'Bu alan boş bırakılamaz.',
        v => v.length <= 30 || 'Üniversite adı en fazla 30 karakter içerebilir.'
      ],
      dialog: false,
      headers: [
        {
          text: 'Harf Notu',
          align: 'left',
          sortable: true,
          value: 'harf'
        },
        { text: 'Katsayısı', value: 'value', sortable: true },
        { text: 'İşlem', value: 'action', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        harf: '',
        value: 0
      },
      defaultItem: {
        harf: '',
        value: 0
      },
      form: {
        universiteAdi: '',
        harfAraliklari: []
      }
    }
  },
  methods: {
    editItem (item) {
      this.editedIndex = this.form.harfAraliklari.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      const index = this.form.harfAraliklari.indexOf(item)
      confirm('Gerçekten silmek istiyor musunuz?') && this.form.harfAraliklari.splice(index, 1)
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.form.harfAraliklari[this.editedIndex], this.editedItem)
      } else {
        this.form.harfAraliklari.push(this.editedItem)
      }
      this.close()
    },
    clearTable () {
      this.form.harfAraliklari = []
      this.form.universiteAdi = ''
    },
    submitToDb () {
      this.$axios.post('/insertUniData', {
        okulAdi: this.form.universiteAdi,
        harfAraliklari: JSON.stringify(this.form.harfAraliklari)
      }).then((res) => {
        this.clearTable()
      })
    }
  }
}

</script>
<style>

</style>
