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
    label="Name:">

    <b-input-group>
        <b-input-group-addon>
            <span class="icon ion-person"></span>
        </b-input-group-addon>
        <b-form-input id="name" type="text" v-model="form.name"></b-form-input>
    </b-input-group>

</b-form-group>

<b-form-group 
    label="Surname:">
    <b-input-group>
        <b-input-group-addon>
            <span class="icon ion-person"></span>
        </b-input-group-addon>
        <b-form-input id="surname" type="text" v-model="form.surname"></b-form-input>
    </b-input-group>
</b-form-group>

<b-form-group 
    label="Email:" 
    description="We'll never share your email with anyone else.">

    <b-input-group>
        <b-input-group-addon>
            <span class="ion-email"></span>
        </b-input-group-addon>
        <b-form-input id="email" type="text" v-model="form.email"></b-form-input>
    </b-input-group>

</b-form-group>

<b-form-group 
    label="Password:">

    <b-input-group>
        <b-input-group-addon>
            <span class="ion-locked"></span>
        </b-input-group-addon>
        <b-form-input id="password" type="password" v-model="form.password"></b-form-input>
    </b-input-group>

</b-form-group>

<b-form-group 
    label="Confirm password:">

    <b-input-group>
        <b-input-group-addon>
            <span class="ion-locked"></span>
        </b-input-group-addon>
        <b-form-input id="confirm-password" type="password" v-model="form.confirm"></b-form-input>
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
            email: '',
            name: '',
            surname: '',
            password: '',
            confirm: ''
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