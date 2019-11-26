<template>
  <v-card width="750" class="pa-4">
    <div class="pa-2">
      <v-data-table
        :disable-pagination="true"
        :headers="headers"
        :items="form.harfAraliklari"
      >
        <template v-slot:top>
          <v-form v-model="valid">
            <v-row class="pa-2">
              <h2 class="title">
                {{ options.title }}
              </h2>
            </v-row>
            <v-row class="pa-2">
              <v-text-field
                v-model="form.universiteAdi"
                :rules="uniRules"
                outlined
                :label="options.label"
                required
                autocomplete="off"
              />
            </v-row>
            <v-row class="pa-2">
              <v-select
                v-model="selectedUniversityType"
                class="mr-2"
                outlined
                :items="universityTypes"
                item-text="value"
                label="Üniversite Türü"
              />
              <v-select
                v-model="selectedTemplate"
                class="ml-2"
                outlined
                :items="templates"
                item-text="name"
                label="Taslak Seçin"
              />
            </v-row>
            <v-row class="pa-2">
              <v-text-field
                v-model="form.url"
                label="Yönetmelik URL"
                required
              />
            </v-row>
            <v-row class="pa-2">
              <h2 class="subtitle-1">
                Harf Notlarını Ekle
              </h2>
            </v-row>
            <v-dialog v-model="dialog" :persistent="true" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn small color="float-right primary" dark v-on="on">
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
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
    </div>
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
import { mapGetters } from 'vuex'
export default {
  props: {
    dataset: {
      type: Array,
      required: false
    },
    options: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      selectedTemplate: null,
      selectedUniversityType: null,
      valid: false,
      letterRules: [
        v => !!v || 'Bu alan boş bırakılamaz.',
        v => v.length <= 4 || 'Harf notu en fazla 4 karakter içerebilir.'
      ],
      uniRules: [
        v => !!v || 'Bu alan boş bırakılamaz.',
        v => v.length <= 60 || 'Üniversite adı en fazla 60 karakter içerebilir.'
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
        url: null,
        harfAraliklari: []
      }
    }
  },
  computed: {
    ...mapGetters({
      templates: 'getTemplates',
      universityTypes: 'getUniversityTypes'
    })
  },
  watch: {
    selectedTemplate () {
      console.log(this.selectedUniversityType)
      const item = this.templates.find((el) => {
        return this.selectedTemplate === el.name
      })
      this.form.harfAraliklari = JSON.parse(item.harfAraliklari)
    },
    selected_letter () {
      console.log(this.selected_letter)
      this.result = this.calculateEquivalent(this.selected_letter, this.uu)
    }
  },
  created () {
    if (this.options.type === 'settings') {
      this.form.universiteAdi = this.dataset[0].okulAdi
      this.form.harfAraliklari = JSON.parse(this.dataset[0].harfAraliklari)
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
      this.form.url = ''
    },
    async submitToDb () {
      if (this.form.harfAraliklari.length > 0 && this.form.universiteAdi !== '') {
        const gradeObj = await this.form.harfAraliklari.sort(function (a, b) {
          return b.value - a.value
        })
        if (this.options.type === 'settings') {
          await this.$axios.post('/updateUUGradeSystem', {
            dataset: {
              okulAdi: this.form.universiteAdi,
              harfAraliklari: JSON.stringify(gradeObj),
              id: this.dataset[0].id
            }
          })
        } else if (this.options.type === 'addNewUni') {
          const dataset = {
            okulAdi: this.form.universiteAdi,
            okulTuru: this.selectedUniversityType,
            url: this.form.url,
            harfAraliklari: JSON.stringify(gradeObj)
          }
          await this.$axios.post('/insertUniData', {
            dataset
          }).then((res) => {
            this.clearTable()
            this.$swal({
              type: 'success',
              title: 'Liste başarıyla Güncellendi..',
              text: 'Liste tüm gösterilen alanlarda güncellendi.'
            })
          })
        } else if (this.options.type === 'addTemplate') {
          await this.$axios.post('/insertGradeTemplate', {
            dataset: {
              name: this.form.universiteAdi,
              harfAraliklari: JSON.stringify(gradeObj)
            }
          }).then((res) => {
            this.clearTable()
          })
        }
      } else {
        this.$swal({
          type: 'error',
          title: 'Liste Güncellenemedi...',
          text: 'Zorunlu alanlar boş bırakılamaz',
          confirmButtonText: 'Kapat'
        })
      }
    }
  }
}

</script>
<style>

</style>
