var myapp = angular.module("myapp", ["firebase"]);

myapp.filter('searchfilter', function() {
  return function(input, term) {
	var regex = new RegExp(term || '', 'i');
	var obj = {};
	angular.forEach(input, function(v, i){
		if(regex.test(v.value + '')){
			obj[i]=v;
		}
	});
	return obj;
  };
});

function LOLCtrl($scope, $firebase) {
	var ref = new Firebase('https://glaring-fire-3431.firebaseio.com/champs');
	$scope.champs = $firebase(ref);
	var initchamps = [{
		image: 'annie.png',
		value: 'Annie',
		id: 'annie',
		votes: {
			upvotes: 0,
			downvotes: 0
		}
	}, {
		image: 'brand.png',
		value: 'Brand',
		id: 'brand',
		votes: {
			upvotes: 0,
			downvotes: 0
		}
	}, {
		image: 'kayle.png',
		value: 'Kayle',
		id: 'kayle',
		votes: {
			upvotes: 0,
			downvotes: 0
		}
	}, {
		image: 'nasus.png',
		value: 'Nasus',
		id: 'nasus',
		votes: {
			upvotes: 0,
			downvotes: 0
		}
	}];

	//log the champs into firebase if they are not already
	$scope.champs.$on('loaded', function(values) {
		for(var i in initchamps){
			var champExists = false;
			console.log(initchamps[i].id);
			for(var x in values){
				if(initchamps[i].id === values[x].id){
					champExists = true;
				}
			}
			console.log(champExists);
			if(!champExists){
				console.log('Champ' + initchamps[i].id + 'added');
				$scope.champs.$add(initchamps[i]);
			}
		}
	});

	$scope.updateCount = function(champ,vote) {
		//Increment counters
		if (vote == "up") {
			champ.votes.upvotes += 1;
		} else {
			champ.votes.downvotes += 1;
		}
		//save our changes
		$scope.champs.$save();
	}

}

function LOLChat($scope, $firebase) {
	var ref = new Firebase('https://glaring-fire-3431.firebaseio.com/chat');
	$scope.messages = $firebase(ref.limit(5));
	$scope.username = 'LOLLover' + Math.floor(Math.random()*101);
	$scope.addMessage = function() {
		$scope.messages.$add({
			from: $scope.username, content: $scope.message
		});
		$scope.message = "";
	}
}