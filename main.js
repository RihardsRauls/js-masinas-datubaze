// Nav funny, man šeit kods reāli pinas gan Latviešu, gan Angļu valodā.
// Ir kā ir

var tiritpoga = document.getElementById("tirisanaspoga");
var pircejaID = document.getElementById("id");
var lietotaji = [];

const date = new Date();
let day = date.getDate();
let month = date.getMonth() +1; // sāk skaitīt ar 0??????
let year = date.getFullYear();
let currentDate = `${day}/${month}/${year}`;

var savedData = localStorage.getItem("data");
var dataArray = JSON.parse(savedData);

if (dataArray == null) {
  dataArray = []
};

lietotaji = dataArray;

function izveidoID() {
    // Izveido jebkādu numuru starp 0 un 1 (neieskaitot 1)
    var cipars = Math.random();
    // iegūto numuru reizina 10000000000, lai varētu iegūt random 10 ciparu skaitli
    var IDskaitlis = Math.floor(cipars * 10000000000);
    //izvada skaitli, lai varētu izmantot
    return IDskaitlis;
  }  
function saglabat(){
    //Iegūst informāciju par katrā laukā ievadītajiem datiem
    var vardsValue = document.getElementById("vards").value;
    var uzvardsValue = document.getElementById("uzvards").value;
    var telefonsValue = document.getElementById("telefons").value;
    var markaValue = document.getElementById("marka").value;
    var modelisValue = document.getElementById("modelis").value;
    var ierasanasValue = document.getElementById("ierasanas").value;
    var vinvalue = document.getElementById("vin").value;
    var tlnumValue = document.getElementById("tl-num").value;
    var aprakstsValue = document.getElementById("apraksts").value;
    var idValue = document.getElementById("id").value;

    var existingID = lietotaji.find(function (item) {
        return item.id === idValue;
      });
    
      if (existingID) {
        // ja ir id, tad aizvieto iepriekšējās vērtības tajā ID
        existingID.vards = vardsValue;
        existingID.uzvards = uzvardsValue;
        existingID.telefons = telefonsValue;
        existingID.marka = markaValue;
        existingID.modelis = modelisValue;
        existingID.ierasanas = ierasanasValue;
        existingID.vin = vinvalue;
        existingID.tlnum = tlnumValue;
        existingID.apraksts = aprakstsValue;
      } else {
        // ja nav id, tad pievieno jaunam sarakstam.
        var object = {
          vards: vardsValue,
          uzvards: uzvardsValue,
          telefons: telefonsValue,
          marka: markaValue,
          modelis: modelisValue,
          ierasanas: ierasanasValue,
          vin: vinvalue,
          tlnum: tlnumValue,
          apraksts: aprakstsValue,
          id: idValue
        };
        
        //Ievieto lietotāju sarakstā
        lietotaji.push(object);
      }

    //uztaisa ļoti smuku json failu
    const savedjson = JSON.stringify(lietotaji, null, '  ');
    //saglabā viņu local storage
    localStorage.setItem("data", savedjson)
    //Izveido jaunu tabulu, tapēc ka ir jaunas vērtības
    generateTable();
    return savedjson;  
}
function saglabatuzJSON(){
  //pārbauda vai vispār ir kaut kas lokālajā atmiņā saglabāts, ja nav, tad neko, bet ja ir, tad izvada lejuplādei
    if (localStorage.getItem("data") == null){
        document.getElementById("savetojsonlabel").innerHTML = "NEKAS NAV SAGLABĀTS!";
        document.getElementById("atsvaidzinattabululabel").innerHTML = "<br>";
    }
    else{
        //Iekļauts, lai, ja pirms tam nebija saglabāts, bet tagad ir, lai noņemās.
        document.getElementById("savetojsonlabel").innerHTML = "";


        var fileName = 'dati.json';

        // ievieto jaunā "blobā"?? kuru var izmantot ar filesaver.js, ar kuru var lejuplādēt datus
        var fileToSave = new Blob([localStorage.getItem("data")], {
            type: 'application/json'
        });
        
        //es nezinu, FileSaver.js es paņēmu no interneta, lai varētu šo funkciju izmantot.
        saveAs(fileToSave, fileName);
    }
}
function izveidojaunuId() {
  // iztīra visu form tabulu un izveido jaunu id ar izveidoID funkciju
    document.getElementById("informacija").reset();
    ierasanas.value = currentDate;
    var jaunaisId = izveidoID();

    var existingID = lietotaji.find(function (item) {
      // console.log(item.id)
      // console.log(jaunaisId)
      return item.id == jaunaisId;
    });
  
    //cerams ka tavam tētim nebūs vairāk par 10000000000 klientiem, savādāk viņš iekļūs neapstādināmā ciklā un nekas neies :)
    if (existingID) {
      // ja ir atrasts id datubāzē, tad atkārtoti izsauc funkciju
      return izveidojaunuId();
    } 
    else{
      // ja nav, tad ievada kā jauno vērtību
      pircejaID.value = jaunaisId;
    }
}
function generateTable() {
  //Atrod tabulu un info, ja ir... ja nav... tad nav :)

  var table = document.getElementById("tabula")
  var dataArray = JSON.parse(localStorage.getItem("data"));
  if (dataArray == null) {
    dataArray = []
  };

  // izdzēš visu iepriekšējo tabulu
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }
  
    // Pievieno statisku pirmo rindu
    var staticRow = table.insertRow(0);

    var cell0 = staticRow.insertCell(0);
    cell0.innerHTML = "Vārds";
    cell0.classList.add("tabulasizskats");
    cell0.classList.add("sarkans");
    
    var cell1 = staticRow.insertCell(1);
    cell1.innerHTML = "Uzvārds";
    cell1.classList.add("tabulasizskats");
    cell1.classList.add("sarkans");
    
    var cell2 = staticRow.insertCell(2);
    cell2.innerHTML = "Telefons";
    cell2.classList.add("tabulasizskats");
    cell2.classList.add("sarkans");
    
    var cell5 = staticRow.insertCell(3);
    cell5.innerHTML = "Ierašanās datums";
    cell5.classList.add("tabulasizskats");
    cell5.classList.add("sarkans");

    var cell3 = staticRow.insertCell(4);
    cell3.innerHTML = "Marka";
    cell3.classList.add("tabulasizskats");
    cell3.classList.add("zils");
    
    var cell4 = staticRow.insertCell(5);
    cell4.innerHTML = "Modelis";
    cell4.classList.add("tabulasizskats");
    cell4.classList.add("zils");
    // Var redzēt kur pamainija tabulu lmao
    var cell6 = staticRow.insertCell(6);
    cell6.innerHTML = "VIN numurs";
    cell6.classList.add("tabulasizskats");
    cell6.classList.add("zils");
    
    var cell7 = staticRow.insertCell(7);
    cell7.innerHTML = "Mašīnas numurs";
    cell7.classList.add("tabulasizskats");
    cell7.classList.add("zils");
    
    var cell8 = staticRow.insertCell(8);
    cell8.innerHTML = "Apraksts";
    cell8.classList.add("tabulasizskats");
    cell8.classList.add("dzeltens");
    
    var cell9 = staticRow.insertCell(9);
    cell9.innerHTML = "Maksājuma ID";
    cell9.classList.add("tabulasizskats");

  // iet cauri katrai datu rindai, kas ir
  for (var i = 0; i < dataArray.length; i++) {
    var row = table.insertRow(-1);
    
    // ģenerē katru šūnu rindā un tai pievieno klasi un atšķirīgu ID.
    var cell1 = row.insertCell(0);
    cell1.innerHTML = dataArray[i].vards;
    cell1.classList.add("tabulasizskats");
    cell1.classList.add("sarkans");
    cell1.setAttribute("id", "ID"+dataArray[i].id+"vards");
    
    var cell2 = row.insertCell(1);
    cell2.innerHTML = dataArray[i].uzvards;
    cell2.classList.add("tabulasizskats");
    cell2.classList.add("sarkans");
    cell2.setAttribute("id", "ID"+dataArray[i].id+"uzvards");
    
    var cell3 = row.insertCell(2);
    cell3.innerHTML = dataArray[i].telefons;
    cell3.classList.add("tabulasizskats");
    cell3.classList.add("sarkans");
    cell3.setAttribute("id", "ID"+dataArray[i].id+"telefons");
    
    var cell6 = row.insertCell(3);
    cell6.innerHTML = dataArray[i].ierasanas;
    cell6.classList.add("tabulasizskats");
    cell6.classList.add("sarkans");
    cell6.setAttribute("id", "ID"+dataArray[i].id+"ierasanas");

    var cell4 = row.insertCell(4);
    cell4.innerHTML = dataArray[i].marka;
    cell4.classList.add("tabulasizskats");
    cell4.classList.add("zils");
    cell4.setAttribute("id", "ID"+dataArray[i].id+"marka");
    
    var cell5 = row.insertCell(5);
    cell5.innerHTML = dataArray[i].modelis;
    cell5.classList.add("tabulasizskats");
    cell5.classList.add("zils");
    cell5.setAttribute("id", "ID"+dataArray[i].id+"modelis");
    
    var cell7 = row.insertCell(6);
    cell7.innerHTML = dataArray[i].vin;
    cell7.classList.add("tabulasizskats");
    cell7.classList.add("zils");
    cell7.setAttribute("id", "ID"+dataArray[i].id+"vin");
    
    var cell8 = row.insertCell(7);
    cell8.innerHTML = dataArray[i].tlnum;
    cell8.classList.add("tabulasizskats");
    cell8.classList.add("zils");
    cell8.setAttribute("id", "ID"+dataArray[i].id+"tl-num");
    
    var cell9 = row.insertCell(8);
    cell9.innerHTML = dataArray[i].apraksts;
    cell9.classList.add("tabulasizskats");
    cell9.classList.add("dzeltens");
    cell9.setAttribute("id", "ID"+dataArray[i].id+"apraksts");
    
    //šī tabulas šūna savādāka, jo pievieno anchor ar spēju izsaukt edit() funkciju
    var cell10 = row.insertCell(9);
    cell10.innerHTML = "";
    cell10.classList.add("tabulasizskats");
    cell10.setAttribute("id", "ID"+dataArray[i].id);
    var link = document.createElement("a");
    link.href = "javascript:edit("+ dataArray[i].id +")";
    link.innerHTML = dataArray[i].id;
    cell10.appendChild(link);
    let btn = document.createElement("button");
    btn.innerHTML = "Dzēst";
    btn.setAttribute("onclick","deleter("+dataArray[i].id+")");
    cell10.appendChild(btn);
  }
}

