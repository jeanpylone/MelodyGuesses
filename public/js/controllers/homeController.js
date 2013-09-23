angular.module('main')
    .controller('homeController', ['$scope', '$http', 'quizzdata', 'soundService', 'remoteService', function($scope, $http, _data, sound, remote) {
        var titles = [];
        $http.get("/titles/list").success(function(data){
            titles.splice.apply(titles, [].concat([titles.length,0],data));
        });
        var remoteControl = remote.create(function (socket){
            socket.on('list', function(data) {
                $scope.stage = 'quizz';
                $scope.quizzTitle = data.name;
                $scope.quizzList = [];
                for (var i = 0;i< data.list.length; i++){
                    $scope.quizzList.push(Enumerable.From(titles).First(function(t){return data.list[i] == t._id;}));
                }
                $scope.current = next();
                $scope.$apply();
            });
            socket.on('answer', function(data) {
                if (data.type == 'artist') {
                    $scope.artist = data.value;
                } else if (data.type == 'title') {
                    $scope.title = data.value;
                }
                $scope.$apply();
            });
            socket.on('click', function(data) {
                if (data.type == 'readGuess'){
                    if ($scope.guessing){
                        sound.switchGuess();
                        $scope.reading = $scope.current.guess.status == "play";
                    }
                } else if (data.type == 'OK'){
                if ($scope.guessing) {
                    sound.switchAnswer();
                    $scope.reading = $scope.current.answer.status == "play";
                    $scope.guessing = false;
                    $scope.showAnswer = true;
                    if ($scope.artist == 't1') {$scope.t1 ++;}
                    if ($scope.artist == 't2') {$scope.t2 ++;}
                    if ($scope.title == 't1') {$scope.t1 ++;}
                    if ($scope.title == 't2') {$scope.t2 ++;}
                }
                else {$scope.current = next();}
            }
            $scope.$apply();
            });
        }, $scope);
        var next = function(){
            if ($scope.quizzList.length){
                var res = $scope.quizzList[0];
                $scope.quizzList.splice(0,1);
                $scope.artist = '';
                $scope.title = '';
                $scope.guessing = true;
                $scope.reading = false;
                $scope.showAnswer = false;
                $scope.answerartist = res.id3info.metadata.artist;
                $scope.answertitle = res.id3info.metadata.title;
                return sound.switchSound(res, $scope);
            }
            else {
                $scope.endQuizz = true;
            }
        }
        $scope.safeApply = function(fn) {
            var phase = this.$root.$$phase;
            if(phase == '$apply' || phase == '$digest') {
                if(fn && (typeof(fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };
        $scope.d = _data;
        $scope.t1 = 0;
        $scope.t2 = 0;
        $http.get("/quizz/listfull").success(function(data){
            _data.list.splice.apply(_data.list, [].concat([0, _data.list.length],data));
        });
        $scope.stage='choice';
    }]);