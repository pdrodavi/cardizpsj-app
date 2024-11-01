var database = firebase.database()
var dbRefUsers = database.ref('devs')

var userContent = document.getElementById('userContent')
var userImg = document.getElementById('userImg')
var getDev = document.getElementById('getdev')
var todoCount = document.getElementById('todoCount')
var ulTodoList = document.getElementById('ulTodoList')

var userEmail = document.getElementById('userEmail')
var firstName = document.getElementById('firstName')
var lastName = document.getElementById('lastName')
var userName = document.getElementById('userName')
var country = document.getElementById('country')
var state = document.getElementById('state')
var zip = document.getElementById('zip')
var education = document.getElementById('education')
var edustate = document.getElementById('edustate')
var edunivel = document.getElementById('edunivel')
var edustart = document.getElementById('edustart')
var eduend = document.getElementById('eduend')
var course = document.getElementById('course')
var academy = document.getElementById('academy')
var acting = document.getElementById('acting')
var primarylang = document.getElementById('primarylang')
var secondarylang = document.getElementById('secondarylang')
var skills = document.getElementsByName('skill')
var conquest = document.getElementById('conquest')
var projects = document.getElementById('projects')
var experience = document.getElementById('experience')
var certificates = document.getElementById('certificates')
var highlights = document.getElementById('highlights')
var moreinfo = document.getElementById('moreinfo')


getdevform.onsubmit = function (event) {

    event.preventDefault() // Evita o redirecionamento da página
  
    var userId = getdevform.username.value;
  
  if (userId != '') {
  
    var devRef = firebase.database().ref('devs/' + userId);
  
    return devRef.once('value').then((snapshot) => {
  
      var username = (snapshot.val()) || 'Anonymous';
      
      if (username == 'Anonymous') {
        alert('Dev não existe na base!')
        window.location.replace("getdev.html");
      } else {
        snapshot.forEach(function (item) { // Percorre todos os elementos
            var value = item.val()
            firstName.placeholder = value.firstname
            lastName.placeholder = value.lastname
            userEmail.placeholder = value.email
            userName.placeholder = value.username
            course.placeholder = value.course
            academy.placeholder = value.academy
            zip.placeholder = value.zipcode
            city.placeholder = value.city
            state.placeholder = value.state
            education.placeholder = value.education
            edustate.placeholder = value.edustate
            edunivel.placeholder = value.edunivel
            edustart.value = value.edustart
            eduend.value = value.eduend
            acting.placeholder = value.acting
            primarylang.placeholder = value.primarylang
            secondarylang.placeholder = value.secondarylang

            Object.keys(value.skills).forEach(function(item){
              //console.log(item + " = " + value.skills[item]);
              document.getElementById(item).checked = true
             });

             
             if (! value.conquest == '' || value.conquest == 'undefined') {
              conquest.value = value.conquest
             } else {
              hideItem(document.getElementById('conquest'))
              hideItem(document.getElementById('lconquest'))
             }

             if (! value.projects == '' || value.projects == 'undefined') {
              projects.value = value.projects
             } else {
              hideItem(document.getElementById('projects'))
              hideItem(document.getElementById('lprojects'))
             }

             if (! value.experience == '' || value.experience == 'undefined') {
              experience.value = value.experience
             } else {
              hideItem(document.getElementById('experience'))
              hideItem(document.getElementById('lexperience'))
             }

             if (! value.certificates == '' || value.certificates == 'undefined') {
              certificates.value = value.certificates
             } else {
              hideItem(document.getElementById('certificates'))
              hideItem(document.getElementById('lcertificates'))
             }

             if (! value.highlights == '' || value.highlights == 'undefined') {
              highlights.value = value.highlights
             } else {
              hideItem(document.getElementById('highlights'))
              hideItem(document.getElementById('lhighlights'))
             }

             if (! value.moreinfo == '' || value.moreinfo == 'undefined') {
              moreinfo.value = value.moreinfo
             } else {
              hideItem(document.getElementById('moreinfo'))
              hideItem(document.getElementById('lmoreinfo'))
             }

          })
      }

      for (var i = 0; i < skills.length; i++) {
        if ( !document.getElementById(skills[i].id).checked ) {
            document.getElementById(skills[i].id).style.display = 'none'
        }
      }

      hideItem(getDev)
      showItem(userContent)
    
    });  
  
  } else {
    alert('O username Github é obrigatório!')
  }
  
  }

// Simplifica a exibição de elementos da página
function showItem(element) {
    element.style.display = 'block'
  }
  
  // Simplifica a remoção de elementos da página
  function hideItem(element) {
    element.style.display = 'none'
  }  