/**
 * Created by Monisha on 3/1/2017.
 */
(function () {
    angular
        .module('wbdvDirectives',[])
        .directive('wbdvSortable', wbdvSortable );

    function wbdvSortable($routeParams) {
        var pageId= $routeParams['pid'];
        console.log("in directives");

        function linker(scope, element, attributes) {

            var start = -1;
            var end = -1;
            element.sortable(
                {axis: 'y'},
                { start: function (event, ui) {
                    start = ui.item.index();
                    console.log(start);
                },
                    stop: function(event, ui){
                        end = ui.item.index();
                        scope.sortController.reorderWidget(start,end,pageId);
                    }});
        }
        return{
            scope: {
            },
            link: linker,
            controller:sortController,
            controllerAs:'sortController'
        };

    }

    function sortController(WidgetService){
        var vm=this;
        vm.reorderWidget=reorderWidget ;
        function reorderWidget(start,end,pageId){
            WidgetService.reorderWidget(start,end,pageId);
        }
    }
})();
