var database = firebase.database()
var dbRefUsers = database.ref('devs')

let skills = document.getElementsByName('skill');

function checkDev(userId) {
  var devRef = firebase.database().ref('devs/' + userId);
    devRef.on('value', (snapshot) => {
      const data = snapshot.val();
      console.log(data.uid)
    });
}

devform.onsubmit = function (event) {

    event.preventDefault() // Evita o redirecionamento da página

    var userId = devform.username.value;

  if (userId != '') {

    var devRef = firebase.database().ref('devs/' + userId);

    return devRef.once('value').then((snapshot) => {

      var username = (snapshot.val()) || 'Anonymous';
      
      if (username == 'Anonymous') {

        var data = {
          firstname: devform.firstName.value,
          lastname: devform.lastName.value,
          username: devform.username.value,
          email: devform.email.value,
          city: devform.city.value,
          state: devform.state.value,
          zipcode: devform.zip.value,
          education: devform.education.value,
          edustate: devform.edustate.value,
          edunivel: devform.edunivel.value,
          edustart: devform.edustart.value,
          eduend: devform.eduend.value,
          academy: devform.academy.value,
          course: devform.course.value,
          acting: devform.acting.value,
          primarylang: devform.primarylang.value,
          secondarylang: devform.secondarylang.value,
          skills: {},
          conquest: devform.conquest.value,
          projects: devform.projects.value,
          experience: devform.experience.value,
          certificates: devform.certificates.value,
          highlights: devform.highlights.value,
          moreinfo: devform.moreinfo.value
        }

        for (var i = 0; i < skills.length; i++) {
          if ( skills[i].checked ) {
              data.skills[skills[i].id] = skills[i].value;
          }
        }

        dbRefUsers.child(data.username).push(data).then(function () {
          alert('Dev cadastrado!')
          window.location.replace("index.html");
        }).catch(function (error) {
          console.log('Error: ', error)
        })

      } else {
        alert('Usuário já existe!')
        devform.username.value = ''
      }
    
    });  

  } else {
    alert('O username Github é obrigatório!')
  }

}