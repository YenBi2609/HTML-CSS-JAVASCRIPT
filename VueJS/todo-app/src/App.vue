<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Todo App </v-list-item-title>
          <v-list-item-subtitle> My todo </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo darken-2" dark shrink>
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title class="todo">Todo List</v-app-bar-title>

      <v-spacer></v-spacer>
      <div> <v-text-field
        v-model="searchQuery"
        class="search"
        dense
        outlined
        label="Search"
        append-icon="mdi-magnify"
        hide-details
        clearable
      ></v-text-field></div>
      
    </v-app-bar>

    <v-main>
      <router-view :searchQuery="searchQuery"></router-view>
      <!--  -->
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      { title: "Todo", icon: "mdi-view-dashboard", to: "/todo" },
      { title: "About", icon: "mdi-image", to: "/about" },
    ],
    searchQuery: null
  })
};
</script>
<style scoped>
.search {
  width: 300px;
  margin-top: 10px ;
}
.todo >>> .v-app-bar-title__content {
  width: 100px !important;
}
</style>