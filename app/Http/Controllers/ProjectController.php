<?php

namespace App\Http\Controllers;

use App\Events\ProjectCreated;
use App\Actions\CreateProjectAction;
use App\Http\Requests\ProjectStoreRequest;
use App\Http\Requests\ProjectUpdateRequest;
use App\Http\Resources\ProjectCollection;
use App\Models\Project;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Get the projects list
     *
     * @return Inertia\Inertia
     */
    public function index()
    {
        $projects = Project::latest()->paginate(10);
        return Inertia::render('Projects/List', [
            'projects' =>  new ProjectCollection($projects)
        ]);
    }

    /**
     * Display the create form
     *
     * @return void
     */
    public function create()
    {
        return Inertia::render('Projects/Create');
    }

    /**
     * Store a project
     *
     * @param ProjectStoreRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(ProjectStoreRequest $request, CreateProjectAction $createProject)
    {

        $project = $createProject(
            $request->title, 
            $request->description, 
            $request->amount            
        );           
        
        broadcast(new ProjectCreated($project))->toOthers();

        return redirect('projects')->with('success', 'Project created.');
    }

    /**
     * Displays the edit form
     *
     * @param Project $project
     * @return Inertia\Inertia
     */
    public function edit(Project $project)
    {
        return Inertia::render('Projects/Edit', compact('project'));
    }

    /**
     * Update a project
     *
     * @param Project $project
     * @param ProjectUpdateRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Project $project, ProjectUpdateRequest $request)
    {        
        $project->update($request->validated());
        return redirect('projects')->with('success', 'Project updated.');
    }
}
