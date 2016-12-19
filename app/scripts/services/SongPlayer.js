(function () {
    function SongPlayer() {
        var SongPlayer = {};
        
        /**
        * @desc Currently playing song object
        * @type {Object}
        */
        var currentSong = null;
        
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
                currentBuzzObject.stop();
                currentSong.playing = null;
            }            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentSong = song;
        };
        
        /**
         * @function play
         * @desc Plays a song
         * @param {Object} song
         */
        SongPlayer.play = function(song) {
            
            if (currentSong !== song) {
                setSong(song);
                playSong(song);
                
            } else if (currentSong === song) {
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
            currentBuzzObject.pause();
            song.playing = false;
        };
         
        return SongPlayer;
    }
 
    angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();