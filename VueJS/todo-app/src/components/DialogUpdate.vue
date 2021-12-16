<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialogUpdate"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Update task</span>
        </v-card-title>
        <v-card-text>
                <v-text-field
                 :value="dataUpdate"
                 @input="value => handleUpdate(value)"
                ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="handleConfirmCancel"
          >
            Hủy
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="handleConfirmUpdate()"
          >
            Lưu
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  props: {
    dialogUpdate : {type: Boolean, default: false},
    updateTask : {type: String, default: ''}
  },
  data () {
      return {
          dataUpdate: ''
      }
  },
  watch:  {
    updateTask(){
      this.dataUpdate = this.updateTask;
    }
  },
  methods: {
    handleConfirmUpdate(){
      
      this.$emit('handleConfirmUpdate',this.dataUpdate);
    },
    handleConfirmCancel(){
        this.dataUpdate = this.updateTask; 
        this.$emit('handleConfirmCancel');
    },
    handleUpdate(value){
        this.dataUpdate = value;
    }
  }
}
</script>