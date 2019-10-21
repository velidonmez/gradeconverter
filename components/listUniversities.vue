<template>
  <v-data-table
    :headers="options.tableHeaders"
    :items="dataset"
    sort-by="id"
    class="elevation-1"
    show-expand
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>{{ options.title }}</v-toolbar-title>
        <v-spacer />
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" nuxt to="/yeni">
              Yeni
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline"> Düzenle </span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="editedItem.okul_adi" label="Ünivertsite Adı" />
                  </v-col>
                  <v-col v-for="(item,index) in editedItem.harf_araliklari" :key="index" cols="12" sm="6" md="6">
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
      </v-toolbar>
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
    <!--        todo: json düzenlenecek-->
    <template v-slot:expanded-item="{ item }">
      {{ item.harf_araliklari }}
    </template>
  </v-data-table>
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
      dialog: false,
      itemDetails: [],
      editedIndex: -1,
      editedItem: {
        harf_araliklari: [],
        date_time: {},
        id: 0,
        okul_adi: ''
      }
    }
  },

  methods: {
    editItem (item) {
      this.editedIndex = this.dataset.indexOf(item)
      item.harf_araliklari = JSON.parse(item.harf_araliklari)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      const index = this.dataset.indexOf(item)
      // TODO: SWAL EKLENECEK
      confirm('Are you sure you want to delete this item?') && this.dataset.splice(index, 1)
      this.$axios.post('/deleteUniData', {
        dataset: item
      })
    },
    close () {
      this.dialog = false
      this.editedIndex = -1
    },
    save () {
      if (this.editedIndex > -1) {
        this.editedItem.harf_araliklari = JSON.stringify(this.editedItem.harf_araliklari)
        this.editedItem.date_time = new Date().toISOString()
        Object.assign(this.dataset[this.editedIndex], this.editedItem)
        this.$axios.post('/updateUniData', {
          dataset: this.editedItem
        })
      } else {
        this.dataset.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>
