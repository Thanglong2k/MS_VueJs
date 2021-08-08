(function(){

        
        var valueRadio5=$(".radio-item input[value='5']");
        $.each(valueRadio5,function(index,item){
            item.checked=true;
        })
        var valueRadio4=$(".radio-item input[value='4']"),
            rand = Math.floor(Math.random() * valueRadio5.length);
        valueRadio4[rand].checked = true;
        
        $("#btnupdate").click();

})();

(function () {
    var value5 = document.querySelectorAll("input[value='5']");
    for (let item of value5) {
      item.checked = true;
    }
    let questionList = document.querySelectorAll('.questions-list');
    
      let value4 = document.querySelectorAll("input[value='4']"),
        rand = Math.floor(Math.random() * value4.length);
      value4[rand].checked = true;
    document.getElementById('btnupdate').click();
  })();

