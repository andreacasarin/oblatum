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
        <b>Sign up!</b>
        <p id="description" style="font-size: 9pt">Something written here</p>
    </legend>

<b-form @submit="onSubmit">

<b-form-group 
    label="Name:"
    :state="form.name.state"
    :invalid-feedback="form.name.invalidFeedback">

    <b-input-group>
        <b-input-group-addon>
            <span class="icon ion-person"></span>
        </b-input-group-addon>
        <b-form-input id="name" type="text" v-model="form.name.value" :state="form.name.state"></b-form-input>
    </b-input-group>

</b-form-group>

<b-form-group 
    label="Surname:"    
    :state="form.surname.state"
    :invalid-feedback="form.surname.invalidFeedback">
    <b-input-group>
        <b-input-group-addon>
            <span class="icon ion-person"></span>
        </b-input-group-addon>
        <b-form-input id="surname" type="text" v-model="form.surname.value" :state="form.surname.state"></b-form-input>
    </b-input-group>
</b-form-group>

<b-form-group 
    label="Email:" 
    description="We'll never share your email with anyone else."
    :state="form.email.state"
    :invalid-feedback="form.email.invalidFeedback">

    <b-input-group>
        <b-input-group-addon>
            <span class="ion-email"></span>
        </b-input-group-addon>
        <b-form-input id="email" type="text" v-model="form.email.value" :state="form.email.state"></b-form-input>
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
        <b-form-input id="password" type="password" v-model="form.password.value" :state="form.password.state"></b-form-input>
    </b-input-group>

</b-form-group>

<b-form-group 
    label="Confirm password:"    
    :state="form.confirm.state"
    :invalid-feedback="form.confirm.invalidFeedback">

    <b-input-group>
        <b-input-group-addon>
            <span class="ion-locked"></span>
        </b-input-group-addon>
        <b-form-input id="confirm-password" type="password" v-model="form.confirm.value" :state="form.confirm.state"></b-form-input>
    </b-input-group>

</b-form-group>


<b-form-group class="text-center">
    <b-button id="signup" type="submit" variant="primary" class="text-center">Register</b-button>
    <b-form-text>
        <router-link :to="this.$path.recover" class="text-oblatum-color">Forgot your password?</router-link>
    </b-form-text>
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
            email: {
                value: '',
                state: null,
                invalidFeedback: 'invalid'
            },
            name: {
                value: '',
                state: null,
                invalidFeedback: 'invalid'
            },
            surname: {
                value: '',
                state: null,
                invalidFeedback: 'invalid'
            },
            password: {
                value: '',
                state: null,
                invalidFeedback: 'invalid'
            },
            confirm: {
                value: '',
                state: null,
                invalidFeedback: 'invalid'
            },
        }
    }
  },
  methods: {
    onSubmit (e) {
      this.form.name.state = false;
      this.form.confirm.state = false;
      e.preventDefault();
      alert(JSON.stringify(this.form));
    }
  }
}
</script>

<!-- b-form-1.vue -->