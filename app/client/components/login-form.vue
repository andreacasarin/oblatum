<style>
    .form-container{
        background-color: whitesmoke;
        border-radius: 10px;
        max-width: 450px;

        padding-bottom: 30px;
        padding-left: 15px;
        padding-right: 15px;
        padding-top: 30px;

        margin-bottom: 45px;
        margin-top: 75px;
    }

    .textfield-label{
        
    }

</style>

<template>
<div>
<b-container class="form-container">

    <legend class="text-center">
        <b>Sign in!</b>
        <p id="description" style="font-size: 9pt">Something written here</p>
    </legend>

<b-form @submit="onSubmit">

<b-form-group 
    label="Email:" 
    :state="form.email.state"
    :invalid-feedback="form.email.invalidFeedback">

    <b-input-group>
        <b-input-group-addon>
            <span class="ion-email"></span>
        </b-input-group-addon>
        <b-form-input id="email" type="text" v-model="form.email.value"></b-form-input>
    </b-input-group>

</b-form-group>

<b-form-group 
    label="Password:"
    :state="form.password.state"
    :invalid-feedback="form.password.invalidFeedback">

    <b-input-group>
        <b-input-group-addon>
            <span class="ion-locked"></span>
        </b-input-group-addon>
        <b-form-input id="password" type="password" v-model="form.password.value"></b-form-input>
    </b-input-group>

</b-form-group>


<b-form-group class="text-center">
    <b-button id="signup" type="submit" variant="primary" class="text-center">Login</b-button>
    <b-form-text><router-link :to="this.$path.recover" class="text-oblatum-color">Forgot your password?</router-link></b-form-text>
</b-form-group>


</b-form>
</b-container>

</div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        email: {
            value: '',
            state: null,
            invalidFeedback: 'invalid'
        },
        password: {
            value: '',
            state: null,
            invalidFeedback: 'invalid'
        }
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