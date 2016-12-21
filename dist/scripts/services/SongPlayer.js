(function () {
    function SongPlayer($rootScope, Fixtures) {
        var SongPlayer = {};    
                
        /**
        * @desc Current album object
        * @type {Object}
        */
         var currentAlbum = Fixtures.getAlbum();
        
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;               
        
        /**
         * @function playSong
         * @desc Plays currentBuzzObject and sets playing property of song to true
         * @param {Object} song
         */
        var playSong = function(song){
            currentBuzzObject.play();
            song.playing = true;
        };
        
        /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
        var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong();
            }            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentBuzzObject.bind('timeupdate', function(){
                $rootScope.$apply(function() {
                   SongPlayer.currentTime = currentBuzzObject.getTime(); 
                });
            });

            SongPlayer.currentSong = song;
        };
        
         /**
        * @desc Index of song in currentAlbum
        * @type {Object}
        * @param {Object} song
        * @returns int
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        
        /**
        * @desc Stops current buzz audio file and sets the playing property of the song to null;        
        */
        var stopSong = function(){
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;            
        };
        
        /**
        * @desc Currently playing song object
        * @type {Object}
        */
        SongPlayer.currentSong = null;
        
         /**
        * @desc Volume of song player
        * @type int
        */
        SongPlayer.volume = 70;
        
         /**
         * @desc Current playback time (in seconds) of currently playing song
         * @type {Number}
         */
         SongPlayer.currentTime = null;
        
        /**
         * @function play
         * @desc Plays a song
         * @param {Object} song
         */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
                
            } else if (SongPlayer.currentSong === song) {
                 if (currentBuzzObject.isPaused()) {
                     currentBuzzObject.play();
                 }
            } 
        };
        
        
        /**
         * @function pause
         * @desc Pauses a song
         * @param {Object} song
         */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
    
       /**
         * @function previous
         * @desc moves to previous song on current album         
         */
       SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
           
           if (currentSongIndex < 0) {
                stopSong();
           } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
           }
      };
        
        /**
         * @function next
         * @desc moves to previous song on current album         
         */
       SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
           
           if (currentSongIndex > currentAlbum.songs.length - 1) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null; 
           } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
           }
      };
        
      /**
      * @function setCurrentTime
      * @desc Set current time (in seconds) of currently playing song
      * @param {Number} time
      */
       SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
      };
    
       /**
      * @function setVolume
      * @desc Set the volume on the song player
      * @param {Number} time
      */
       SongPlayer.setVolume = function (volume) {
                if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
            }
       };
         
        return SongPlayer;
    }
 
    angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();