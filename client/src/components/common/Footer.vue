<template>
  <footer class="container-fluid">
    <div class="row pt-5 pb-5 align-items-center">
      <div class="col-sm-2">
        <img
        src="../../assets/logo-black.svg"
        alt="Logo black"
        class="img-fluid"
        />
      </div>

      <div class="col-sm-3">
        <span class="h1-alike">Oblatum</span>
      </div>

      <div class="col-sm-7">
        <div class="float-sm-right">
          <h5>Contacts</h5>
          <div class="icon-align pt-2">
            <i class="fa fa-envelope h5-alike mr-2" aria-hidden="true"></i>
            <a href="mailto:support@oblatum.it">support@oblatum.it</a>
          </div>
          <div class="pt-5">
            Oblatum &copy; 2018
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
    };
  },
};
</script>
