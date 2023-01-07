<?php

namespace Tests\Feature;

use App\Models\Project;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_a_user_can_see_the_latest_projects()
    {
        $this->signIn();

        $projects = Project::factory(2)->create();

        $response = $this->get('dashboard');
        
        $response->assertSee($projects[0]['title']);
        $response->assertSee($projects[0]['amount']);
        $response->assertSee($projects[1]['title']);
        $response->assertSee($projects[1]['amount']);
    }
}
