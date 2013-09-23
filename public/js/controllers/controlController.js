angular.module('main')
    .controller('controlController', ['$scope', '$http', 'quizzdata', 'soundService', 'remoteService', function($scope, $http, _data, sound, remote) {
        $scope.remoteReady=false;
        var remoteControl = remote.create(function(socket){

        }, $scope);
        var shuffle = function(list){
           var result = [];
            var shuffling = list.slice();
            while(shuffling.length){
                var i = Math.floor(Math.random()*shuffling.length);
                result.push(shuffling[i]);
                shuffling.splice(i,1);
            }
            return result;
        };
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
            }else {
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
        $scope.select = function(quizz){
            $scope.stage = 'quizz';
            $scope.quizzList = shuffle(quizz.titles);
            remoteControl.emit('list', {
                list : Enumerable.From($scope.quizzList).Select(function(d){return d._id}).ToArray(),
                name : quizz.name
            });
            $scope.current = next();
        };

        $scope.artist_t1 = function(){
            $scope.artist = 't1';
            remoteControl.emit('answer', { type : 'artist', value : 't1'});
        }
        $scope.title_t1 = function(){
            $scope.title = 't1';
            remoteControl.emit('answer', { type : 'title', value : 't1'});
        }
        $scope.artist_t2 = function(){
            $scope.artist = 't2';
            remoteControl.emit('answer', { type : 'artist', value : 't2'});
        }
        $scope.title_t2 = function(){
            $scope.title = 't2';
            remoteControl.emit('answer', { type : 'title', value : 't2'});
        }
        $scope.OK = function(event){
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
            remoteControl.emit('click', { type : 'OK'});
        }
        $scope.readGuess = function(){
            if ($scope.guessing){
                sound.switchGuess();
                $scope.reading = $scope.current.guess.status == "play";
            }
            remoteControl.emit('click', { type : 'readGuess'});
        }
    }]);