function deleter(findid){
  index=0

  for (var i = 0; i < lietotaji.length; i++) {
    // console.log(dataArray[i].id)
    // console.log(findid)
    if (lietotaji[i].id == findid){
      index=i
      break
    }
  }
  
  dataArray.splice(index, 1)
  
  //uztaisa ļoti smuku json failu
  const savedjson = JSON.stringify(lietotaji, null, '  ');
  //saglabā viņu local storage
  localStorage.setItem("data", savedjson)
  //Izveido jaunu tabulu, tapēc ka ir jaunas vērtības
  generateTable();
  return savedjson;  
}

function search(){
  var type = document.getElementById("veids");
  var thesearch = document.getElementById("meklesana");
  var table = document.getElementById("tabula");
  var selectedValue = type.value;
  var search = thesearch.value;

  //Es nevarēju izdomāt smukāku veidu, kā var apskatīt kuras rindas šūnu vajag apskatīties.
  if(selectedValue == "vards"){
    num = 0;
  }
  else if(selectedValue == "uzvards"){
    num = 1;
  }
  else if(selectedValue == "telefons"){
    num = 2;
  }
  else if(selectedValue == "marka"){
    num = 3;
  }
  else if(selectedValue == "modelis"){
    num = 4;
  }
  else if(selectedValue == "ierasanas"){
    num = 5;
  }
  else if(selectedValue == "vin"){
    num = 6;
  }
  else if(selectedValue == "tl-num"){
    num = 7;
  }
  else if(selectedValue == "apraksts"){
    num = 8;
  }
  else if(selectedValue == "id"){
    num = 9;
  };
  
  //Izlaiž pirmo rindu, tapēc ka tur ir tikai
  for (let i = 1; i < table.rows.length; i++) {
    const row = table.rows[i];
    const idCell = row.cells[num];
    
    console.log(idCell.innerHTML)

    // Skatās vai šūnas vērtība ir vienāda ar meklēto vērtību
    if (idCell.innerHTML == search) {
      // Parādīt rindu
      row.style.display = "table-row";
    } else {
      // Paslēpt rindu
      row.style.display = "none";
    }
  }
};

function edit(id){
  //šī funkcija paņem un laukos ievada noteiktās id lauka vērtības

  document.getElementById("vards").value = document.getElementById("ID"+id+"vards").innerHTML;
  document.getElementById("uzvards").value = document.getElementById("ID"+id+"uzvards").innerHTML;
  document.getElementById("telefons").value = document.getElementById("ID"+id+"telefons").innerHTML;
  document.getElementById("marka").value = document.getElementById("ID"+id+"marka").innerHTML;
  document.getElementById("modelis").value = document.getElementById("ID"+id+"modelis").innerHTML;
  document.getElementById("ierasanas").value = document.getElementById("ID"+id+"ierasanas").innerHTML;
  document.getElementById("vin").value = document.getElementById("ID"+id+"vin").innerHTML;
  document.getElementById("tl-num").value = document.getElementById("ID"+id+"tl-num").innerHTML;
  document.getElementById("apraksts").value = document.getElementById("ID"+id+"apraksts").innerHTML;
  document.getElementById("id").value = id;

};

//izvada tabulu sākotnējo tabulu, un sagatavo laukus ar datiem.
generateTable();

pircejaID.value = izveidoID();
ierasanas.value = currentDate;