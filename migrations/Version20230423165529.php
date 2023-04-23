<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230423165529 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TEMPORARY TABLE __temp__tasks AS SELECT id, title, duree, marge_securite, priority, archive FROM tasks');
        $this->addSql('DROP TABLE tasks');
        $this->addSql('CREATE TABLE tasks (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, user_id INTEGER DEFAULT NULL, title VARCHAR(255) NOT NULL, duree INTEGER DEFAULT NULL, marge_securite INTEGER DEFAULT NULL, priority INTEGER NOT NULL, archive BOOLEAN NOT NULL, CONSTRAINT FK_50586597A76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO tasks (id, title, duree, marge_securite, priority, archive) SELECT id, title, duree, marge_securite, priority, archive FROM __temp__tasks');
        $this->addSql('DROP TABLE __temp__tasks');
        $this->addSql('CREATE INDEX IDX_50586597A76ED395 ON tasks (user_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TEMPORARY TABLE __temp__tasks AS SELECT id, title, duree, marge_securite, priority, archive FROM tasks');
        $this->addSql('DROP TABLE tasks');
        $this->addSql('CREATE TABLE tasks (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, title VARCHAR(255) NOT NULL, duree INTEGER DEFAULT NULL, marge_securite INTEGER DEFAULT NULL, priority INTEGER NOT NULL, archive BOOLEAN NOT NULL, id_user INTEGER NOT NULL)');
        $this->addSql('INSERT INTO tasks (id, title, duree, marge_securite, priority, archive) SELECT id, title, duree, marge_securite, priority, archive FROM __temp__tasks');
        $this->addSql('DROP TABLE __temp__tasks');
    }
}
