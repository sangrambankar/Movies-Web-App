function initialize () {
}

function sendRequest () {
   var xhr = new XMLHttpRequest();
   var query = encodeURI(document.getElementById("form-input").value);
   xhr.open("GET", "proxy.php?method=/3/search/movie&query=" + query);
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
       if (this.readyState == 4) {
        var json = JSON.parse(this.responseText);
        var searchresults =  document.getElementById("searchresults");
        var totalresults = json.total_results;
        searchresults.innerHTML = totalresults+' no. of results found';
        
        var output =  document.getElementById("output");
        output.innerHTML = "";
        var results = json.results;


        for(var obj in results){

          var id = results[obj].id;
          var posterpath = results[obj].poster_path;
          var title = results[obj].title;
          var releasedate = results[obj].release_date;
          var row = document.createElement("div");


          var div = '<div class="card left-card">' 
                    +'<div class="">'   
                    +'<img src="https://image.tmdb.org/t/p/w500'+posterpath+'" style = " width:185px; height:278px;" alt="No Image Found" />'
                    +'</div>'
                    +'<div class="info">'
                    + '<h1 onclick="movieDetails('+id+');" >'+title+'</h1>'
                    + '<p class="cardp">Release Date:'+releasedate+'</p>'
                    + '<p class="viewmore">'
                     +'<a id="movie_'+id+'" onclick="movieDetails('+id+');" >More Info</a>'
                     +'</p>'
                    +'</div>'
                    +'</div>';
         
          row.innerHTML = div;
          output.appendChild(row);
        }

        
    
       }else{

       }

   };
   xhr.send(null);
}
function movieDetails(movieid){
   var xhr = new XMLHttpRequest();
   var id = movieid;
   
   xhr.open("GET", "proxy.php?method=/3/movie/" + id);
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        var json = JSON.parse(this.responseText);
        var title = json.title;
        var posterpath = json.poster_path;
        var releasedate = json.release_date;
        var overview = json.overview;
        var genres = json.genres;
        var genarray =  new Array();
        for(gen in genres){
          var name = genres[gen].name;
          genarray.push(name);
        }

       

        
        var details = document.getElementById("details");
        var div = '<div id="bg" style = "width:100%; height:100%;  z-index: 1; " >'
                  +'<div class = "custombg">'
                    +'<div class="card" style=" height:278px; color:transparent; padding: 10px 15px 10px 15px;">'
                      +'<div class="">'   
                        +'<img src="https://image.tmdb.org/t/p/w500'+posterpath+'" style = " width:185px; height:278px;" alt="No Image Found" />'
                      +'</div>'
                      +'<div id = "info" class="infodetails">'
                        + '<h1 style="color:#ffffff;" >'+title+'</h1>'
                        + '<p style="color:#ffffff;" class="cardp">Release Date: '+releasedate+'</p>'
                        + '<p id = "genres" style="color:#ffffff;" class="cardp">Genres: '+genarray.join(", ")+'</p>'
                        + '<p style="color:#ffffff;" class="overview">Summary: '+overview+'</p>'
                      +'</div>'
                    +'</div>'
                    +'<div id = "cast" class="cast">'
                      + '<h1 style="color:#ffffff;" >Top 5 Cast Members</h1>'
                      + '<div id="members" style="margin-top:10px;" class="custombg"></div>'
                    +'</div>'
                  +'</div>'
                +'</div>';

        
        details.innerHTML = div;

        var castmember = castMembers(movieid);
        document.getElementById("bg").style.backgroundImage = "url(https://image.tmdb.org/t/p/w500"+posterpath+")";
        document.getElementById("cast").style.backgroundImage = "url(https://image.tmdb.org/t/p/w500"+posterpath+")";

       
    }
   };
  xhr.send(null);
}

function castMembers(movieid){

   var xhr = new XMLHttpRequest();
   var id = movieid; 
   xhr.open("GET", "proxy.php?method=/3/movie/" + id +"/credits");
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
          var json = JSON.parse(this.responseText);
          var castmember = json.cast;
          var i = 0;
          var parentdiv = document.createElement('div');
          
          for(member in castmember){
            if(i==5) break;
            var profilepic = castmember[member].profile_path;
            var name = castmember[member].name;
            var charactername = castmember[member].character; 
            var middlediv = document.createElement('div');
            var div = '<div class="member">'
                      +'<div id="img" class="memberimg" >'
                        +'<img src="https://image.tmdb.org/t/p/w132_and_h132_bestv2'+profilepic+'" class="img-circle">'
                      +'</div>'
                      +'<div class="membertext">'
                        +'<p class="memberp" style="font-style: bold;">'+name+'</p>'
                        +'<p class="memberp">'+charactername+'</p>'
                      +'</div>'
                    +'</div>';
            middlediv.innerHTML = div;
            parentdiv.appendChild(middlediv);
            i++;
          }

          var castdiv = document.getElementById('members');
          castdiv.appendChild(parentdiv);

      }
   };
  xhr.send(null);
   
}
