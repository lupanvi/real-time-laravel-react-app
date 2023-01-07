<?php

use App\Models\Project;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

/*Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});*/
//Broadcast::channel('projects.{projectId}', function ($user, $projectId) {
Broadcast::channel('projects', function ($user) {
    //return $user->id === Project::findOrNew($projectId)->user_id;
    return auth()->check();    
});

Broadcast::channel('latestProjects', function ($user) {    
    return auth()->check();    
});
