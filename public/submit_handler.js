$(function () {
    $('#convertForm').submit(function (event) {
        event.preventDefault();
        $.ajax({
            url: '/api/convert',
            type: 'get',
            data: $('#convertForm').serialize(),
            success: function (data) {
                $('#result').text(data.string || data.error);
                $('#jsonResult').text(JSON.stringify(data));
            }
        });
    });
});