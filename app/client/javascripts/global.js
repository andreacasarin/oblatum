$('#what-we-do-btn').click(function() {
    $('html,body').animate({scrollTop: $('#what-we-do-sec').offset().top}, 'slow');
});

$('#team-btn').click(function() {
    $('html,body').animate({scrollTop: $('#team-sec').offset().top}, 'slow');
});

$('#contacts-btn').click(function() {
    $('html,body').animate({scrollTop: $('#contacts-sec').offset().top}, 'slow');
});

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

$('#signup').click(function() {
    var mail = $('#email-input').val();
    var isValid = validateEmail(mail);
    if(isValid){
        saveData(mail);
        $('#email-input').val("");
        $('#email-sent').fadeIn( "fast", function(){});
    }else{
        $('#email-not-sent').fadeIn( "fast", function(){});
    }
});

$('#email-not-sent').click(function(){
    $('#email-not-sent').fadeOut( "fast", function(){});
});

$('#email-sent').click(function(){
    $('#email-sent').fadeOut( "fast", function(){});
});

function saveData(email){
    $.ajax({
        type: 'POST',
        data: JSON.stringify({email: email}),
        contentType: 'application/json',
        url: '/api/sendmail',
            success: function(data) {
                console.log('success');
                console.log(JSON.stringify(data));
            }
    });
}
