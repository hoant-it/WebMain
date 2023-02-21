var txtcurrentpassword = document.getElementById("txtcurrentpassword");
txtnewpassword= document.getElementById("txtnewpassword");
txtConfirmPassword= document.getElementById("txtConfirmPassword");


let btnShowPassCurrent = document.getElementById("btnShowPassCurrent");
let btnShowPassNew= document.getElementById("btnShowPassNew");
let btnShowPassConfirm= document.getElementById("btnShowPassConfirm");
const saveData = () => {
    var userId= $("#txtUserName").val();
    var currentpassword = $("#txtcurrentpassword").val();
    $('.required').after(currentpassword);
    var newpassword = $("#txtnewpassword").val();
    $('.required').after(newpassword);
    var confirmPassword = $("#txtConfirmPassword").val();
    $('.required').after(confirmPassword);

    if (newpassword.length < 8) {
        $('#txtnewpassword').before('<span class="error">This field is required</span>');
      }

    var data={
        UserId:userId,
        Currentpassword:currentpassword,
        Newpassword:newpassword,
        ConfirmPassword:confirmPassword
    };

    $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/changepassword',
            success: function(res) {
                if (res === 'ok') {
                    // console.log('success');
                    // console.log(JSON.stringify(res));
                    // $('#modalAddUpdate').modal('hide');
                    alert("Update success");
                    location.reload();
                } else {
                    console.log(JSON.stringify(res));
                    alert(res);
                }
            }
        });

}

function showPassCurrent() {
    if (txtcurrentpassword.type === 'password') {
        txtcurrentpassword.type = "text"
        btnShowPassCurrent.classList.replace("fa-eye", "fa-eye-slash")
    } else {
        txtcurrentpassword.type = "password"
    
        btnShowPassCurrent.classList.replace("fa-eye-slash", "fa-eye")
    }
}

function showPassNew() {
    if (txtnewpassword.type === 'password') {
        txtnewpassword.type = "text"
        btnShowPassNew.classList.replace("fa-eye", "fa-eye-slash")
    } else {
        txtnewpassword.type = "password"
    
        btnShowPassNew.classList.replace("fa-eye-slash", "fa-eye")
    }
}

function showPassConfirm() {
    if (txtConfirmPassword.type === 'password') {
        txtConfirmPassword.type = "text"
        btnShowPassConfirm.classList.replace("fa-eye", "fa-eye-slash")
    } else {
        txtConfirmPassword.type = "password"
    
        btnShowPassConfirm.classList.replace("fa-eye-slash", "fa-eye")
    }
}

$(document).ready(function() {
    btnShowPassCurrent.addEventListener("click", showPassCurrent)
    btnShowPassNew.addEventListener("click", showPassNew)
    btnShowPassConfirm.addEventListener("click", showPassConfirm)
    $("#txtUserName").attr("readonly","true");

    // Khi bàn phím được nhấn và thả ra thì sẽ chạy phương thức này
    // kiem tra thong tin truoc khi save
		// $("#formSaveID").validate({
		// 	rules: {
		// 		txtcurrentpassword: "required",
		// 		txtnewpassword: "required",
		// 		txtConfirmPassword: {
		// 			required: true,
		// 			minlength: 8
		// 		}
		// 	},
		// 	messages: {
		// 		txtcurrentpassword: "Vui lòng nhập họ",
		// 		txtnewpassword: "Vui lòng nhập tên",
		// 		txtConfirmPassword: {
		// 			required: "Vui lòng nhập địa chỉ",
		// 			minlength: "Địa chỉ ngắn vậy, chém gió ah?"
		// 		}
		// 	},
        //     // submitHandler: function(form) {
        //     //     form.submit();
        //     //   }
		// });

    $("#btnSaveId").click( (evt)=>{
        evt.preventDefault();
        saveData();

    });

    	

});