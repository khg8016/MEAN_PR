/**
 * Created by Jun on 2016-02-24.
 */
angular.module('users').factory('Authentication', [
    function(){
        this.user = window.user;
        return {
            user:this.user
        };
    }
]);