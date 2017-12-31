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

<b-form>

<b-form-group>
    <label class="textfield-label">Name:</label>
    <b-input-group>
        <b-input-group-addon>
            <span class="icon ion-person"></strong>
        </b-input-group-addon>
        <b-form-input id="name" type="text"></b-form-input>
    </b-input-group>
</b-form-group>

<b-form-group>
    <label class="textfield-label">Surname:</label>
    <b-input-group>
        <b-input-group-addon>
            <span class="icon ion-person"></strong>
        </b-input-group-addon>
        <b-form-input id="surname" type="text"></b-form-input>
    </b-input-group>
</b-form-group>

<b-form-group>
    <label class="textfield-label">Email:</label>
    <b-input-group>
        <b-input-group-addon>
            <span class="ion-email"></strong>
        </b-input-group-addon>
        <b-form-input id="email" type="text"></b-form-input>
    </b-input-group>
    <b-form-text>We'll never share your email with anyone else.</b-form-text>
</b-form-group>

<b-form-group>
    <label class="textfield-label">Password:</label>
    <b-input-group>
        <b-input-group-addon>
            <span class="ion-locked"></strong>
        </b-input-group-addon>
        <b-form-input id="password" type="password"></b-form-input>
    </b-input-group>
</b-form-group>

<b-form-group>
    <label class="textfield-label">Confirm password:</label>
    <b-input-group>
        <b-input-group-addon>
            <span class="ion-locked"></strong>
        </b-input-group-addon>
        <b-form-input id="confirm-password" type="password"></b-form-input>
    </b-input-group>
</b-form-group>


<b-form-group class="text-center">
    <b-button id="signup" type="submit" variant="primary" class="text-center">Register!</b-button>
    <b-form-text><a href="#">Forgot your password?</a></b-form-text>
</div>


</b-form>
</b-container>

</div>
</template>

<script>
</script>

<!-- b-form-1.vue -->