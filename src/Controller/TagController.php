<?php

namespace App\Controller;

use App\Entity\Tags;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class TagController extends AbstractController
{
    private $entityManager;
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('api/tags', name: 'get_tags', methods: ['GET'])]

    public function getTags(): JsonResponse
    {
        $user = $this->getUser();

        $tags = $this->entityManager->getRepository(Tags::class)->findBy(['user' => $user]); // Remplacez 'id_user' par 'user'

        $response = [];

        foreach ($tags as $tag) {
            $response[] = [
                'id' => $tag->getId(),
                'name' => $tag->getName(),
                'color' => $tag->getColor(),
            ];
        }

        return new JsonResponse($response);
    }
}
