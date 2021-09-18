 $(document).ready( function () {
        fn_data();

        $('#orden-list').DataTable();

         $.ajaxSetup({
            headers: {
               'X-CSRF-TOKEN': $('meta[name="csrf_token_name"]').attr('content')
            }
         });

      });
      var save_method = 'null'; 
      var dropId = 0;

      function fn_load(){
        // subir datos
        $.ajax({
            url : "http://localhost/crud_codeigniter/public/api/data",           
            method: "GET",
            dataType: "JSON",
            cache: false,            
            success: function(dataResult){              
                //console.log(dataResult);
               alert(dataResult);
               location.reload();
            }
        });
      }

      function fn_data(){
        // cargar datos
        $.ajax({
            url : "http://localhost/crud_codeigniter/public/api/show",           
            method: "GET",
            dataType: "JSON",
            cache: false,            
            success: function(dataResult){              
                //console.log(dataResult);
                print(dataResult);
            }
        });
      }
      function print(data){
        content = "";
        data.forEach(element => {
            //console.log(element.id);
            content += "<tr>"
            content +=      "<td scope='row'>"+element.id+"</td>"
            content +=      "<td scope='row'>"+element.title+"</td>"
            content +=      "<td scope='row'>"+element.price+"</td>"
            content +=      "<td scope='row'>"+element.description+"</td>"
            content +=      "<td scope='row'>"+element.category+"</td>"
            content +=      "<td scope='row'><image src='"+element.image+"' style='width: 100px;'/></td>"
            content +=      "<td scope='row'>"
            content +=          "<span id='edit'  class='btn btn-primary btn-sm'  data-toggle='modal' data-target='#myModal' onclick='fn_edit("+element.id+")'>Edit</span>"
            content +=          "<span id='eliminar'  class='btn btn-danger btn-sm' data-toggle='modal' data-target='#myModalDelete' onclick='fn_delete("+element.id+")'>Delete</span>"             
            content +=      "</td>"
            content += "</tr>"
        });
        $('#data_grid tbody').append(content);

      }

      function fn_add(){
         save_method = 'add';
         $(".modal-title").html("Nuevo");
         $("#btn-save").show();     
         $("#btn-delete").hide();
         $('#form')[0].reset();
         $('#myModal').modal('show');
      }
      function fn_edit(pid){
         save_method = 'edit';
         $(".modal-title").html("Editar");
         $("#btn-save").show();
         $("#btn-delete").hide();

         // cargar datos
         $.ajax({
            url : "http://localhost/crud_codeigniter/public/api/edit/" + pid,           
            method: "GET",
            dataType: "JSON",
            cache: false,            
            success: function(dataResult){              
               //console.log(dataResult);

               $("#id").val(dataResult.id);
               $("#title").val(dataResult.title);
               $("#price").val(dataResult.price);
               $("#description").val(dataResult.description);
               $("#category").val(dataResult.category); 
               $("#image").val(dataResult.image); 
              
            }
         });

         $('#myModal').modal('show');
      }

      $(document).on('click', '#btn-save', function (e) {
         e.preventDefault();
     
         // guardar datos
         $.ajax({
            url : "http://localhost/crud_codeigniter/public/api/save",           
            method: "POST",
            dataType: "JSON",
            cache: false,
            data: {
               'id': $('#id').val(),
               'title': $('#title').val(),
               'price': $('#price').val(),
               'description': $('#description').val(),
               'category': $('#category').val(),
               'image': $('#image').val(),
               'bandera': save_method,
            },        
            success: function(dataResult){              
               console.log(dataResult);
               $('#myModal').modal('hide');
               // recargar tabla
               location.reload();
            }
         });
      });

      function fn_delete(pid){
         save_method = 'delete';
         $('#myModalDelete').modal('show');
         dropId = pid;         
      }
      function drop(){
         //alert(dropId);
         $.ajax({
               url : "http://localhost/crud_codeigniter/public/api/delete/" + dropId,           
               method: "POST",
               dataType: "JSON",
               cache: false,              
               success: function(dataResult){              
                  console.log(dataResult);               
                  // recargar tabla
                  location.reload();
               }
            });
      }