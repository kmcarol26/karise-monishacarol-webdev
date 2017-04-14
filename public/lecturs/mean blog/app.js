/**
 * Created by Monisha on 1/18/2017.
 */

<!--angular is the object created in index.html-->

    angular
        .module('BlogApp',[]) //[] means that module doesnt depend on any other rmodule
        .controller('BlogController', blogController);

function blogController($scope){
    $scope.blogPosts=[
        {title:"my bday" , body: "great"},
        {title:"my anniversary" , body: "sweet"}
        //{title: "new years", body: "awesome"}
    ];
    $scope.createPost = createPost;
    $scope.deletePost = deletePost;
    $scope.selectPost = selectPost;
    $scope.post={};
    $scope.updatePost = updatePost;

    function updatePost(post){
        $scope.blogPosts[$scope.indexPost].title=post.title;
        $scope.blogPosts[$scope.indexPost].body=post.body;
        $scope.post={}; //to clear the contents of the form

    };
    function selectPost(post) // to keep track of which blog post the user has selected
    {
    $scope.indexPost=$scope.blogPosts.indexOf(post);
    console.log($scope.indexPost);
    $scope.post.title = post.title;
    $scope.post.body = post.body;



    };

    function createPost(post) {
        console.log(post);
        var newPost = {
            title: post.title,
            body: post.body

        };
        $scope.blogPosts.push(newPost);//push adds an element to the array blogPosts
    }
        function deletePost(post){
        var indexPost = $scope.blogPosts.indexOf(post);
        $scope.blogPosts.splice(indexPost , 1);


        };



}
