<template>
<div>
<b-container class="form-container">

    <legend class="text-center">
        <b>Recover your password</b>
        <p id="description" style="font-size: 9pt">Something written here</p>
    </legend>

<b-form @submit="onSubmit">

<b-form-group
    label="Email:">

    <b-input-group>
        <b-input-group-addon>
            <span class="ion-email"></span>
        </b-input-group-addon>
        <b-form-input id="email" type="text" v-model="form.email"></b-form-input>
    </b-input-group>

</b-form-group>

<b-form-group class="text-center">
    <b-button id="signup" type="submit" variant="primary" class="text-center">Send email</b-button>
</b-form-group>


</b-form>
</b-container>

</div>
</template>

<script>
export default {
  data: function(){
    return {
      form: {
          email: '',
      }
    }
  },
  methods: {
    onSubmit (e) {
      e.preventDefault();
      alert(JSON.stringify(this.form));
    }
  }
}
</script>

<!-- b-form-1.vue -->