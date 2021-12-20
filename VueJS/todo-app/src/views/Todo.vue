<template>
  <div>
    <v-card class="overflow-y-auto" height="515">
      <v-list class="pa-0 pt-2" flat>
        <div v-for="task in resultQuery" :key="task.id" class="pl-6 pr-6">
          <v-list-item
            @click="doneTask(task.id)"
            :class="{ 'blue lighten-3': task.done }"
            class="pa-0"
          >
            <template v-slot:default>
              <v-list-item-action>
                <v-checkbox
                  :input-value="task.done"
                  color="primary"
                  class="pl-3"
                ></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title
                  :class="{ 'text-decoration-line-through': task.done }"
                  >{{ task.title }}</v-list-item-title
                >
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon @click.stop="updateTask(task.id)">
                  <v-icon color="primary lighten-1">mdi-lead-pencil</v-icon>
                </v-btn>
              </v-list-item-action>

              <v-list-item-action>
                <v-btn icon @click.stop="deleteTask(task.id)">
                  <v-icon color="primary lighten-1">mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider></v-divider>
        </div>
      </v-list>
    </v-card>

    <v-text-field
      v-model="newTaskTitle"
      @click:append="addTask()"
      @keyup.enter="addTask()"
      class="pa-3"
      outlined
      label="Add task"
      append-icon="mdi-plus"
      hide-details
      clearable
    ></v-text-field>

    <dialog-delete
      v-bind:dialogDelete="displayDialogDelete"
      v-on:handleConfirmDelete="handleConfirmDelete"
      v-on:handleConfirmCancel="handleConfirmCancel"
    />
    <dialog-update
      v-bind:dialogUpdate="displayDialogUpdate"
      v-on:handleConfirmCancel="handleConfirmCancel"
      v-bind:updateTask="titleSelected"
      v-on:handleConfirmUpdate="handleConfirmUpdate"
    />
  </div>
</template>

<script>
import DialogDelete from "../components/DialogDelete";
import DialogUpdate from "../components/DialogUpdate";
import axios from "axios";

export default {
  name: "Todo",
  props: {
    searchQuery: { type: String, default: "" },
  },
  data() {
    return {
      displayDialogDelete: false,
      displayDialogUpdate: false,
      newTaskTitle: "",
      idSelected: "1",
      titleSelected: "",
      tasks: [],
    };
  },
  components: {
    DialogDelete,
    DialogUpdate,
  },
  methods: {
    doneTask(id) {
      let task = this.tasks.filter((task) => task.id === id)[0];
      task.done = !task.done;
      this.idSelected = id;
      this.getTitleTaskIsUpdated();

      axios
        .put("http://localhost/todo-app/api/task/update.php", {
          id: id,
          title: this.titleSelected,
          done: task.done.toString(),
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteTask(id) {
      this.displayDialogDelete = true;
      this.idSelected = id;
    },
    updateTask(id) {
      this.displayDialogUpdate = true;
      this.idSelected = id;
      this.getTitleTaskIsUpdated();
    },
    addTask() {
      axios
        .post("http://localhost/todo-app/api/task/create.php", {
          title: this.newTaskTitle,
          done: "false",
        })
        .then((res) => {
          if (res.status == 200) {
            this.newTaskTitle = "";
            this.getTask();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleConfirmDelete() {
      this.displayDialogDelete = false;
      this.tasks = this.tasks.filter((task) => task.id != this.idSelected);
      console.log(this.idSelected);
      axios
        .delete("http://localhost/todo-app/api/task/delete.php", {
          data: {
            id: this.idSelected,
          },
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleConfirmCancel() {
      this.displayDialogUpdate = false;
      this.displayDialogDelete = false;
    },
    handleConfirmUpdate(newTitle) {
      this.displayDialogUpdate = false;
      let task = this.tasks.filter((task) => task.id === this.idSelected);
      task[0].title = newTitle;

      axios
        .put("http://localhost/todo-app/api/task/update.php", {
          id: this.idSelected,
          title: newTitle,
          done: this.tasks
            .filter((task) => task.id === this.idSelected)[0]
            .done.toString(),
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getTitleTaskIsUpdated() {
      let task = this.tasks.filter((task) => task.id === this.idSelected);
      this.titleSelected = task[0].title;
    },
    getTask() {
      axios
        .get("http://localhost/todo-app/api/task/read.php")
        .then((res) => {
          res.data.task.map(function (a) {
            a.done = a.done === "true";
          });
          this.tasks = res.data.task.sort(function (a, b) {
            return b.id - a.id;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getTask();
  },
  computed: {
    resultQuery() {
      if (this.searchQuery) {
        // return this.tasks.filter((item)=>{
        //   return this.searchQuery.toLowerCase().split(' ').every(v => item.title.toLowerCase().includes(v))
        // })
        let s = this.searchQuery.toLowerCase();
        return this.tasks.filter((item) => {
          return item.title.toLowerCase().includes(s);
        });
      } else {
        return this.tasks;
      }
    },
  },
};
</script>
