<template>
  <v-card class="pa-4" width="750">
    <div class="row pa-2">
      <div class="col-6 title">
        {{ options.title }}
      </div>
      <div class="col-6">
        <v-btn class="float-right" color="primary" nuxt :to="options.type === 'uniList'?'/yeni':'/yeni-taslak'">
          Yeni
        </v-btn>
      </div>
    </div>
    <div class="row pa-2">
      <div class="col-12">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Ara..."
        />
      </div>
    </div>
    <div class="row pa-2">
      <v-data-table
        :headers="options.tableHeaders"
        :items="dataset"
        :search="search"
        sort-by="id"
        show-expand
      >
        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline"> Düzenle </span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="editedItem.name" label="Ünivertsite Adı" />
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="editedItem.url" label="Yönetmelik URL" />
                    </v-col>
                    <v-col v-for="(item,index) in activeItemGrades" :key="index" cols="12" sm="6" md="6">
                      <v-text-field v-model="item.harf" label="Harf" />
                      <v-text-field v-model="item.value" label="Katsayı" />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <v-btn color="blue darken-1" text @click="close">
                  İptal
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Kaydet
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
        <!--        todo: tabloda tasarım düzenlenecek-->
        <template v-slot:expanded-item="{ headers,item }">
          <td colspan="4">
            <v-simple-table dense class="d-flex flex-column ma-2 pa-2">
              <thead>
                <tr>
                  <th class="text-left">
                    Harf Notu
                  </th>
                  <th class="text-left">
                    Katsayı
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in item.harfAraliklariParsed" :key="item.name">
                  <td>{{ item.harf }}</td>
                  <td>{{ item.value }}</td>
                </tr>
              </tbody>
            </v-simple-table>
            <a class="subtitle-2 d-flex flex-column ma-2 pa-2" target="_blank" :href="item.url">Yönetmelik Sayfası</a>
          </td>
        </template>
      </v-data-table>
    </div>
  </v-card>
</template>
<script>
export default {
  props: {
    dataset: {
      type: Array,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      search: '',
      activeItemGrades: {},
      dialog: false,
      itemDetails: [],
      editedIndex: -1,
      editedItem: {
        harfAraliklari: [],
        updatedAt: {},
        id: 0,
        name: ''
      }
    }
  },
  mounted () {
    this.dataset.forEach((el) => {
      el.updatedAt = this.$date(el.updatedAt, 'd M y')
    })
  },
  methods: {
    editItem (item) {
      this.editedIndex = this.dataset.indexOf(item)
      this.activeItemGrades = item.harfAraliklariParsed
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      const index = this.dataset.indexOf(item)
      // TODO: SWAL EKLENECEK
      if (this.options.type === 'template') {
        confirm('Are you sure you want to delete this item?') && this.dataset.splice(index, 1)
        this.$axios.post('/deleteGradeTemplate', {
          dataset: item
        })
      } else if (this.options.type === 'uniList') {
        confirm('Are you sure you want to delete this item?') && this.dataset.splice(index, 1)
        this.$axios.post('/deleteUniData', {
          dataset: item
        })
      }
    },
    close () {
      this.dialog = false
      this.editedIndex = -1
    },
    save () {
      if (this.editedIndex > -1 && this.options.type === 'uniList') {
        const dataset = {
          id: this.editedItem.id,
          name: this.editedItem.name,
          url: this.editedItem.url
        }
        this.$axios.post('/updateUniData', {
          dataset
        })
      } else if (this.editedIndex > -1 && this.options.type === 'template') {
        const dataset = {
          id: this.editedItem.id,
          name: this.editedItem.name,
          harfAraliklari: JSON.stringify(this.activeItemGrades)
        }
        this.$axios.post('/updateGradeTemplate', {
          dataset
        })
      } else {
        this.dataset.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>
