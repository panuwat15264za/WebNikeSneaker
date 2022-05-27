window.onload = pageLoad;

function pageLoad() {
	var form = document.getElementById("myForm");
 	form.onsubmit = validateForm;
}

function validateForm() {
    // var pass = document.forms["myForm"]["password"];
    // var pass1 = document.forms["myForm"]["password1"];
    var pass = document.getElementById("pass");
    var pass1 = document.getElementById("pass1");
    console.log(pass1);
    console.log(pass);
    var error = document.getElementById("errormsg");
    var repassT = true;
    error.innerHTML = "";
    
    if (pass.value != pass1.value)
    {
        error.innerHTML += "สมัครไม่ถูกต้อง, โปรดลองอีกครั้ง";
        alert('สมัครไม่ถูกต้อง, โปรดลองอีกครั้ง');
        return false;
        // repassT = false;
    }
    else {
        return true;
    }
    // return repassT;
    //ถ้าตรวจสอบแล้วว่ามีการ register ไม่ถูกต้องให้ return false ด้วย
}