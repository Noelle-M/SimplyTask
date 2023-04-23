<?php

namespace App\Entity;

use App\Repository\TasksRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\JoinColumn;

#[ORM\Entity(repositoryClass: TasksRepository::class)]
class Tasks
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToMany(targetEntity: Tags::class, inversedBy: 'tasks')]
    private Collection $tagId;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column(nullable: true)]
    private ?int $duree = null;

    #[ORM\Column(nullable: true)]
    private ?int $margeSecurite = null;

    #[ORM\Column]
    private ?int $priority = null;

    #[ORM\Column]
    private ?bool $archive = null;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: "tasks")]
    #[JoinColumn(name: "user_id", referencedColumnName: "id")]
    private $user;

    public function __construct()
    {
        $this->tagId = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection<int, Tags>
     */
    public function getTagId(): Collection
    {
        return $this->tagId;
    }

    public function addTagId(Tags $tagId): self
    {
        if (!$this->tagId->contains($tagId)) {
            $this->tagId->add($tagId);
        }

        return $this;
    }

    public function removeTagId(Tags $tagId): self
    {
        $this->tagId->removeElement($tagId);

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDuree(): ?int
    {
        return $this->duree;
    }

    public function setDuree(?int $duree): self
    {
        $this->duree = $duree;

        return $this;
    }

    public function getMargeSecurite(): ?int
    {
        return $this->margeSecurite;
    }

    public function setMargeSecurite(?int $margeSecurite): self
    {
        $this->margeSecurite = $margeSecurite;

        return $this;
    }

    public function getPriority(): ?int
    {
        return $this->priority;
    }

    public function setPriority(int $priority): self
    {
        $this->priority = $priority;

        return $this;
    }

    public function isArchive(): ?bool
    {
        return $this->archive;
    }

    public function setArchive(bool $archive): self
    {
        $this->archive = $archive;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
