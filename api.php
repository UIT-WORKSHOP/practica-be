<?php
header('Content-Type: application/json');
require_once('class/database.php');
require_once('class/user.php');
$db = new Database('root','','localhost','user');
$user = new user($db);
$result = array(
    'status' => '0'
);
if(isset($_POST['username']))
    $username = $_POST['username'];
if(isset($_POST['password']))
    $password = $_POST['password'];
if(isset($_POST['email']))
    $email = $_POST['email'];
if(isset($_POST['proName']))
    $profileName = $_POST['proName'];
if(isset($_POST['action'])){
    $action = $_POST['action'];
}else{
    die('403');
}

if($action == 'getallusers') {
    $alluser = $user->GetAllUsers();
    if(count($alluser) > 0){
        $result['status'] = '1';
        $result['data'] = $alluser;
    } else{
        $result['detail'] = 'No user register yet!';
    }
}else if($action == 'getuser') {
    $auser = $user->GetUser($username);
    if($auser){
        $result['status'] = '1';
        $result['data'] = $auser;
    }else{
        $result['detail'] = 'User not found!';
    }
}else if($action == 'adduser'){
    if(!$user->Exist($username)){
        $user->AddUser($username,$password,$email,$profileName);
        $result['status'] = '1';
        $result['detail'] = 'User has been added!';
    }else{
        $result['detail'] = 'User exist!';
    }
} else if($action == 'deleteuser')
{
    $auser = $user->DelUser($username);
    if($auser){
        $result['status'] = '1';
        $result['detail'] = 'User has been deleted!';
    }else{
        $result['detail'] = 'User not found!';
    }
}else if($action == 'changeuser'){
    $auser = $user->ChangeUser($username,$password,$email,$profileName);
    if($auser){
        $result['status'] = '1';
        $result['detail'] = 'User profile has been changed!';
    }else{
        $result['detail'] = 'User not found!';
    }
}
else {
    $result = array(
        'status'  => '0',
        'detail'  => 'Action not found!'
    );
}

$json = json_encode($result);
echo $json;
?>