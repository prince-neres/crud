$("button").on("click", function () {
  let id = $("#id").val();
  let new_name = $("#name").val();
  let new_pswd = $("#pswd").val();

  switch (this.id) {
    case "create":
      $.ajax({
        url: "http://localhost:3000/users/create",
        type: "POST",
        data: JSON.stringify({
          id: id,
          nome: new_name,
          senha: new_pswd,
        }),
        contentType: "application/json",
        success: function (data) {
          console.log(data);
        }
      });
      break;
    case "read":
      $.ajax({
        type: "GET",
        url: "http://localhost:3000/users/read",
        success: function (data) {
          $("#res").text(JSON.stringify(data));
        },
      });
      break;
    case "update":
      $.ajax({
        url: "http://localhost:3000/users/update",
        type: "PUT",
        data: JSON.stringify({
          id: id,
          nome: new_name,
          senha: new_pswd,
        }),
        contentType: "application/json",
      });
      break;
    case "delete":
        $.ajax({
            url: "http://localhost:3000/users/delete",
            type: "DELETE",
            data: JSON.stringify({
              id: id,
            }),
            contentType: "application/json",
        });
    }
});
