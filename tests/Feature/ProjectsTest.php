<?php

namespace Tests\Feature;

use App\Models\Project;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Inertia\Testing\AssertableInertia as Assert;

class ProjectsTest extends TestCase
{
    use RefreshDatabase;

    public function test_unauthenticated_users_can_not_manage_projects()
    {

        $project = Project::factory()->create();

        $this->get('/projects')->assertRedirect('login');

        $this->get('/projects/create')->assertRedirect('login');

        $this->get($project->path() . '/edit')->assertRedirect('login');        

        $this->post('/projects', $project->toArray())->assertRedirect('login');
    }

    public function test_a_user_can_view_projects()
    {
        $this->signIn();
        $projects = Project::factory(5)->create();

        $this->get('/projects')
            ->assertOk()
            ->assertInertia(function (Assert $page) {
                $page->component('Projects/List');
                $page->has('projects.data', 5, function (Assert $page) {
                    $page->hasAll(['id', 'title', 'description', 'amount']);
                });
            });
    }

    public function test_a_user_can_create_a_project()
    {
        $user = $this->signIn();

        $this->get('/projects/create')->assertOk();

        $this->post('/projects', $attributes = Project::factory(['user_id'=>$user->id])->raw());

        $this->assertDatabaseHas('projects', $attributes);
    }

    public function test_a_project_requires_a_title()
    {
        $this->signIn();
        $attributes = Project::factory()->raw(['title' => '']);

        $response = $this->post('/projects', $attributes);

        $response->assertSessionHasErrors('title');
    }

    public function test_a_project_requires_a_description()
    {
        $this->signIn();
        $attributes = Project::factory()->raw(['description' => '']);

        $response = $this->post('/projects', $attributes);

        $response->assertSessionHasErrors('description');
    }

    public function test_a_project_requires_an_amount()
    {
        $this->signIn();
        $attributes = Project::factory()->raw(['amount' => '']);

        $response = $this->post('/projects', $attributes);

        $response->assertSessionHasErrors('amount');
    }

    public function test_a_user_can_update_a_project()
    {
        $this->signIn();        
        $project = Project::factory()->create();

        $this->get($project->path() . '/edit')->assertOk();

        $this->patch($project->path(), $attributes = ['title' => 'Changed', 'description' => 'changed', 'amount' => '2000'])
            ->assertRedirect('/projects');

        $this->assertDatabaseHas('projects', $attributes);
    }

}
