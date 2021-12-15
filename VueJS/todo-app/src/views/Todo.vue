<template>
  <div class="home pa-0">
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
    <v-list flat>
      <div v-for="task in tasks" :key="task.id">
        <v-list-item
          @click="doneTask(task.id)"
          :class="{ 'blue lighten-3': task.done }"
        >
          <template v-slot:default>
            <v-list-item-action>
              <v-checkbox :input-value="task.done" color="primary"></v-checkbox>
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
  name: "Home",
  data() {
    return {
      displayDialogDelete: false,
      displayDialogUpdate: false,
      newTaskTitle: "",
      idSelected: "1",
      titleSelected: "123",
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
    },
    deleteTask(id) {
      // this.tasks = this.tasks.slice((id-1),1);
      this.displayDialogDelete = true;
      this.idSelected = id;
    },
    updateTask(id) {
      this.displayDialogUpdate = true;
      this.idSelected = id;
      this.getTitleTaskIsUpdated();
    },
    addTask() {
      // this.tasks.push({
      //   id: Date.now(),
      //   title: this.newTaskTitle,
      //   done: false,
      // });

      axios.post("http://localhost/todo-app/api/task/create.php", {
          title: this.newTaskTitle,
          done: "false"
        })
        .then((res) => {
          if (res.status == 200) {
            this.newTaskTitle = "";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleConfirmDelete() {
      this.displayDialogDelete = false;
      this.tasks = this.tasks.filter((task) => task.id != this.idSelected);
    },
    handleConfirmCancel() {
      this.displayDialogUpdate = false;
      this.displayDialogDelete = false;
    },
    handleConfirmUpdate(newTitle) {
      this.displayDialogUpdate = false;
      let task = this.tasks.filter((task) => task.id === this.idSelected);
      task[0].title = newTitle;
    },
    getTitleTaskIsUpdated() {
      let task = this.tasks.filter((task) => task.id === this.idSelected);
      this.titleSelected = task[0].title;
    },
    getTask() {
      axios.get("http://localhost/todo-app/api/task/read.php")
        .then((res) => {
          res.data.task.map(function (a) {
            a.done = a.done === "true";
          });
          this.tasks = res.data.task;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getTask();
  },
};
</script>
