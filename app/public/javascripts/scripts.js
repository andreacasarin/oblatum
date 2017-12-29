$(document).ready(function(){
    $("#get-users").click(function(){
        $.ajax({
                url: "http://localhost:3000/users",
                success: function(data) {
                    $("#get-users-listing").html('');
                    for (var i = 0; i < data.length; i++) {
                        element = data[i];
                        $("#get-users-listing").append(
                            '<p>' + element.email + ' -> ' + element.password + '</p>'
                        );
                    }
                }
        });
    });
});
