<template>
  <div class="bla">
    <v-layout
      tag="header"
      row
      wrap
    >
      <v-layout
        xs12
        style="height: 100px;"
      >
        <v-flex
          xs12
          sm6
          md4
          align-content-center
        >
          <img
            :src="logoImage"
            d-block
          >
        </v-flex>
        <v-spacer />
        <v-flex
          xs12
          sm6
          md4
          text-xs-right
        >
          <v-btn color="success">Contratar</v-btn>
          <v-btn color="warning">Zona Cliente</v-btn>
        </v-flex>
      </v-layout>
      <v-flex
        xs12
        style="height: 100px;"
      >
        <v-menu
          open-on-hover
          bottom
          offset-y
        >
          <v-btn
            slot="activator"
            flat
            color="primary"
          >
            Link one
          </v-btn>
          <v-list>
            <v-list-tile>
              <v-list-tile-title>Prueba 1</v-list-tile-title>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-title>Prueba 2</v-list-tile-title>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-title>Prueba 3</v-list-tile-title>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-title>Prueba 4</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-menu
          open-on-hover
          bottom
          offset-y
        >
          <v-btn
            slot="activator"
            flat
            color="secondary"
          >
            Link two
          </v-btn>
          <v-list>
            <v-list-tile>
              <v-list-tile-title>Prueba 1</v-list-tile-title>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-title>Prueba 2</v-list-tile-title>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-title>Prueba 3</v-list-tile-title>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-title>Prueba 4</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'MHeader',
  data () {
    return {
      logoImage: 'https://alta.holaluz.com/images/logo.svg'
    }
  }
}
</script>

<style>

</style>
