<?php
// src/Controller/TaskController.php

namespace App\Controller;

use App\Entity\Tasks;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class TaskController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('api/tasks', name: 'get_tasks', methods: ['GET'])]
    public function getTasks(): JsonResponse
    {
        $user = $this->getUser();

        $tasks = $this->entityManager->getRepository(Tasks::class)->findBy(['user' => $user]);

        $response = [];
        foreach ($tasks as $task) {
            $tagsArray = [];
            foreach ($task->getTagId() as $tag) {
                $tagsArray[] = [
                    'id' => $tag->getId(),
                    'name' => $tag->getName(),
                    'color' => $tag->getColor(),
                ];
            }

            $response[] = [
                'id' => $task->getId(),
                'title' => $task->getTitle(),
                'duree' => $task->getDuree(),
                'marge_securite' => $task->getMargeSecurite(),
                'priority' => $task->getPriority(),
                'archived' => $task->isArchive(),
                'tags' => $tagsArray,
            ];
        }

        return new JsonResponse($response);
    }
}
