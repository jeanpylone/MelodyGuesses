angular.module('main')
    .factory('soundService', [function(){
        var currentSound = null;
        var createSound = function(title, which, scope){
            var w = which.toLowerCase() == "answer" ? "Answer" : "Guess";
            var s = {
                buzz : new buzz.sound('titles/' + title.id3info.filename, {preload : true}).load().setTime(title['start' + w]),
                start : title['start' + w],
                end : title['end' + w],
                status : "stop",
                play : function(){
                    if (s.status != "play") {
                        scope[which + 'Status'] = s.status = "play";
                        scope.safeApply();
                        s.buzz.play();
                    }
                },
                switchPlay : function(){
                    console.log("switch", s);
                    if (s.status == "play") {
                        s.pause();
                    } else {
                        s.play();
                    }
                },
                pause : function(){
                    if (s.status == "play") {
                        scope[which + 'Status'] = s.status = "pause";
                        scope.safeApply();
                        s.buzz.pause();
                    }
                },
                stop : function() {
                    //if (s.status != "stop"){
                        scope[which + 'Status'] = s.status = "stop";
                        scope[which+'Timing'] = -1;
                        scope.safeApply();
                        s.buzz.stop().setTime(s.start);
                    //}
                }
            };
            s.buzz.bind('timeupdate', function(){
                var time = s.buzz.getTime();
                if (time >= s.end){
                    s.stop();
                    time = -1;
                }
                console.log("time update", {scope: scope, time: time});
                scope[which+'Timing'] = time;
                scope.safeApply();
            });
            return s;
        };
        var switchSound = function(title, scope){
            if (currentSound) {
                currentSound.guess.buzz.stop();
                currentSound.answer.buzz.stop();
            }
            currentSound = null;
            if (title) {
                currentSound = {
                    guess : createSound(title, "guess", scope),
                    answer : createSound(title, "answer", scope)
                };
            }
            return currentSound;
        };



        var service = {
            switchSound : function(title, scope) {
                return switchSound(title, scope);
            },
            switchGuess : function() {
                currentSound.answer.pause();
                currentSound.guess.switchPlay();
            },
            switchAnswer : function() {
                currentSound.guess.pause();
                currentSound.answer.switchPlay();
            }
        };

        return service;
    }]);