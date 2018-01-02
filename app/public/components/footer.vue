<style>
    /*FOOTER*/
.footer{
    padding-top:25px;
    background-color: whitesmoke;
    padding-bottom: 25px;
}

.footer-logo{
    padding-left: 75px;
}



/*workaround*/
@media (max-width: 768px){
    .footer-logo{
        padding-left: 0px;
    }

    .footer-aboutus{
        padding-left: 50px;
        padding-right: 50px;
        text-align: center;
    }
}


.copyright{
    padding-left: 20px;
}


.footer-label{
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
}


.footer-section{
    margin-top: 15px;
}


.icon-padding{
    padding-right: 10px;
    font-size: 24px;
    vertical-align: middle;
}

.icon-align{
    text-align: middle;
}

.email-link{
    color: black;
}

.email-link:hover{
    color: lightgrey;
}
</style>

<template>
<footer id="contacts-sec">
  <div class="footer container-fluid">
    <b-row class="justify-content-between">


        <!-- footer contact us -->
      <b-col col md="3" order-md="2" class="footer-section">
            <b-row class="footer-label justify-content-center justify-content-md-between">
                Contacts
            </b-row>
            <b-row class="justify-content-center justify-content-md-start">
                <span class="icon-align"><i class="ion-ios-telephone icon-padding"></i>+39 3278562208</span>
            </b-row>

            <b-row class="justify-content-center justify-content-md-start">
                <span class="icon-align"><i class="ion-email icon-padding"></i>
                <a class="email-link" href="mailto:reaalessandro95@gmail.com">reaalessandro95@gmail.com</a></span>
            </b-row>
        </b-col>

        <!-- footer About Us -->
        <!--<div class="col-md-3 footer-section order-md-3">
            <p class="row footer-label justify-content-center justify-content-md-start">
                About Us
            </p> 
            <p class="row footer-aboutus">
                Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
            </p>
        </div>-->

        <!-- footer logo -->
        <b-col md="9" order-md="1" class="footer-section footer-logo">
            <b-row class="justify-content-center justify-content-md-start">
                    <img class="float-right" 
                    src="../images/logo-black.svg" 
                    alt="Logo black"
                    height="100px"
                    width="100px" 
                    />
                <h1 class="footer-logo-text my-auto">Oblatum</h1>
            </b-row>
            <b-row class="copyright justify-content-center justify-content-md-start">Oblatum © 2018</b-row>
        </b-col>
    </b-row>
  </div>
</footer>
</template>

<script>
</script>