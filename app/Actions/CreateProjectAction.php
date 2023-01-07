<?php

namespace App\Actions;

use App\Models\Project;

class CreateProjectAction
{
    public function __invoke(string $title, string $description, float $amount): Project
    {
        $project = Project::create([
            'title' => $title,
            'description' => $description,
            'amount' => $amount,
            'user_id' => auth()->id()
        ]);

        return $project;
    }
}
