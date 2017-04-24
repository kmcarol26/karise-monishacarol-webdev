/**
 * Created by Monisha on 2/9/2017.
 */

(function () {
    angular
        .module("WebAppMaker")    //We have just one argument which means we are just reading and not declaring WebAppMaker here
        .config(configuration); //this config gets loaded at startup
    function configuration($routeProvider, $httpProvider) { //routeProvider is provided by the ngroute

       $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
       $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';

        $routeProvider
            .when("/", {   //when u see a #/login,fetch the templateUr user/login
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController", //Name of Controller is LoginCOntroller
                controllerAs: "model" // Within the template, we can now refer to the controller as model
            })
            .when("/login", {   //when u see a #/login,fetch the templateUr user/login
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController", //Name of Controller is LoginCOntroller
                controllerAs: "model" // Within the template, we can now refer to the controller as model
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/new", {
                templateUrl: "views/website/templates/website-new.view.client.html",
                controller: "WebsiteNewController",
                controllerAs: "model"

            })
            .when("/user/:uid/website/:wid", {
                templateUrl: "views/website/templates/website-edit.view.client.html",
                controller: "WebsiteEditController",
                controllerAs: "model"

            })

            .when("/user/:uid/website", {
                templateUrl: "views/website/templates/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model"

            })

            //Page Routes
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: "views/pages/templates/page-new.view.client.html",
                controller: "PageNewController",
                controllerAs: "model"

            })

            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: "views/pages/templates/page-edit.view.client.html",
                controller: "PageEditController",
                controllerAs: "model"
            })


            .when("/user/:uid/website/:wid/page", {
                templateUrl: "views/pages/templates/page-list.view.client.html",
                controller: "PageListController",
                controllerAs: "model"

            })



            //Widget Routes
            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: "views/widget/templates/widget-chooser.view.client.html",
                controller: "WidgetChooserController",
                controllerAs: "model"

            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: "views/widget/templates/widget-edit.view.client.html",
                controller: "WidgetEditController",
                controllerAs: "model"

            })


            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: "views/widget/templates/widget-list.view.client.html",
                controller: "WidgetListController",
                controllerAs: "model"

            })


            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid/search", {
                templateUrl: "views/widget/templates/widget-flickr-search.view.client.html",
                controller: "FlickrImageSearchController",
                controllerAs: "model"

            });



    }


})();

