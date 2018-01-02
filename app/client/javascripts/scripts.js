$(document).ready(() => {
  $('#get-users').click(() => {
    $.ajax({
      url: 'http://localhost:3000/users',
      success: (data) => {
        $('#get-users-listing').html('');
        for (let i = 0; i < data.length; i += 1) {
          const element = data[i];
          $('#get-users-listing').append(`<p> ${element.email} -> ${element.password}</p>`);
        }
      },
    });
  });
});