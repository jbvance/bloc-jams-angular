(function() {
     function AlbumCtrl() {
         this.albumData = {};
         this.albumData = angular.copy(albumPicasso);
     }
 
     angular
         .module('blocJams')
         .controller('AlbumCtrl', AlbumCtrl);
 })();