<template>
  <v-layout
    tag="header"
    row
    wrap
  >
    <v-layout
      hidden-sm-and-down
      style="height: 116px;"
    >
      <v-layout md12>
        <v-flex align-content-center>
          <img
            :src="logoImage"
            d-block
          >
        </v-flex>

        <v-flex text-md-right>
          <v-btn
            flat
            color="success"
          >
            Contratar
          </v-btn>
          <v-btn
            flat
            color="warning"
          >
            Zona Cliente
          </v-btn>
        </v-flex>
      </v-layout>
    </v-layout>

    <v-layout
      row
      hidden-md-and-up>
      <v-flex xs12>
        <v-card height="48px">
          <v-layout>
            <v-flex style="flex-grow: 0">
              <v-btn
                flat
                icon
                @click.stop="drawer = !drawer"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-flex>
            <v-flex style="padding: 12px 0; display: flex;">
              <v-card-media
                :src="logoImage"
                height="24px"
                style="flex: 0 0 90px;"
              />
            </v-flex>
            <v-flex
              xs7
              sm7
              justify-end
              align-center
              style="display: flex;"
            >
              <v-btn
                depressed
                small
                color="primary"
              >
                Contratar
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>

      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
      >
        <v-tabs
          v-model="language"
          dark
          style="background-color: #505050"
        >
          <v-tab
            v-for="item in languages"
            :key="item.label"
            @click="() => false"
          >
            {{ item.label }}
          </v-tab>
        </v-tabs>
        <v-list>
          <template v-for="item in menu">
            <v-list-group
              v-if="item.items"
              v-model="item.active"
              :key="item.title"
            >
              <v-list-tile
                v-if="item.items"
                slot="activator"
              >
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ item.title }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile
                v-for="subitem in item.items"
                :key="subitem.title"
                @click="() => false"
              >
                <v-list-tile-content>
                  <v-list-tile-title style="padding-left: 12px;">
                    {{ subitem.title }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>

            <v-list-tile
              v-else
              :key="item.title"
              @click="() => false"
            >
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.title }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
        <v-flex style="padding: 0 12px;">
          <v-btn
            block
            color="secondary"
            style="margin: 12px 0"
          >
            Zona Cliente
          </v-btn>
          <v-btn
            block
            color="primary"
            style="margin: 12px 0"
          >
            Contratar
          </v-btn>
          <v-btn
            block
            flat
            color="green"
            style="margin: 12px 0"
          >
            100% Luz Verde
          </v-btn>
        </v-flex>
      </v-navigation-drawer>
    </v-layout>
  </v-layout>
</template>

<script>
export default {
  name: 'MHeader',
  data () {
    return {
      drawer: null,
      language: 'es',
      logoImage: 'https://alta.holaluz.com/images/logo.svg',
      languages: [
        { label: 'ES' },
        { label: 'CA' },
        { label: 'EN' }
      ],
      menu: [
        {
          title: 'Conócenos',
          items: [
            { title: 'Conócenos' },
            { title: 'La luz justa' },
            { title: 'Energía Verde' },
            { title: 'Luz amiga' }
          ]
        }, {
          title: 'Tarifas Hogares',
          items: [
            { title: 'Tarifas Hogares' },
            { title: 'Encuentra tu tarifa de luz' },
            { title: 'Tarifa de Luz Un Precio' },
            { title: 'Tarifa de Luz Dos Precios' },
            { title: 'Tarifa Coche Eléctrico' },
            { title: 'Tarifa Gas' }
          ]
        }, {
          title: 'Tarifas Negocios',
          items: [
            { title: 'Tarifas Negocios' },
            { title: 'Encuentra tu tarifa de luz' },
            { title: 'Tarifa de Luz Un Precio' },
            { title: 'Tarifa de Luz Dos Precios' },
            { title: 'Tarifa de Luz Tres Precios' },
            { title: 'Casos Especiales de luz' }
          ]
        }, {
          title: 'Autoconsumo',
          items: [
            { title: 'Autoconsumo' },
            { title: 'Fórmula Solar Flexible' },
            { title: 'Fórmula Solar' },
            { title: 'Baterías Inteligentes' }
          ]
        }, {
          title: 'Productores'
        }, {
          title: 'Blog'
        }, {
          title: 'Contacto'
        }
      ]
    }
  }
}
</script>

<style scoped >

</style>
