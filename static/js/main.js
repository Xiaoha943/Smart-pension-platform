$(document).ready(function () {
    $('.buttom').click(function () {
        $.post("server/search_server.php", {
            value: $('input:eq(0)').val()
        }, function (data, status) {
            console.log(data);
            $(".goods_form").hide();
            var father=$('.none,.div5');
            father.append(data);
        })
    })
})