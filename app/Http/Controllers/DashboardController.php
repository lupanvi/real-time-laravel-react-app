<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectCollection;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Get the latest projects
     *
     * @return Inertia\Inertia
     */
    public function index()
    {
        $projects = Project::latest()->limit(5)->get();
        return Inertia::render('Dashboard', [
            'projects' =>  $projects
        ]);
    }
}
