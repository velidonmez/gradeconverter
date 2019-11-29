<template>
  <v-container fluid>
    <v-row>
      <title-bar title="Giriş Yap" />
    </v-row>
    <v-row justify="center">
      <v-card width="750" class="pa-4">
        <div class="row pa-2">
          <div class="col-12 title text-center">
            Yönetici Girişi
          </div>
          <div class="col-12 text-centered">
            <v-btn
              :disabled="!valid"
              color="primary"
              class="mr-4"
              @click="login"
            >
              Devam Et
            </v-btn>
          </div>
        </div>
        <!--        <v-form class="pa-2">-->
        <!--          <v-text-field-->
        <!--            v-model="mail"-->
        <!--            :rules="emailRules"-->
        <!--            label="E-mail"-->
        <!--            required-->
        <!--          />-->
        <!--          <v-text-field-->
        <!--            v-model="password"-->
        <!--            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"-->
        <!--            :rules="[rules.required]"-->
        <!--            :type="show1 ? 'text' : 'password'"-->
        <!--            name="input-10-1"-->
        <!--            label="Şifre"-->
        <!--            @click:append="show1 = !show1"-->
        <!--          />-->
        <!--          <v-btn-->
        <!--            :disabled="!valid"-->
        <!--            color="primary"-->
        <!--            class="mr-4"-->
        <!--            @click="login"-->
        <!--          >-->
        <!--            giriş-->
        <!--          </v-btn>-->
        <!--        </v-form>-->
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import TitleBar from '../components/base/TitleBar'

export default {
  components: {
    TitleBar
  },
  data () {
    return {
      middleware: ['auth'],
      mail: 'asdsd@sdfs.com',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      show1: false,
      show2: true,
      password: 'Password',
      valid: true,
      error: null,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters'
      }
    }
  },
  methods: {
    login () {
      this.$auth.loginWith('auth0')
      // this.$auth.loginWith('local', {
      //   data: {
      //     username: this.mail,
      //     password: this.password
      //   }
      // }).then((res) => {
      //   console.log(res)
      // })
    }
  }
}
</script>
