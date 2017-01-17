var newsapp=angular.module('newsapp',['ngRoute']);
newsapp.config(function($routeProvider,$locationProvider){
$locationProvider.html5Mode(true);
    $routeProvider
    .when('/home',{
        templateUrl:'views/home.html',
        controller:'homecntrl'
    })
    .when('/entertainment',{
        templateUrl:'views/entertainment.html',
        controller:'entment',
        containerClass:'entment'
    })
    .when('/scorecard',{
        templateUrl:'views/scorecard.html',
        controller:'scorecard',
        containerClass:'scorecard'
        
    })
    .when('/sports',{
        templateUrl:'views/sports.html',
        controller:'sprtscntrl',
        containerClass:'sports'
    })
    .when('/tech',{
        templateUrl:'views/tech.html',
        controller:'techcntrl',
        containerClass:'tech'
    })
    .when('/fashion',{
        templateUrl:'views/fashion.html',
        controller:'fshncntrl',
        containerClass:'fashion'
    })
.when('/allnews',{
templateUrl:'views/allnews.html',
controller:'allnews'
})
.when('/aboutus',{
templateUrl:'views/aboutme.html',
controller:'abutuscntrl'
})
.otherwise({
			redirectTo: '/home'
		});
});
newsapp.controller('nwshmcntrl',function($scope,$location,$rootScope){
//    $scope.googlnews = gnewsfact.getGnws();
//    $scope.espn = espn.getGnws();
//    $scope.tthreen = tthreen.getData();
    //console.log($scope.googlnews);    
//    $http.get("https://newsapi.org/v1/articles?source=national-geographic&sortBy=top&apiKey=872d96bc8d274a4ca582a23d345942e6")
//    .then(function(response) {
//        $scope.natgeo = response.data.articles;
//    });
    $scope.this_route = function(){
         return $location.path().replace('/', '');
    };
    $scope.getNwstm = function(tm){
       var tthis = tm;
       monthNames = ["January", "February", "March","April", "May", "June","July", "August", "September","October", "November", "December"];
       var d = new Date(tthis),dmnth=d.getMonth();    
       var shrtname = monthNames[dmnth].substr(0,3); 

       return shrtname;
    };
//    $http.get("https://newsapi.org/v1/articles?source=new-scientist&sortBy=top&apiKey=872d96bc8d274a4ca582a23d345942e6")
//    .then(function(response) {
//        $scope.scientist = response.data.articles;
//    });
});
newsapp.controller('sidebarcntrl',function(gadget,$scope,weather){
    //console.log(weather);
    //this.wthnews = weather.getData();    
    this.gdtnws = gadget.getData();
    //console.log(this.gdtnws);
$scope.wth =  weather.getData();
        $scope.dayc = function(dc){            
            console.log(dc);
          var dts = new Date(dc),dys = dts.getDay();
          var dayarr = ['Monday','Tuesday','Wednesday','Thrusday','Friday','Saturday','Sunday'];             
          var nums = dayarr[dys];           
            return nums;
        };
});
newsapp.controller('allnews',function($scope,$http){
    //var dlist = {};
    //dlist.nws = {};
var feedList = document.getElementById('feedList');
    $scope.getds = function(turl){
if(turl === undefined){
var turl = "https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=872d96bc8d274a4ca582a23d345942e6"
}
$http.get(turl).then(function(response){
$scope.dlist= response.data.articles;
});    
};
  //  $scope.getds(turl);
feedList.addEventListener('click',function(e){
    e.stopImmediatePropagation();
var gImg = e.target;
var datasrc = gImg.getAttribute('data-src');
var turl = "https://newsapi.org/v1/articles?source="+datasrc+"&sortBy=top&apiKey=872d96bc8d274a4ca582a23d345942e6";
    $scope.getds(turl);
});
    
});
newsapp.controller('abutuscntrl',function($scope){

});
newsapp.controller('homecntrl',function($scope,$http,gnewsfact,espn,tthreen){
   $scope.googlnews = gnewsfact.getGnws();
    $scope.espn = espn.getGnws();
    //console.log($scope.espn);    
    $scope.tthreen = tthreen.getData();
    //console.log($scope.tthreen)
    //console.log($scope.googlnews);    
    $http.get("https://newsapi.org/v1/articles?source=national-geographic&sortBy=top&apiKey=872d96bc8d274a4ca582a23d345942e6")
    .then(function(response) {
        $scope.natgeo = response.data.articles;
    });    
    $http.get("https://newsapi.org/v1/articles?source=new-scientist&sortBy=top&apiKey=872d96bc8d274a4ca582a23d345942e6")
    .then(function(response) {
        $scope.scientist = response.data.articles;
    });
});
newsapp.factory('weather',function($http){
    var weather = {};
    weather.data = {};
    weather.getData = function(){
       $http.get('https://api.apixu.com/v1/forecast.json?key=567343b64ce849af896100458171001&q=Delhi&days=4').then(function(response){
            weather.data.dt = response.data.forecast.forecastday;
           console.log(weather.data);
        });
       return weather.data;
    }
    return weather; 
    //console.log(weather);
});
newsapp.controller('scorecard',function($scope,espn){
    $scope.oldmat = espn.getOldm();
    //console.log($scope.oldmat);   
    /*$scope.open = function (dt) {
        var scrdt=dt;
        var resldt = 'http://cricapi.com/api/cricketScore?apikey=dsgQEKCba7ffER2SvmhH26AemaH2&unique_id=1000881';
    var scrres = 'http://cricapi.com/api/cricketScore?apikey=dsgQEKCba7ffER2SvmhH26AemaH2&unique_id='+dt;
        $http.get(scrres).then(function(response) {
        gnewsfact.data.gnwss = response.data.articles;
    });
    console.log('opening pop up');
    var modalInstance = $modal.open({templateUrl: '<div></div>'});
    }*/  
    $scope.tab = 1;
    $scope.setTab =function(newTab){
        $scope.tab =newTab;
    };
    $scope.isSet = function(tabNum){
        return $scope.tab === tabNum;
    };
});
newsapp.factory('gnewsfact', function($http){
	var gnewsfact = {};
	gnewsfact.data={};
	gnewsfact.getGnws = function(){
		$http.get("https://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=872d96bc8d274a4ca582a23d345942e6")
    .then(function(response) {
        gnewsfact.data.gnwss = response.data.articles;
    });
    return gnewsfact.data;
	};
	return gnewsfact;
});
newsapp.controller('entment',function($scope,ents){
    $scope.ents = ents.getEnt();
});
newsapp.controller('sprtscntrl',function($scope,spts){
    $scope.spts = spts.getSpt();
});
newsapp.controller('techcntrl',function($scope,tch){
    $scope.tch = tch.getTch();
});
newsapp.controller('fshncntrl',function($scope,fsh){
    $scope.fsh = fsh.getFsh();
});
newsapp.factory('fsh',function($http){
var fsh = {};
fsh.data = {};
fsh.getFsh = function(){
$http.get('https://newsapi.org/v1/articles?source=mtv-news&sortBy=top&apiKey=872d96bc8d274a4ca582a23d345942e6').then(function(response){
fsh.data.fshtdata = response.data.articles;  
});
return fsh.data;
};
return fsh;
});
newsapp.factory('spts',function($http){
var spts = {};
spts.data = {};
spts.getSpt = function(){
$http.get('https://newsapi.org/v1/articles?source=espn&sortBy=top&apiKey=872d96bc8d274a4ca582a23d345942e6').then(function(response){
spts.data.spttdata = response.data.articles;  
});
return spts.data;
};
return spts;
});
newsapp.factory('tch',function($http){
var tch = {};
tch.data = {};
tch.getTch = function(){
$http.get('https://newsapi.org/v1/articles?source=engadget&sortBy=top&apiKey=872d96bc8d274a4ca582a23d345942e6').then(function(response){
tch.data.tchtdata = response.data.articles;  
});
return tch.data;
};
return tch;
});
newsapp.factory('ents',function($http){
    var ents = {},entss={};
    ents.data = {};
    entss.datass={};
    entss.mdata={};
    ents.getEnt = function(){
      $http.get('https://newsapi.org/v1/articles?source=daily-mail&sortBy=top&apiKey=872d96bc8d274a4ca582a23d345942e6')
      .then(function(response){
        ents.data.entdata = response.data.articles;         
      });
     $http.get('https://newsapi.org/v1/articles?source=entertainment-weekly&sortBy=top&apiKey=872d96bc8d274a4ca582a23d345942e6')
      .then(function(res){
        entss.datass.entsdata = res.data.articles;
      });   
      
        return ents.data;
    };
    return ents;
});
newsapp.factory('espn', function($http){
	var espn = {};
	espn.data={};
    espn.sdata={};
    espn.godata = {};
    espn.gemcaldata = {};
	espn.getGnws = function(){
		$http.get("https://newsapi.org/v1/articles?source=espn&sortBy=top&apiKey=872d96bc8d274a4ca582a23d345942e6")
    .then(function(response) {
        espn.data.espnws = response.data.articles;
    });
    return espn.data;
	};
    espn.getScr = function(){
      $http.get('https://cricapi.com/api/cricket?apikey=dsgQEKCba7ffER2SvmhH26AemaH2').then(function(response){
          espn.sdata.ssdata=response.data.data;
      });
        return espn.sdata;
    };
    espn.getOldm = function(){
      $http.get('https://cricapi.com/api/cricket?apikey=dsgQEKCba7ffER2SvmhH26AemaH2').then(function(response){
          espn.godata.oldd = response.data.data;
      });  
        return espn.godata;
    };
	return espn;
});

newsapp.factory('tthreen',function($http){
var tthreen = {};
tthreen.data = {};
tthreen.getData = function(){
    $http.get("https://newsapi.org/v1/articles?source=t3n&sortBy=top&apiKey=872d96bc8d274a4ca582a23d345942e6")
    .then(function(response) {
        tthreen.data.tthren = response.data.articles;
    });
    return tthreen.data;
};
return tthreen;
});
newsapp.factory('gadget',function($http){
var gadget = {};
gadget.data = {};
gadget.getData = function(){
    $http.get("https://newsapi.org/v1/articles?source=engadget&sortBy=top&apiKey=872d96bc8d274a4ca582a23d345942e6")
    .then(function(response) {
        gadget.data.gdt = response.data.articles;
    });
    return gadget.data;
};
return gadget;
});

/*newsapp.run(function($rootScope) {
   $rootScope.$on('$routeChangeSuccess', function(ev,data) {   
     if (data.$route && data.$route.controller)
       $rootScope.controller = data.$route.controller;
   })
});*/